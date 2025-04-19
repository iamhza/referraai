# ReferraAI Application Structure

## Overview
ReferraAI is a referral management system connecting case managers with service providers, focusing on home and community-based services and waiver services.

## Core Features
1. Referral Management
2. Provider Profiles & Matching
3. Case Manager Dashboard
4. Payment & Subscription System

## Database Structure

### Supabase (Non-PHI Data)

#### Core Tables
1. `referrals`
   - id
   - case_manager_id
   - service_id
   - status
   - urgency
   - mongo_phi_id (linking to PHI)
   - created_at
   - updated_at

2. `services`
   - service_id
   - name
   - created_at
   - updated_at

3. `providers`
   - id
   - name
   - email
   - phone
   - address
   - status
   - profile_completed
   - created_at
   - updated_at

4. `provider_services`
   - id
   - provider_id
   - service_id
   - areas_served
   - capacity
   - accepting_referrals
   - created_at
   - updated_at

5. `referral_matches`
   - id
   - referral_id
   - provider_id
   - status
   - response_notes
   - created_at
   - updated_at

#### Payment Tables
1. `provider_subscriptions`
   - id
   - provider_id
   - plan_id
   - status
   - current_period_start
   - current_period_end
   - cancel_at_period_end
   - stripe_subscription_id
   - stripe_customer_id
   - created_at
   - updated_at

2. `subscription_plans`
   - id
   - name
   - price_monthly
   - price_yearly
   - features
   - max_active_referrals
   - created_at
   - updated_at

3. `provider_payments`
   - id
   - provider_id
   - subscription_id
   - amount
   - status
   - stripe_payment_id
   - payment_date
   - created_at
   - updated_at

### MongoDB (PHI Data)
- Client personal information
- Medical information
- Insurance details
- Safety information

## Complete Application Structure

### Frontend Architecture

#### Core Components (`/src/components/`)
1. UI Components (`/ui/`)
   - Buttons, Cards, Forms
   - Navigation elements
   - Layout components

2. Referral Components (`/referrals/`)
   - ReferralCommunicationPanel.tsx
     - Message threading
     - Status updates
     - Activity tracking
     - Task management
     - Progress tracking

3. Forms (`/forms/`)
   - ReferralForm.tsx (965 lines)
     - Multi-step form process
     - Client information collection
     - Service selection
     - PHI handling

4. Provider Components (`/providers/`)
   - Provider profile management
   - Service area configuration
   - Availability settings

5. Dashboard Components (`/dashboard/`)
   - Analytics displays
   - Status summaries
   - Action items

6. Message Components (`/messages/`)
   - MessagePanel
   - Thread management
   - Notifications

#### Pages Structure (`/src/pages/`)
1. Main Pages
   - LandingPage.tsx (712 lines)
   - ProviderDashboard.tsx (559 lines)
   - ReferralTracker.tsx (326 lines)
   - Clients.tsx (186 lines)
   - MatchedProviders.tsx (280 lines)

2. Role-Specific Pages
   - `/case-manager/`
     - Referral creation
     - Client management
     - Provider matching
   
   - `/provider/`
     - Profile management
     - Referral responses
     - Service management
   
   - `/admin/`
     - Dashboard.tsx
     - ReferralMatching.tsx
     - UserManagement.tsx
     - System monitoring

3. Authentication (`/auth/`)
   - Login/Signup flows
   - Role-based access
   - Session management

### Services Layer (`/src/services/`)
1. Message Service
   - Real-time communication
   - Notification handling
   - Thread management

2. Integration Services
   - Supabase integration
   - MongoDB connection
   - Stripe payment processing

### Data Flow Architecture

1. Referral Creation Flow
   ```
   Case Manager Input
     ↓
   PHI Data → MongoDB
     ↓
   Non-PHI Data → Supabase
     ↓
   Notification to Admin Team
   ```

2. Provider Matching Flow (Admin-Driven)
   ```
   Admin Team Review
     ↓
   Manual Provider Selection (up to 5 providers)
     ↓
   Notification to Selected Providers
     ↓
   Provider Accept/Decline
     ↓
   Case Manager Final Selection
   ```

3. Referral Status Flow
   ```
   draft → submitted → matched → in_progress → completed
                   ↓
                cancelled
   ```

### Referral Tracking System

#### Status Tracking
1. Core Status States:
   - draft: Initial referral creation
   - submitted: Sent for admin review
   - matched: Providers selected by admin
   - in_progress: Provider selected and working
   - completed: Service delivery finished
   - cancelled: Referral terminated

