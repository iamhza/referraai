
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  display_name: z.string().min(2).optional(),
  phone_number: z.string().optional(),
  organization_name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }).optional(),
  organization_role: z.string().min(2).optional(),
  avatar_url: z.string().optional(),
  email_notifications: z.boolean().default(true),
  sms_notifications: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Settings = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    console.log('User object:', user);
    console.log('User profile from context:', userProfile);
  }, [user, userProfile]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "",
      display_name: "",
      phone_number: "",
      organization_name: "",
      organization_role: "",
      avatar_url: "",
      email_notifications: true,
      sms_notifications: false,
    },
  });

  useEffect(() => {
    if (!user) return;
    
    console.log('Loading profile data for user:', user);
    
    // Check if we have userProfile from context
    if (userProfile) {
      console.log('Setting form values from userProfile:', userProfile);
      form.reset({
        full_name: userProfile.full_name || '',
        display_name: userProfile.display_name || '',
        phone_number: userProfile.phone_number || '',
        organization_name: userProfile.organization_name || '',
        organization_role: userProfile.organization_role || '',
        avatar_url: userProfile.avatar_url || '',
        email_notifications: userProfile.email_notifications ?? true,
        sms_notifications: userProfile.sms_notifications ?? false,
      });
      return;
    }
    
    // Fallback to user metadata if no profile is available
    if (user.user_metadata) {
      const metadata = user.user_metadata;
      console.log('Using user metadata as fallback:', metadata);
      
      form.reset({
        full_name: metadata.full_name || '',
        display_name: metadata.display_name || '',
        phone_number: metadata.phone_number || '',
        organization_name: metadata.organization_name || '',
        organization_role: metadata.organization_role || '',
        avatar_url: metadata.avatar_url || '',
        email_notifications: true,
        sms_notifications: false,
      });
      
      toast({
        title: 'Using signup information',
        description: 'Profile information loaded from your signup data.',
      });
    }
  }, [user, userProfile, form, toast]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) {
      toast({
        title: 'Error',
        description: 'User not authenticated',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setSaveSuccess(false);
    console.log('Submitting profile update with values:', values);

    try {
      // Use a direct SQL RPC function call with the JavaScript client 
      // to avoid the RLS recursion issue
      const { data, error } = await supabase.rpc(
        'update_user_profile' as any, // Type assertion to bypass TypeScript error
        {
          user_id: user.id,
          profile_data: {
            full_name: values.full_name,
            display_name: values.display_name,
            phone_number: values.phone_number,
            organization_name: values.organization_name,
            organization_role: values.organization_role,
            avatar_url: values.avatar_url,
            email_notifications: values.email_notifications,
            sms_notifications: values.sms_notifications,
            updated_at: new Date().toISOString(),
            profile_completed: true,
          }
        }
      );

      if (error) {
        throw error;
      }

      console.log('Profile updated successfully');
      setSaveSuccess(true);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setFetchError(error.message);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container max-w-5xl py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and profile information
            </p>
          </div>

          <Separator />

          {fetchError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{fetchError}</AlertDescription>
            </Alert>
          )}

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-600">Your profile has been updated successfully.</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="display_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is how your name will appear to others
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used for important notifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="organization_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Organization Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="organization_role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Case Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email_notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Email Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive email updates about referrals and matches
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sms_notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            SMS Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive text message updates about urgent cases
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
