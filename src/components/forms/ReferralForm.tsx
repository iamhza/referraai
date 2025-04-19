import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { CalendarIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import { supabase } from '../../integrations/supabase/client';

// List of all available services
const AVAILABLE_SERVICES = [
  "24-hour emergency assistance (waiver)",
  "Adult companion services",
  "Adult day services (ADS)",
  "Adult rehabilitative mental health services (ARMHS)",
  "Assisted living facility with dementia care",
  "Basic home care license",
  "Behavioral health home (BHH) services",
  "Case management (waiver)",
  "Certified community behavioral health clinic (CCBHC)",
  "Chore services (waiver)",
  "Community behavioral health hospital (CBHH)",
  "Comprehensive home care license",
  "Consumer-directed community supports (CDCS) support planner",
  "Crisis respite",
  "Customized living services",
  "Day support services",
  "Dental clinic",
  "Employment services (waiver)",
  "Environmental accessibility adaptations (EAA) home assessment",
  "Environmental accessibility adaptations (EAA) home modification",
  "Environmental accessibility adaptations (EAA) vehicle modification",
  "Family residential services",
  "Family training",
  "Home-delivered meals",
  "Homemaker services",
  "Home safety",
  "Housing stabilization services (HSS)",
  "Independent living skills therapy (waiver)",
  "Individual community living supports (ICLS)",
  "Individualized home supports (IHS) with family training",
  "Individualized home supports (IHS) without training",
  "Individualized home supports (IHS) with training",
  "Integrated community supports (ICS)",
  "Job training",
  "Medical equipment and supplies",
  "Night supervision",
  "Nursing home",
  "Nursing home out of state",
  "Nutrition services (waiver)",
  "Opioid treatment – non-residential",
  "Personal care assistant (PCA)",
  "Personal emergency response system (PERS)",
  "Positive support services",
  "Prevocational services",
  "Respite",
  "Specialist services",
  "Specialized equipment and supplies",
  "Supervised living facility",
  "Supportive housing",
  "Transitional services",
  "Transportation (waiver)",
  "Vocational rehabilitation (VR) community partner"
];

interface ClientInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | undefined;
  sex: 'male' | 'female' | 'other';
  pmiNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceProvider: string;
  insuranceId: string;
  additionalNotes: string;
  waiverType: 'CADI' | 'DD' | 'EW' | 'CAC' | 'BI' | '';
  planType: 'CSSP' | 'CCP' | 'HFPCP' | '';
  safetyInfo: {
    hasHistoryOfViolence: boolean;
    violenceNotes?: string;
    isSexOffender: boolean;
    sexOffenderNotes?: string;
  };
}

interface ReferralFormProps {
  onComplete?: () => void;
}