2. Timestamp Tracking:
   - submittedAt: When sent to admin
   - matchedAt: When providers matched
   - completedAt: When service completed
   - lastUpdated: Any status change

#### Communication System
1. Task Management:
   - Status types: pending, in_progress, completed, blocked
   - Assignment tracking
   - Due date monitoring
   - Progress percentage calculation

2. Activity Timeline:
   - Message exchanges
   - Status changes
   - Milestone completions
   - Provider matches
   - Each activity includes:
     * Type (message/milestone/status_change/match)
     * Description
     * Timestamp
     * Actor (provider/case_manager/system)

3. User Interactions:
   - Provider Actions:
     * Accept/Decline referrals
     * Update task status
     * Send messages
     * Track progress
   
   - Case Manager Actions:
     * View matched providers
     * Track referral progress
     * Communicate with providers
     * Schedule meetings
   
   - Admin Actions:
     * Review referrals
     * Match providers
     * Monitor system
     * Manage users

#### Update Mechanisms
1. Database Updates:
   - Supabase for non-PHI updates
   - MongoDB for PHI updates
   - Real-time status synchronization

2. Notification System:
   - Status change alerts
   - New message notifications
   - Task updates
   - Deadline reminders

3. UI Updates:
   - Real-time progress tracking
   - Status badge updates
   - Timeline refresh
   - Task list updates

### Security Architecture

1. Authentication
   - Role-based access control
   - Session management
   - Token handling

2. Data Protection
   - PHI encryption
   - Secure transmission
   - Audit logging

3. Compliance
   - HIPAA requirements
   - Data retention
   - Access controls

### Integration Points

1. Supabase Integration
   - Authentication
   - Non-PHI data storage
   - Real-time subscriptions

2. MongoDB Integration
   - PHI data storage
   - Secure access
   - Backup management

3. Stripe Integration
   - Provider subscriptions
   - Payment processing
   - Invoice management

### User Experience Flows

1. Case Manager Experience
   ```
   Login
     ↓
   Dashboard View
     ↓
   Create Referral
     - Client Information
     - Service Selection
     - Notes & Requirements
     ↓
   Track Progress
     - View Matches
     - Communicate
     - Update Status
   ```

2. Provider Experience
   ```
   Signup/Subscribe
     ↓
   Profile Setup
     - Services
     - Coverage Area
     - Availability
     ↓
   Referral Management
     - Review Matches
     - Accept/Decline
     - Communication
     ↓
   Client Engagement
   ```

3. Admin Experience
   ```
   System Overview
     ↓
   Referral Processing
     ↓
   Provider Management
     ↓
   Analytics & Reporting
   ```

### Development & Deployment

1. Technology Stack
   - React + Vite
   - TypeScript
   - Tailwind CSS
   - Supabase
   - MongoDB
   - Stripe

2. Environment Setup
   - Development
   - Staging
   - Production

3. Monitoring & Maintenance
   - Performance tracking
   - Error logging
   - Updates & patches

## Application Structure

### Frontend Components
1. Pages
   - /pages/case-manager/
   - /pages/provider/
   - /pages/admin/
   - /pages/auth/
   - ReferralTracker.tsx
   - ProviderDashboard.tsx
   - MatchedProviders.tsx
   - Clients.tsx

2. Core Components
   - Referral Form
   - Provider Profile
   - Service Selection
   - Payment Integration

### Backend Services
1. Supabase
   - Authentication
   - Non-PHI data storage
   - Real-time updates

2. MongoDB
   - PHI data storage
   - HIPAA compliance

3. Stripe
   - Provider subscriptions
   - Payment processing

## User Flows

### Case Manager Flow
1. Create Referral
2. Track Referral Status
3. View Provider Matches
4. Manage Client Information

### Provider Flow
1. Sign Up & Subscribe
2. Complete Profile
3. View & Respond to Matches
4. Manage Services & Availability

### Admin Flow
1. Review Referrals
2. Manual Provider Matching
3. Monitor Subscriptions
4. System Management

## Development Plan

### Current Status
- UI components built
- Basic referral system implemented
- Provider dashboard created
- Referral tracker functioning

### Next Steps
1. Data Separation Implementation
   - [x] Review current structure
   - [ ] Add mongo_phi_id to referrals
   - [ ] Set up MongoDB connection
   - [ ] Implement PHI data flow

2. Provider System Enhancement
   - [ ] Update provider onboarding
   - [ ] Implement subscription system
   - [ ] Add payment processing
   - [ ] Enhance provider dashboard

