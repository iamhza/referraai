import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Clipboard,
  MessageSquare,
  Star,
  StarHalf,
  User,
  Phone,
  Mail,
  MapPin,
  Check,
  Briefcase,
  FileCheck,
  Languages,
  Accessibility,
  CircleCheck
} from 'lucide-react';

const ReferralMatching = () => {
  const { referralId } = useParams<{ referralId: string }>();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [filterDistance, setFilterDistance] = useState(true);
  const [filterInsurance, setFilterInsurance] = useState(true);
  const [filterAvailability, setFilterAvailability] = useState(true);
  
  const referral = {
    id: referralId,
    service: "Adult rehabilitative mental health services (ARMHS)",
    urgency: "high",
    dateCreated: "Apr 9, 2025",
    status: "pending",
    caseManager: {
      name: "Sarah Johnson",
      organization: "Hennepin County Human Services",
      phone: "612-555-1234",
      email: "sarah.j@healthcare.org"
    },
    client: {
      referenceId: "CLIENT-2329",
      county: "Hennepin",
      zipCode: "55403",
      preferredLanguages: ["English", "Spanish"],
      accessibility: ["Wheelchair Access"],
      insurances: ["Medical Assistance", "UCare"]
    },
    notes: "Client is looking for services to help maintain independence in the community. Has previously had ARMHS services but provider left the field. Prefers female provider if possible."
  };
  
  const providers = [
    {
      id: "p1",
      name: "Mental Health Partners",
      services: ["Adult rehabilitative mental health services (ARMHS)", "Mental health targeted case management"],
      rating: 4.8,
      distance: "2.3 miles",
      address: "1234 Wellness Ave, Minneapolis, MN 55403",
      phone: "612-555-6789",
      email: "info@mentalhealthpartners.org",
      availableSlots: 12,
      insurances: ["Medical Assistance", "UCare", "Blue Cross", "HealthPartners"],
      languages: ["English", "Spanish", "Hmong"],
      accessibility: ["Wheelchair Access", "Hearing Impaired Services"],
      matchScore: 92
    },
    {
      id: "p2",
      name: "Community Behavioral Health",
      services: ["Adult rehabilitative mental health services (ARMHS)", "Housing stabilization services"],
      rating: 4.3,
      distance: "4.7 miles",
      address: "567 Health Street, Minneapolis, MN 55408",
      phone: "612-555-2345",
      email: "referrals@communitybh.org",
      availableSlots: 5,
      insurances: ["Medical Assistance", "UCare", "Medicare"],
      languages: ["English", "Somali"],
      accessibility: ["Wheelchair Access"],
      matchScore: 85
    },
    {
      id: "p3",
      name: "Wellness Recovery Center",
      services: ["Adult rehabilitative mental health services (ARMHS)", "Substance use disorder treatment"],
      rating: 4.1,
      distance: "6.2 miles",
      address: "789 Recovery Road, St. Paul, MN 55116",
      phone: "651-555-7890",
      email: "intake@wellnessrecovery.org",
      availableSlots: 8,
      insurances: ["Medical Assistance", "HealthPartners", "Medica"],
      languages: ["English"],
      accessibility: [],
      matchScore: 71
    },
    {
      id: "p4",
      name: "Integrated Health Services",
      services: ["Adult rehabilitative mental health services (ARMHS)", "Mental health targeted case management", "Family training"],
      rating: 4.6,
      distance: "3.8 miles",
      address: "321 Integrated Way, Minneapolis, MN 55404",
      phone: "612-555-3456",
      email: "services@integratedhealth.org",
      availableSlots: 3,
      insurances: ["Medical Assistance", "UCare", "Blue Cross"],
      languages: ["English", "Spanish", "Russian"],
      accessibility: ["Wheelchair Access", "Visual Impairment Services"],
      matchScore: 88
    }
  ];
  
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      searchTerm === '' || 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistance = !filterDistance || provider.distance.includes("miles");
    const matchesInsurance = !filterInsurance || provider.insurances.some(ins => 
      referral.client.insurances.includes(ins)
    );
    const matchesAvailability = !filterAvailability || provider.availableSlots > 0;
    
    return matchesSearch && matchesDistance && matchesInsurance && matchesAvailability;
  });
  
  const sortedProviders = [...filteredProviders].sort((a, b) => b.matchScore - a.matchScore);
  
  const handleSelectProvider = (providerId: string) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(selectedProviders.filter(id => id !== providerId));
    } else {
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };
  
  const handleMatchProviders = () => {
    if (selectedProviders.length === 0) {
      toast({
        title: "No providers selected",
        description: "Please select at least one provider to match with this referral.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Providers matched successfully",
      description: `${selectedProviders.length} provider(s) have been matched with referral #${referralId}.`,
    });
    
    setSelectedProviders([]);
  };
  
  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CircleCheck className="mr-1 h-3 w-3" />
          Excellent Match
        </Badge>
      );
    } else if (score >= 80) {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <CircleCheck className="mr-1 h-3 w-3" />
          Good Match
        </Badge>
      );
    } else if (score >= 70) {
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <StarHalf className="mr-1 h-3 w-3" />
          Fair Match
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Poor Match
        </Badge>
      );
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <Link to="/admin/referrals" className="flex items-center text-referra-600 hover:text-referra-700 mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Referrals
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Referral Matching</h1>
              <p className="text-gray-500">Referral #{referralId} - {referral.service}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleMatchProviders} disabled={selectedProviders.length === 0}>
                Match Selected Providers ({selectedProviders.length})
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm mb-6 sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Referral Details</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service Requested</p>
                    <p className="font-medium">{referral.service}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Urgency</p>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      High
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Case Manager</p>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {referral.caseManager.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{referral.caseManager.name}</p>
                        <p className="text-xs text-gray-500">{referral.caseManager.organization}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Client Reference</p>
                    <p className="font-medium">{referral.client.referenceId}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{referral.client.county} County</Badge>
                      <Badge variant="outline">{referral.client.zipCode}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Insurance</p>
                    <div className="flex flex-wrap gap-2">
                      {referral.client.insurances.map((insurance, index) => (
                        <Badge key={index} variant="outline">{insurance}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {referral.client.preferredLanguages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Accessibility</p>
                    <div className="flex flex-wrap gap-2">
                      {referral.client.accessibility.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Additional Notes</p>
                    <p className="text-sm">{referral.notes}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  <Clipboard className="mr-2 h-3 w-3" />
                  Copy Details
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-3 w-3" />
                  Contact Case Manager
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-none shadow-sm mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Provider Matching</CardTitle>
                  <Button variant="outline" size="sm">Auto-Match</Button>
                </div>
                <CardDescription>Select providers to match with this referral</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search providers by name or services..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={filterDistance ? "secondary" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => setFilterDistance(!filterDistance)}
                    >
                      <MapPin className="mr-1 h-3 w-3" />
                      By Distance
                    </Badge>
                    <Badge 
                      variant={filterInsurance ? "secondary" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => setFilterInsurance(!filterInsurance)}
                    >
                      <FileCheck className="mr-1 h-3 w-3" />
                      Insurance Match
                    </Badge>
                    <Badge 
                      variant={filterAvailability ? "secondary" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => setFilterAvailability(!filterAvailability)}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      Has Availability
                    </Badge>
                  </div>
                </div>
              </CardContent>
              
              <div className="px-6 pb-6">
                <Tabs defaultValue="best-match">
                  <TabsList className="mb-4">
                    <TabsTrigger value="best-match">Best Match</TabsTrigger>
                    <TabsTrigger value="closest">Closest</TabsTrigger>
                    <TabsTrigger value="availability">Most Available</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="best-match" className="space-y-4">
                    {sortedProviders.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                        <h3 className="text-lg font-medium">No matching providers</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your filters to see more results</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setFilterDistance(false);
                            setFilterInsurance(false);
                            setFilterAvailability(false);
                          }}
                        >
                          Clear all filters
                        </Button>
                      </div>
                    ) : (
                      sortedProviders.map((provider) => (
                        <Card key={provider.id} className={`border ${selectedProviders.includes(provider.id) ? 'border-referra-500 bg-referra-50' : 'border-gray-200'}`}>
                          <CardContent className="p-0">
                            <div className="p-4">
                              <div className="flex items-start">
                                <div className="flex-1">
                                  <div className="flex items-center mb-1">
                                    <h3 className="font-medium text-lg">{provider.name}</h3>
                                    <div className="flex items-center ml-2">
                                      <Star className="h-4 w-4 text-amber-500" />
                                      <span className="text-sm ml-1">{provider.rating}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                    {getMatchScoreBadge(provider.matchScore)}
                                    <Badge variant="outline">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      {provider.distance}
                                    </Badge>
                                    <Badge variant="outline">
                                      <Briefcase className="mr-1 h-3 w-3" />
                                      {provider.availableSlots} slots
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 ml-2">
                                  <Checkbox
                                    checked={selectedProviders.includes(provider.id)}
                                    onCheckedChange={() => handleSelectProvider(provider.id)}
                                    className="h-5 w-5"
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Services</p>
                                  <div className="flex flex-col gap-1">
                                    {provider.services.map((service, index) => (
                                      <p key={index} className="text-sm">
                                        {service === referral.service ? (
                                          <span className="font-medium text-referra-600 flex items-center">
                                            <Check className="h-3 w-3 mr-1" /> {service}
                                          </span>
                                        ) : (
                                          service
                                        )}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Contact Info</p>
                                  <div className="space-y-1">
                                    <div className="flex items-center text-sm">
                                      <Phone className="h-3 w-3 mr-2 text-gray-500" />
                                      <span>{provider.phone}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <Mail className="h-3 w-3 mr-2 text-gray-500" />
                                      <span>{provider.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                                      <span>{provider.address}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Insurance</p>
                                  <div className="flex flex-wrap gap-1">
                                    {provider.insurances.map((insurance, index) => (
                                      <Badge 
                                        key={index} 
                                        variant="outline"
                                        className={referral.client.insurances.includes(insurance) ? 'bg-green-50 text-green-700' : ''}
                                      >
                                        {referral.client.insurances.includes(insurance) && (
                                          <Check className="h-3 w-3 mr-1" />
                                        )}
                                        {insurance}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Languages</p>
                                  <div className="flex flex-wrap gap-1">
                                    {provider.languages.map((language, index) => (
                                      <Badge 
                                        key={index} 
                                        variant="outline"
                                        className={referral.client.preferredLanguages.includes(language) ? 'bg-green-50 text-green-700' : ''}
                                      >
                                        {referral.client.preferredLanguages.includes(language) && (
                                          <Check className="h-3 w-3 mr-1" />
                                        )}
                                        {language}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Accessibility</p>
                                  {provider.accessibility.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                      {provider.accessibility.map((feature, index) => (
                                        <Badge 
                                          key={index} 
                                          variant="outline"
                                          className={referral.client.accessibility.includes(feature) ? 'bg-green-50 text-green-700' : ''}
                                        >
                                          {referral.client.accessibility.includes(feature) && (
                                            <Check className="h-3 w-3 mr-1" />
                                          )}
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-400">No accessibility features listed</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="closest" className="space-y-4">
                    {sortedProviders.sort((a, b) => 
                      parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
                    ).map((provider) => (
                      <div key={provider.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.distance}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="availability" className="space-y-4">
                    {sortedProviders.sort((a, b) => b.availableSlots - a.availableSlots).map((provider) => (
                      <div key={provider.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.availableSlots} available slots</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReferralMatching;
