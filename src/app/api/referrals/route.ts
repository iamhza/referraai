import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ReferralService } from '@/lib/mongodb/services/referralService';

export async function POST(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized',
          message: 'You must be logged in to create a referral'
        },
        { status: 401 }
      );
    }

    // Get user's role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'case_manager') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forbidden',
          message: 'Only case managers can create referrals'
        },
        { status: 403 }
      );
    }

    // Get the form data from the request
    const formData = await request.json();

    // Add user information to the referral data
    const referralData = {
      ...formData,
      userId: user.id,
      userEmail: user.email,
      status: 'pending' // Set initial status
    };

    // Create the referral using our service
    const referral = await ReferralService.createReferral(referralData);

    // Return success response with the created referral
    return NextResponse.json(
      { 
        success: true, 
        data: referral,
        message: 'Referral created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating referral:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create referral',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Get referrals for the current user based on their role
export async function GET() {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized',
          message: 'You must be logged in to view referrals'
        },
        { status: 401 }
      );
    }

    // Get user's role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forbidden',
          message: 'User role not found'
        },
        { status: 403 }
      );
    }

    let referrals;
    if (profile.role === 'case_manager') {
      // Case managers see their own referrals
      referrals = await ReferralService.getReferralsByUserId(user.id);
    } else if (profile.role === 'provider') {
      // Providers see referrals that match their services
      referrals = await ReferralService.getReferralsForProvider(user.id);
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forbidden',
          message: 'Invalid user role'
        },
        { status: 403 }
      );
    }

    // Return success response with the referrals
    return NextResponse.json(
      { 
        success: true, 
        data: referrals,
        message: 'Referrals retrieved successfully' 
      }
    );
  } catch (error) {
    console.error('Error fetching referrals:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch referrals',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 