3. Matching System Refinement
   - [ ] Review current matching logic
   - [ ] Implement admin matching interface
   - [ ] Add provider response handling
   - [ ] Enhance tracking system

4. Security & Compliance
   - [ ] HIPAA compliance review
   - [ ] Security audit
   - [ ] Access control implementation
   - [ ] Audit logging

## Notes & Updates
- Current focus: Implementing PHI/non-PHI data separation
- Provider subscription system planning in progress
- Need to review existing referral tracker implementation

## Admin System

### Overview
The admin system provides comprehensive platform management capabilities for ReferraAI administrators (you and your brother).

### Admin Dashboard (`/admin/Dashboard.tsx`)
1. Key Metrics
   - Active Referrals Count
   - Pending Matches
   - Registered Users
   - Success Rate
   - Time to First Match

2. Urgent Referrals Monitor
   - High-priority referrals needing matches
   - Quick-access matching buttons
   - County and wait time tracking

3. User Management
   - Recent user registrations
   - Role distribution
   - Agency/Organization tracking

### Referral Matching System (`/admin/ReferralMatching.tsx`)
1. Smart Matching Features
   - Match Score calculation
   - Distance-based filtering
   - Insurance compatibility check
   - Provider availability tracking

2. Provider Filtering
   - Service type matching
   - Geographic proximity
   - Insurance acceptance
   - Language support
   - Accessibility features

3. Match Quality Indicators
   - Excellent Match (90%+)
   - Good Match (80-89%)
   - Fair Match (70-79%)
   - Poor Match (<70%)

### User Management (`/admin/UserManagement.tsx`)
1. User Administration
   - Role assignment
   - Account status management
   - Access control
   - User verification

2. Organization Management
   - Agency/Provider organization tracking
   - Service area management
   - Compliance monitoring

### Admin Workflows

1. Referral Processing
   ```
   New Referral
     ↓
   Admin Review
     ↓
   Provider Matching
     - Check service match
     - Verify insurance compatibility
     - Consider location/distance
     - Review provider capacity
     ↓
   Match Assignment
     ↓
   Monitor Progress
   ```

2. Provider Management
   ```
   Provider Sign-up
     ↓
   Admin Review
     - Verify credentials
     - Check service areas
     - Confirm insurance acceptance
     ↓
   Activation
     ↓
   Ongoing Monitoring
     - Performance tracking
     - Client satisfaction
     - Response times
   ```

3. System Monitoring
   ```
   Daily Operations
     - Track active referrals
     - Monitor matching speed
     - Check system health
     ↓
   Performance Analysis
     - Success rates
     - Provider metrics
     - User satisfaction
     ↓
   System Optimization
     - Adjust matching algorithms
     - Update service categories
     - Enhance user experience
   ```

### Admin Controls
1. Matching Controls
   - Manual provider matching
   - Match score overrides
   - Priority adjustment
   - Batch matching capabilities

2. Provider Controls
   - Service area management
   - Capacity adjustment
   - Status updates
   - Subscription management

3. System Controls
   - User access management
   - Service type configuration
   - System notifications
   - Performance monitoring

### Admin Analytics
1. Referral Metrics
   - Average time to match
   - Success rates by service type
   - Geographic distribution
   - Provider response times

2. Provider Metrics
   - Active providers
   - Service coverage
   - Response rates
   - Client satisfaction

3. System Performance
   - User engagement
   - Platform usage
   - Technical metrics
   - Security monitoring

[Last Updated: Current Timestamp]

### State Management & Hooks

#### Context Providers
1. Authentication Context (`AuthContext.tsx`)
   - User authentication state
   - Role management
   - Session handling
   - Access control

#### Custom Hooks
1. Data Management
   - `useClientData` - Client information handling
   - `useReferrals` - Referral state and operations
   - `useProviderMatching` - Provider matching logic
   - `useMessages` - Communication management

2. UI/UX Hooks
   - `use-media-query` - Responsive design
   - `use-mobile` - Mobile detection
   - `use-toast` - Notification system

### Shared Functionality

1. Provider Matching Logic (`useProviderMatching.ts`)
   - Service compatibility checking
   - Geographic matching
   - Insurance verification
   - Availability tracking

2. Message Management (`useMessages.ts`)
   - Thread organization
   - Real-time updates
   - Notification handling

3. Referral Management (`useReferrals.ts`)
   - Status tracking
   - Updates and modifications
   - History maintenance

4. Client Data Handling (`useClientData.ts`)
   - PHI management
   - Information updates
   - Data validation