const ReferralForm = ({ onComplete }: ReferralFormProps) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedUrgency, setSelectedUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedServiceHours, setSelectedServiceHours] = useState<string[]>([]);
  const [emergencyServicesNeeded, setEmergencyServicesNeeded] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<ClientInformation>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: undefined,
    sex: 'male',
    pmiNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    insuranceProvider: "",
    insuranceId: "",
    additionalNotes: "",
    waiverType: '',
    planType: '',
    safetyInfo: {
      hasHistoryOfViolence: false,
      violenceNotes: '',
      isSexOffender: false,
      sexOffenderNotes: ''
    }
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalSteps = 4;
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const handleUrgencyChange = (value: 'low' | 'medium' | 'high') => {
    setSelectedUrgency(value);
  };

  const handleCountyChange = (value: string) => {
    setSelectedCounties(prev => 
      prev.includes(value) 
        ? prev.filter(county => county !== value)
        : [...prev, value]
    );
  };

  const handleServiceHoursChange = (time: string, checked: boolean) => {
    setSelectedServiceHours(prev => 
      checked 
        ? [...prev, time]
        : prev.filter(t => t !== time)
    );
  };

  const handleEmergencyServicesChange = (value: string) => {
    setEmergencyServicesNeeded(value === 'yes');
  };
  
  const validateForm = () => {
    // Basic validation for required fields
    if (!selectedService) {
      toast({
        title: "Validation Error",
        description: "Please select a service",
        variant: "destructive",
      });
      return false;
    }

    if (!date) {
      toast({
        title: "Validation Error",
        description: "Please select a preferred start date",
        variant: "destructive",
      });
      return false;
    }

    if (selectedCounties.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one county",
        variant: "destructive",
      });
      return false;
    }

    if (!clientInfo.firstName || !clientInfo.lastName || !clientInfo.dateOfBirth || 
        !clientInfo.pmiNumber || !clientInfo.address || !clientInfo.city || 
        !clientInfo.state || !clientInfo.zipCode || !clientInfo.waiverType || 
        !clientInfo.planType) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required client information fields",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Get the current user from Supabase
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      console.log('Auth check:', { user, error: authError });
      
      if (authError || !user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit a referral. Please log in and try again.",
          variant: "destructive",
        });
        return;
      }

      // Prepare PHI data for MongoDB
      const phiData = {
        firstName: clientInfo.firstName,
        middleName: clientInfo.middleName,
        lastName: clientInfo.lastName,
        dateOfBirth: clientInfo.dateOfBirth,
        sex: clientInfo.sex,
        pmiNumber: clientInfo.pmiNumber,
        email: clientInfo.email,
        phone: clientInfo.phone,
        address: {
          street: clientInfo.address,
          city: clientInfo.city,
          state: clientInfo.state,
          zipCode: clientInfo.zipCode
        },
        insuranceProvider: clientInfo.insuranceProvider,
        insuranceId: clientInfo.insuranceId,
        safetyInfo: {
          hasHistoryOfViolence: clientInfo.safetyInfo.hasHistoryOfViolence,
          violenceNotes: clientInfo.safetyInfo.violenceNotes,
          isSexOffender: clientInfo.safetyInfo.isSexOffender,
          sexOffenderNotes: clientInfo.safetyInfo.sexOffenderNotes
        },
        medicalNotes: clientInfo.additionalNotes,
        userId: user.id
      };

      console.log('Submitting PHI data to MongoDB...');
      
      // 1. Save PHI data to MongoDB
      const phiResponse = await fetch('http://localhost:5001/api/phi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phiData),
      });

      if (!phiResponse.ok) {
        const errorData = await phiResponse.json();
        throw new Error(errorData.error || 'Failed to store PHI data');
      }

      const { mongoPhiId } = await phiResponse.json();
      console.log('PHI data stored with ID:', mongoPhiId);

      // 2. Save non-PHI data to Supabase
      const nonPhiData = {
        case_manager_id: user.id,
        mongo_id: mongoPhiId,
        service_type: selectedService,
        urgency: selectedUrgency.charAt(0).toUpperCase() + selectedUrgency.slice(1),
        preferred_start_date: date,
        counties: selectedCounties,
        service_hours_preference: selectedServiceHours,
        emergency_services_needed: emergencyServicesNeeded,
        waiver_type: clientInfo.waiverType,
        plan_type: clientInfo.planType,
        status: 'pending',
        additional_notes: clientInfo.additionalNotes
      };

      console.log('Submitting to Supabase with urgency:', selectedUrgency.charAt(0).toUpperCase() + selectedUrgency.slice(1));
      console.log('Full nonPhiData:', nonPhiData);
      
      const { data: referralData, error: supabaseError } = await supabase
        .from('referrals')
        .insert(nonPhiData)
        .select()
        .single();

      if (supabaseError) {
        // If Supabase insert fails, we should ideally delete the PHI data from MongoDB
        console.error('Failed to save to Supabase, should cleanup MongoDB:', mongoPhiId);
        throw supabaseError;
      }

      console.log('Referral created successfully:', referralData);
      
      // Show success message
      toast({
        title: "Referral Submitted Successfully",
        description: "Your referral has been created and is now visible in your dashboard.",
      });

      // Navigate back to the case manager's dashboard
      setTimeout(() => {
        navigate('/case-manager/referrals');
      }, 1500);

    } catch (error) {
      console.error('Error submitting referral:', error);
      toast({
        title: "Error",
        description: "Failed to submit referral. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card overflow-hidden">
      {/* Progress Bar */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Create New Referral</h2>
          <div className="text-sm text-gray-500">Step {step} of {totalSteps}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-referra-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-6 sm:p-8">
        {/* Step 1: Service Request Basics */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 1
              </div>
              <h3 className="text-lg font-semibold">Service Request Basics</h3>
              <p className="text-gray-500 mt-1">Tell us what service you're looking for</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">What service is needed?</Label>
                <Select 
                  value={selectedService} 
                  onValueChange={handleServiceChange}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {AVAILABLE_SERVICES.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Urgency of the request?</Label>
                <RadioGroup 
                  value={selectedUrgency} 
                  onValueChange={handleUrgencyChange} 
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={(day) => setDate(day)}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="counties">Counties to be served</Label>
                <Select onValueChange={handleCountyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select counties (can select multiple)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hennepin">Hennepin</SelectItem>
                    <SelectItem value="ramsey">Ramsey</SelectItem>
                    <SelectItem value="dakota">Dakota</SelectItem>
                    <SelectItem value="anoka">Anoka</SelectItem>
                    <SelectItem value="washington">Washington</SelectItem>
                  </SelectContent>
                </Select>
                {selectedCounties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCounties.map((county) => (
                      <Badge 
                        key={county}
                        variant="secondary"
                        className="flex items-center gap-1"
                        onClick={() => handleCountyChange(county)}
                      >
                        {county}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCountyChange(county);
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any additional details about the service request..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Client Information */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 2
              </div>
              <h3 className="text-lg font-semibold">Client Information</h3>
              <p className="text-gray-500 mt-1">Enter client's personal and program details</p>
            </div>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input 
                      id="firstName"
                      value={clientInfo.firstName}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        firstName: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input 
                      id="middleName"
                      value={clientInfo.middleName}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        middleName: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input 
                      id="lastName"
                      value={clientInfo.lastName}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        lastName: e.target.value
                      })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth and PMI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of Birth*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !clientInfo.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {clientInfo.dateOfBirth ? format(clientInfo.dateOfBirth, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DayPicker
                        mode="single"
                        selected={clientInfo.dateOfBirth}
                        onSelect={(day) => setClientInfo({ ...clientInfo, dateOfBirth: day || undefined })}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pmiNumber">PMI Number*</Label>
                  <Input 
                    id="pmiNumber"
                    value={clientInfo.pmiNumber}
                    onChange={(e) => setClientInfo({
                      ...clientInfo,
                      pmiNumber: e.target.value
                    })}
                    required
                  />
                </div>
              </div>

              {/* Sex Selection */}
              <div className="space-y-2">
                <Label>Sex*</Label>
                <RadioGroup 
                  value={clientInfo.sex}
                  onValueChange={(value: 'male' | 'female' | 'other') => 
                    setClientInfo({
                      ...clientInfo,
                      sex: value
                    })
                  }
                >
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="sex-male" />
                      <Label htmlFor="sex-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="sex-female" />
                      <Label htmlFor="sex-female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="sex-other" />
                      <Label htmlFor="sex-other">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Address */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Address</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address*</Label>
                    <Input 
                      id="street"
                      value={clientInfo.address}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        address: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City*</Label>
                      <Input 
                        id="city"
                        value={clientInfo.city}
                        onChange={(e) => setClientInfo({
                          ...clientInfo,
                          city: e.target.value
                        })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State*</Label>
                      <Input 
                        id="state"
                        value={clientInfo.state}
                        onChange={(e) => setClientInfo({
                          ...clientInfo,
                          state: e.target.value
                        })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code*</Label>
                      <Input 
                        id="zip"
                        value={clientInfo.zipCode}
                        onChange={(e) => setClientInfo({
                          ...clientInfo,
                          zipCode: e.target.value
                        })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Program Information</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Waiver Type*</Label>
                    <Select 
                      value={clientInfo.waiverType}
                      onValueChange={(value) => setClientInfo({
                        ...clientInfo,
                        waiverType: value as ClientInformation['waiverType']
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select waiver type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CADI">CADI - Community Access for Disability Inclusion</SelectItem>
                        <SelectItem value="DD">DD - Developmental Disabilities</SelectItem>
                        <SelectItem value="EW">EW - Elderly Waiver</SelectItem>
                        <SelectItem value="CAC">CAC - Community Alternative Care</SelectItem>
                        <SelectItem value="BI">BI - Brain Injury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Person-Centered Plan Type*</Label>
                    <Select 
                      value={clientInfo.planType}
                      onValueChange={(value) => setClientInfo({
                        ...clientInfo,
                        planType: value as ClientInformation['planType']
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSSP">CSSP - Community Support Services Plan</SelectItem>
                        <SelectItem value="CCP">CCP - Coordinated Care Plan</SelectItem>
                        <SelectItem value="HFPCP">HFPCP - Health and Family-Centered Care Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Safety Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Safety Information</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="historyOfViolence"
                        checked={clientInfo.safetyInfo.hasHistoryOfViolence}
                        onCheckedChange={(checked) => setClientInfo({
                          ...clientInfo,
                          safetyInfo: {
                            ...clientInfo.safetyInfo,
                            hasHistoryOfViolence: checked as boolean
                          }
                        })}
                      />
                      <Label htmlFor="historyOfViolence">History of Violence</Label>
                    </div>
                    {clientInfo.safetyInfo.hasHistoryOfViolence && (
                      <Textarea 
                        placeholder="Please provide details..."
                        value={clientInfo.safetyInfo.violenceNotes}
                        onChange={(e) => setClientInfo({
                          ...clientInfo,
                          safetyInfo: {
                            ...clientInfo.safetyInfo,
                            violenceNotes: e.target.value
                          }
                        })}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sexOffender"
                        checked={clientInfo.safetyInfo.isSexOffender}
                        onCheckedChange={(checked) => setClientInfo({
                          ...clientInfo,
                          safetyInfo: {
                            ...clientInfo.safetyInfo,
                            isSexOffender: checked as boolean
                          }
                        })}
                      />
                      <Label htmlFor="sexOffender">Registered Sex Offender</Label>
                    </div>
                    {clientInfo.safetyInfo.isSexOffender && (
                      <Textarea 
                        placeholder="Please provide registry information..."
                        value={clientInfo.safetyInfo.sexOffenderNotes}
                        onChange={(e) => setClientInfo({
                          ...clientInfo,
                          safetyInfo: {
                            ...clientInfo.safetyInfo,
                            sexOffenderNotes: e.target.value
                          }
                        })}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Provider Matching Preferences */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 3
              </div>
              <h3 className="text-lg font-semibold">Provider Matching Preferences</h3>
              <p className="text-gray-500 mt-1">Help us find the right providers</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Provider Type</Label>
                <RadioGroup defaultValue="no-preference" className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="provider-no-preference" />
                    <Label htmlFor="provider-no-preference">No Preference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="provider-small" />
                    <Label htmlFor="provider-small">Small Provider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="provider-large" />
                    <Label htmlFor="provider-large">Large Provider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nonprofit" id="provider-nonprofit" />
                    <Label htmlFor="provider-nonprofit">Nonprofit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faith-based" id="provider-faith-based" />
                    <Label htmlFor="provider-faith-based">Faith-based</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Insurance Accepted</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {['Medicaid', 'Medicare', 'Private Insurance', 'Self-Pay', 'Sliding Scale'].map((insurance) => (
                    <div key={insurance} className="flex items-center space-x-2">
                      <Checkbox id={`insurance-${insurance.toLowerCase().replace(' ', '-')}`} />
                      <label
                        htmlFor={`insurance-${insurance.toLowerCase().replace(' ', '-')}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {insurance}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Languages Available</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {['English', 'Spanish', 'Somali', 'Hmong', 'Arabic'].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox id={`language-${language.toLowerCase()}`} defaultChecked={language === 'English'} />
                      <label
                        htmlFor={`language-${language.toLowerCase()}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Best Days/Times for Service</p>
                <div className="flex flex-wrap gap-4">
                  {['Weekdays', 'Evenings', 'Weekends', 'Flexible'].map((time) => (
                    <label key={time} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedServiceHours.includes(time)}
                        onChange={(e) => handleServiceHoursChange(time, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Emergency or After-Hours Services Needed?</p>
                <div className="flex gap-4">
                  {['yes', 'no'].map((value) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="emergency-services"
                        value={value}
                        checked={value === 'yes' ? emergencyServicesNeeded : !emergencyServicesNeeded}
                        onChange={(e) => handleEmergencyServicesChange(e.target.value)}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="capitalize">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-referra-50 border border-referra-200">
                <div className="flex items-center mb-2">
                  <Checkbox id="availability" />
                  <label
                    htmlFor="availability"
                    className="text-sm font-medium ml-2 text-gray-900"
                  >
                    Show providers with available capacity
                  </label>
                </div>
                <p className="text-xs text-gray-600 ml-6">
                  Only show providers that have confirmed available capacity to accept new referrals
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 border">
                <h4 className="font-medium mb-2">Provider Availability</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High</Badge>
                    <span className="text-sm">14 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                    <span className="text-sm">8 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Low</Badge>
                    <span className="text-sm">5 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>
                    <span className="text-sm">3 providers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Contact & Follow-Up */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 4
              </div>
              <h3 className="text-lg font-semibold">Contact & Follow-Up</h3>
              <p className="text-gray-500 mt-1">Your information for provider communications</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="managerName">Case Manager Name</Label>
                  <Input id="managerName" defaultValue="Case Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input id="organization" defaultValue="Community Support Agency" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="manager@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-email" defaultChecked />
                    <label
                      htmlFor="notify-email"
                      className="text-sm leading-none"
                    >
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-sms" />
                    <label
                      htmlFor="notify-sms"
                      className="text-sm leading-none"
                    >
                      SMS notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes for Providers</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific details you want providers to know about this referral..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> After submitting this referral, matched providers will be notified. You'll be able to communicate directly with providers who accept the referral.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            type="button"
            onClick={step === totalSteps ? handleSubmit : nextStep}
          >
            {step === totalSteps ? 'Submit Referral' : 'Next'}
            {step !== totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;