### State Flow Patterns

1. Authentication Flow
   ```
   AuthContext
     ↓
   Role Determination
     ↓
   Access Control
     ↓
   Feature Availability
   ```

2. Data Management Flow
   ```
   User Action
     ↓
   Custom Hook
     ↓
   API Call
     ↓
   State Update
     ↓
   UI Refresh
   ```

3. Communication Flow
   ```
   Message Creation
     ↓
   useMessages Hook
     ↓
   Real-time Update
     ↓
   Notification
   ```

### Detailed Page Structure

#### Landing Page (`LandingPage.tsx`)
1. Public Features
   - Service overview
   - Value proposition
   - Success metrics
   - Call-to-action buttons
   
2. Interactive Elements
   - Service showcase
   - Provider testimonials
   - Case studies
   - Registration flow

3. Dashboard Preview
   - Referral statistics
   - Matching process
   - Provider network

#### Case Manager Pages
1. Dashboard (`/case-manager/Dashboard.tsx`)
   - Welcome header with quick actions
   - Open referrals overview
   - Referral pipeline visualization
   - Priority metrics
   - Featured providers

2. Referrals Management (`/case-manager/Referrals.tsx`)
   - Active referrals list
   - Filtering and search
   - Status tracking
   - Quick actions

3. Client Management (`/case-manager/Clients.tsx`)
   - Client profiles
   - Service history
   - Notes and updates
   - Document management

4. Settings (`/case-manager/Settings.tsx`)
   - Profile management
   - Notification preferences
   - Account settings
   - Service area configuration

5. Referral Creation (`/case-manager/NewReferral.tsx`)
   - Multi-step form
   - Service selection
   - Client information
   - Requirements specification

6. Provider Matching (`/case-manager/MatchedProviders.tsx`)
   - Provider suggestions
   - Match scores
   - Provider details
   - Communication tools

7. Referral Tracking (`/case-manager/ReferralTracker.tsx`)
   - Status updates
   - Timeline view
   - Communication history
   - Action items

#### Provider Interface
1. Dashboard (`ProviderDashboard.tsx`)
   - Active referrals
   - Pending matches
   - Client communications
   - Performance metrics

2. Profile Management
   - Service offerings
   - Coverage areas
   - Availability settings
   - Credentials

3. Referral Management
   - Match review
   - Response handling
   - Client communication
   - Service tracking

#### Admin Interface
1. Dashboard (`/admin/Dashboard.tsx`)
   - System overview
   - Key metrics
   - Urgent items
   - Performance indicators

2. Referral Management (`/admin/Referrals.tsx`)
   - All referrals view
   - Status management
   - Priority handling
   - Issue resolution

3. Provider Management (`/admin/UserManagement.tsx`)
   - Provider directory
   - Verification status
   - Performance tracking
   - Account management

4. Matching Interface (`/admin/ReferralMatching.tsx`)
   - Smart matching system
   - Provider suggestions
   - Match quality indicators
   - Manual override options

### Page Components

1. Shared Components
   - Navigation menus
   - Status indicators
   - Action buttons
   - Search interfaces

2. Role-Specific Components
   - Case manager tools
   - Provider interfaces
   - Admin controls
   - Client information displays

3. Interactive Elements
   - Form components
   - Data tables
   - Charts and graphs
   - Communication tools

### Page Flows

1. Case Manager Flow
   ```
   Dashboard
     ↓
   Create Referral
     ↓
   Track Progress
     ↓
   Manage Matches
     ↓
   Client Updates
   ```

2. Provider Flow
   ```
   Dashboard
     ↓
   Review Matches
     ↓
   Accept/Decline
     ↓
   Service Delivery
     ↓
   Update Status
   ```

3. Admin Flow
   ```
   Dashboard
     ↓
   Review Referrals
     ↓
   Match Providers
     ↓
   Monitor Progress
     ↓
   System Management
   ```

### Complete Referral Flow Process

#### 1. Initial Referral Creation
```
Case Manager
  ↓
Create Referral
  - Client Information (PHI → MongoDB)
  - Service Requirements
  - Urgency Level
  - Geographic Preferences
  ↓
Submit for Matching
```

#### 2. Admin Matching Process
```
Admin Review
  ↓
Smart Matching System
  - Service Type Match
  - Geographic Coverage
  - Insurance Compatibility
  - Provider Availability
  ↓
Select Top 5 Providers
  - Match Score Calculation
  - Provider Status Verification
  - Capacity Check
  ↓
Send to Case Manager
```

#### 3. Case Manager Selection
```
Review 5 Matches
  - Provider Profiles
  - Match Scores
  - Service Details
  - Coverage Areas
  ↓
Make Selection
  Options:
  1. Select One Provider
     ↓
     Initiate Provider Contact
  2. Request More Matches
     ↓
     System Automatically Provides Next 5 Matches
  3. Decline All
     ↓
     Provide Reason
     Return to Admin for Rematching
```

#### 4. Provider Engagement
```
Selected Provider
  ↓
Review Referral
  - Client Needs
  - Service Requirements
  - Timeline
  ↓
Response Options
  1. Accept
     ↓
     Begin Service Planning
  2. Decline
     ↓
     Case Manager Selects Alternative
```

#### 5. Service Initiation
```
Provider Accepts
  ↓
Case Manager Notified
  ↓
Client Notification
  ↓
Service Planning
  - Initial Contact
  - Schedule Setup
  - Service Agreement
```

### Matching System Details

#### Admin Matching Criteria
1. Primary Factors
   - Service Type Alignment
   - Geographic Coverage
   - Insurance Acceptance
   - Provider Capacity
   - Specializations

2. Secondary Factors
   - Previous Success Rate
   - Response Time History
   - Client Feedback
   - Current Caseload

3. Match Score Calculation
   - Weighted Criteria
   - Compliance Checks
   - Availability Verification

#### Case Manager Selection Tools
1. Provider Comparison Interface
   - Side-by-side Comparison
   - Match Score Details
   - Provider History
   - Current Availability

2. Selection Actions
   - Select Provider
   - Request More Matches
   - Decline All with Reason
   - Save for Later

3. Provider Communication
   - Direct Messaging
   - Document Sharing
   - Status Updates

#### Match Batch Management
1. First Batch (5 Providers)
   - Highest Match Scores
   - Verified Availability
   - Active Status

2. Subsequent Batches
   - Automatic Generation
   - Next Best Matches
   - Updated Availability Check

3. Quality Control
   - Minimum Match Score Requirements
   - Provider Status Verification
   - Capacity Confirmation

### Status Tracking

1. Referral Status Updates
   ```
   Submitted
     ↓
   Admin Matching
     ↓
   Case Manager Review
     ↓
   Provider Selected
     ↓
   Service Initiated
   ```

2. Match Status Tracking
   ```
   Matched by Admin
     ↓
   Under Case Manager Review
     ↓
   Provider Selected/Declined
     ↓
   Service Status
   ```

3. Provider Response Tracking
   ```
   Referral Received
     ↓
   Review Period
     ↓
   Decision Made
     ↓
   Service Planning
   ```

## Implementation Priorities & Progress Tracking

### 1. Core Referral Flow Implementation
- [ ] **Referral Creation & PHI Handling**
  - [x] Multi-step referral form UI
  - [ ] MongoDB integration for PHI data
  - [ ] Supabase schema for non-PHI data
  - [ ] Data separation implementation
  - [ ] Form validation and error handling

- [ ] **Admin Matching System**
  - [ ] Admin dashboard for referral review
  - [ ] Provider matching interface
  - [ ] Match scoring implementation
  - [ ] 5-provider limit enforcement
  - [ ] Provider notification system

- [ ] **Case Manager Selection Process**
  - [ ] Matched providers view
  - [ ] Provider comparison interface
  - [ ] Selection/rejection handling
  - [ ] Request more matches functionality
  - [ ] Provider communication initiation

### 2. Provider System Development
- [ ] **Provider Onboarding**
  - [ ] Registration flow
  - [ ] Subscription plan selection
  - [ ] Payment integration (Stripe)
  - [ ] Profile creation
  - [ ] Service area definition
  - [ ] Capacity management
  - [ ] Availability settings
  - [ ] Document verification

- [ ] **Payment System**
  - [ ] Stripe integration setup
  - [ ] Subscription plan implementation
  - [ ] Payment processing
  - [ ] Invoice generation
  - [ ] Usage tracking
  - [ ] Automated renewals
  - [ ] Plan upgrade/downgrade handling

- [ ] **Provider Dashboard**
  - [ ] Subscription management interface
  - [ ] Usage statistics
  - [ ] Billing history
  - [ ] Referral review interface
  - [ ] Accept/decline functionality
  - [ ] Active referrals management
  - [ ] Communication center
  - [ ] Status updates

### 3. Communication & Updates
- [ ] **Messaging System**
  - [ ] Thread-based communication
  - [ ] Real-time updates
  - [ ] File sharing
  - [ ] Notification system

- [ ] **Status Tracking**
  - [ ] Automated status updates
  - [ ] Timeline visualization
  - [ ] Activity logging
  - [ ] Progress tracking

### 4. Security & Compliance
- [ ] **PHI Protection**
  - [ ] Data encryption
  - [ ] Access controls
  - [ ] Audit logging
  - [ ] HIPAA compliance verification

- [ ] **User Authentication**
  - [ ] Role-based access
  - [ ] Session management
  - [ ] Security monitoring
  - [ ] Password policies

### Current Focus
1. **Immediate Priority**: Referral Flow & Provider Onboarding
   - Complete PHI/non-PHI data separation
   - Implement admin matching interface
   - Build provider selection process
   - Set up Stripe integration
   - Implement subscription plans

2. **Secondary Focus**: Provider System
   - Develop provider onboarding
   - Create provider dashboard
   - Implement payment processing
   - Build communication tools

3. **Ongoing Tasks**: Security & Updates
   - Maintain HIPAA compliance
   - Implement real-time updates
   - Build notification system

### Weekly Goals
Week 1:
- [ ] Complete MongoDB integration
- [ ] Update referral schema
- [ ] Implement PHI data flow
- [ ] Set up Stripe test environment
- [ ] Create subscription plan structures
- [ ] Begin provider onboarding flow

Week 2:
- [ ] Build admin matching interface
- [ ] Implement provider selection
- [ ] Add communication system
- [ ] Implement payment processing

Week 3:
- [ ] Provider dashboard development
- [ ] Status tracking implementation
- [ ] Security audit and fixes
- [ ] Implement real-time updates

### Questions to Address
1. MongoDB Integration:
   - Specific PHI fields to store?
   - Encryption requirements?
   - Backup strategy?

2. Provider Matching:
   - Match score calculation details?
   - Provider notification preferences?
   - Override capabilities?

3. Communication System:
   - Real-time update requirements?
   - File sharing limitations?
   - Notification priorities?

4. Payment System:
   - Specific subscription plan pricing?
   - Trial period duration?
   - Refund policy?
   - Usage limits per plan?

### Next Steps
1. Review and confirm PHI field list
2. Set up MongoDB development environment
3. Set up Stripe integration
4. Define subscription plans and pricing
5. Create provider onboarding flow
6. Implement payment processing
7. Create provider matching algorithm
8. Design notification system
9. Implement real-time updates

[Track progress and update this section regularly] 

## Provider Onboarding & Payment System

### Provider Onboarding Flow
```
Initial Registration
  ↓
Subscription Selection
  - Free Trial (Optional)
  - Monthly/Annual Plans
  - Feature Comparison
  ↓
Profile Creation
  - Basic Information
  - Service Areas
  - Insurance Details
  - Licensing/Credentials
  ↓
Service Configuration
  - Available Services
  - Capacity Settings
  - Coverage Areas
  - Specializations
  ↓
Payment Setup
  - Stripe Integration
  - Payment Method
  - Subscription Activation
  ↓
Account Activation
```

### Subscription Plans
1. **Basic Plan**
   - Up to 15 active referrals
   - Standard matching priority

2. **Enhanced Plan**
   - Up to 30 active referrals
   - Priority in 30% of matches
   - Featured provider status

3. **Premium Plan**
   - Unlimited active referrals
   - Priority in 50% of matches
   - Premium provider badge
   - Featured in case manager dashboard

### Payment Processing
1. **Stripe Integration**
   - Secure payment processing
   - Subscription management
   - Invoice generation
   - Payment history

2. **Subscription Management**
   - Automatic renewals
   - Plan upgrades/downgrades
   - Usage tracking
   - Payment reminders

3. **Financial Reporting**
   - Revenue tracking
   - Subscription analytics
   - Payment history
   - Refund management

### Provider Dashboard Enhancements
1. **Subscription Management**
   - Current plan details
   - Usage statistics
   - Upgrade options
   - Billing history

2. **Analytics & ROI**
   - Referral success rate
   - Revenue generated
   - Client satisfaction
   - Response time metrics

## Implementation Priorities & Progress Tracking

### 1. Core Referral Flow Implementation
[Previous items remain the same...]

### 2. Provider System Development
- [ ] **Provider Onboarding**
  - [ ] Registration flow
  - [ ] Subscription plan selection
  - [ ] Payment integration (Stripe)
  - [ ] Profile creation
  - [ ] Service area definition
  - [ ] Capacity management
  - [ ] Availability settings
  - [ ] Document verification

- [ ] **Payment System**
  - [ ] Stripe integration setup
  - [ ] Subscription plan implementation
  - [ ] Payment processing
  - [ ] Invoice generation
  - [ ] Usage tracking
  - [ ] Automated renewals
  - [ ] Plan upgrade/downgrade handling

- [ ] **Provider Dashboard**
  - [ ] Subscription management interface
  - [ ] Usage statistics
  - [ ] Billing history
  - [ ] Referral review interface
  - [ ] Accept/decline functionality
  - [ ] Active referrals management
  - [ ] Communication center
  - [ ] Status updates

[Previous sections remain the same...]

### Current Focus
1. **Immediate Priority**: Referral Flow & Provider Onboarding
   - Complete PHI/non-PHI data separation
   - Implement admin matching interface
   - Build provider selection process
   - Set up Stripe integration
   - Implement subscription plans

2. **Secondary Focus**: Provider System
   - Develop provider onboarding
   - Create provider dashboard
   - Implement payment processing
   - Build communication tools

[Previous sections remain the same...]

### Questions to Address
[Previous questions remain...]

4. Payment System:
   - Specific subscription plan pricing?
   - Trial period duration?
   - Refund policy?
   - Usage limits per plan?

### Next Steps
1. Review and confirm PHI field list
2. Set up MongoDB development environment
3. Set up Stripe integration
4. Define subscription plans and pricing
5. Create provider onboarding flow
6. Implement payment processing
7. Create provider matching algorithm
8. Design notification system
9. Implement real-time updates

### Week 1 Additional Tasks:
- [ ] Set up Stripe test environment
- [ ] Create subscription plan structures
- [ ] Begin provider onboarding flow

[Track progress and update this section regularly] 

## Backend Architecture

### Database Schema Updates

#### Supabase Tables

1. **`provider_profiles`**
```sql
create table provider_profiles (
  id uuid references auth.users primary key,
  organization_name text not null,
  contact_name text not null,
  email text not null unique,
  phone text,
  address jsonb,
  status text default 'pending',
  verification_status text default 'unverified',
  stripe_customer_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

2. **`provider_subscriptions`**
```sql
create table provider_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid references provider_profiles(id),
  plan_id text not null,
  status text default 'active',
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  stripe_subscription_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

3. **`subscription_plans`**
```sql
create table subscription_plans (
  id text primary key,
  name text not null,
  description text,
  features jsonb,
  price_monthly integer,
  price_yearly integer,
  max_active_referrals integer,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

4. **`provider_usage`**
```sql
create table provider_usage (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid references provider_profiles(id),
  active_referrals integer default 0,
  total_referrals integer default 0,
  last_calculated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Edge Functions (Supabase)

1. **Stripe Webhook Handler**
```typescript
// /functions/stripe-webhook/index.ts
export async function handleStripeWebhook(event: any) {
  const { type, data } = event;
  
  switch (type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(data);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(data);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(data);
      break;
    // ... other webhook handlers
  }
}
```

2. **Usage Calculator**
```typescript
// /functions/calculate-provider-usage/index.ts
export async function calculateProviderUsage(providerId: string) {
  // Calculate active and total referrals
  const usage = await supabase
    .from('referrals')
    .select('status')
    .eq('provider_id', providerId);
    
  // Update provider_usage table
  await updateProviderUsage(providerId, usage);
  
  // Check for plan limits
  await checkUsageLimits(providerId);
}
```

### Backend Services

1. **Provider Service**
```typescript
// /services/provider.ts
export class ProviderService {
  async createProvider(data: ProviderCreateDTO) {
    // Create auth user
    const user = await supabase.auth.signUp({...});
    
    // Create provider profile
    const profile = await supabase
      .from('provider_profiles')
      .insert([{...}]);
      
    // Set up Stripe customer
    const customer = await stripe.customers.create({...});
    
    return { user, profile, customer };
  }
  
  async updateProviderStatus(id: string, status: ProviderStatus) {
    // Update provider status with validation
  }
  
  async verifyProvider(id: string, verificationData: any) {
    // Handle provider verification process
  }
}
```

2. **Subscription Service**
```typescript
// /services/subscription.ts
export class SubscriptionService {
  async createSubscription(providerId: string, planId: string) {
    // Get provider's Stripe customer ID
    const { stripe_customer_id } = await getProviderProfile(providerId);
    
    // Create Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripe_customer_id,
      items: [{ price: planId }],
      // ... other subscription options
    });
    
    // Update database
    await updateProviderSubscription(providerId, subscription);
    
    return subscription;
  }
  
  async handleSubscriptionChange(providerId: string, action: 'upgrade' | 'downgrade' | 'cancel') {
    // Handle subscription modifications
  }
  
  async checkUsageLimits(providerId: string) {
    // Verify usage against plan limits
  }
}
```

3. **Payment Service**
```typescript
// /services/payment.ts
export class PaymentService {
  async handlePaymentSuccess(event: Stripe.Event) {
    // Process successful payment
  }
  
  async handlePaymentFailure(event: Stripe.Event) {
    // Handle failed payment
  }
  
  async generateInvoice(providerId: string) {
    // Generate invoice for provider
  }
}
```

### API Routes

1. **Provider Routes**
```typescript
// /api/providers/routes.ts
router.post('/providers', createProvider);
router.put('/providers/:id', updateProvider);
router.post('/providers/:id/verify', verifyProvider);
router.get('/providers/:id/usage', getProviderUsage);
```

2. **Subscription Routes**
```typescript
// /api/subscriptions/routes.ts
router.post('/subscriptions', createSubscription);
router.put('/subscriptions/:id', updateSubscription);
router.delete('/subscriptions/:id', cancelSubscription);
router.get('/subscriptions/plans', getSubscriptionPlans);
```

3. **Payment Routes**
```typescript
// /api/payments/routes.ts
router.post('/payments/webhook', stripeWebhookHandler);
router.get('/payments/:id/invoice', getInvoice);
router.post('/payments/setup-intent', createSetupIntent);
```

### Background Jobs

1. **Usage Calculator**
```typescript
// Run daily to update provider usage statistics
export async function calculateAllProvidersUsage() {
  const providers = await getAllActiveProviders();
  
  for (const provider of providers) {
    await calculateProviderUsage(provider.id);
  }
}
```

2. **Subscription Monitor**
```typescript
// Check for subscription status and send notifications
export async function monitorSubscriptions() {
  const subscriptions = await getActiveSubscriptions();
  
  for (const subscription of subscriptions) {
    await checkSubscriptionStatus(subscription);
    await sendNotificationsIfNeeded(subscription);
  }
}
```

### Security & Validation

1. **Rate Limiting**
```typescript
// Implement rate limiting for API endpoints
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

2. **Input Validation**
```typescript
// Validation schemas for provider and subscription data
export const providerSchema = yup.object().shape({
  organization_name: yup.string().required(),
  contact_name: yup.string().required(),
  email: yup.string().email().required(),
  // ... other validations
});
```

### Error Handling

```typescript
// Global error handler for payment and subscription errors
export async function handleSubscriptionError(error: any) {
  // Log error
  logger.error('Subscription error:', error);
  
  // Notify admin
  await notifyAdmin(error);
  
  // Handle specific error types
  switch (error.type) {
    case 'StripeCardError':
      // Handle failed payment
      break;
    case 'StripeInvalidRequestError':
      // Handle invalid requests
      break;
    // ... other error types
  }
}
```

[Previous sections remain the same...]

For 5 provider slots:
Premium Tier: 2 slots
- Show highest performing available premium providers
- Rotate if similar performance metrics

Enhanced Tier: 2 slots
- Similar rotation among enhanced providers

Basic Tier: 1 slot
- Rotate through basic providers who meet requirements

Provider can see:
- Referral opportunities shown in
- Success rate when shown
- Average response time
- Client satisfaction scores

For each qualified provider, show:
- Last referral received date
- Total referrals received (last 30/60/90 days)
- Current active referrals
- Response rate (how quickly they respond)
- Success rate (accepted/completed referrals)

## New Features for Provider Referral Tracker

### 1. Service Delivery Milestones
- **Implementation**: Add a new column in the referral tracking system to track service delivery milestones.
- **Purpose**: This will help providers to monitor the progress of their services and ensure timely completion.

### 2. Progress Reporting
- **Implementation**: Implement a progress reporting feature in the referral tracking system.
- **Purpose**: This will allow providers to provide regular updates on the progress of their services.

### 3. Client Engagement Tracking
- **Implementation**: Add a new column in the referral tracking system to track client engagement.
- **Purpose**: This will help providers to monitor the level of engagement with their clients.

### 4. Documentation Status
- **Implementation**: Add a new column in the referral tracking system to track the status of service documentation.
- **Purpose**: This will help providers to ensure that all necessary documentation is completed and up-to-date.