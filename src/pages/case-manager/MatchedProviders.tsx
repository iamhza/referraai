
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, Phone, Mail, ArrowUpRight, CheckCircle, Clock, Star, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MatchedProviders = () => {
  const navigate = useNavigate();
  const { referralId } = useParams<{ referralId: string }>();
  const { toast } = useToast();
  
  // Match scores are out of 100
  const providerMatches = [
    {
      id: 'provider1',
      name: 'Minnesota Care Center',
      description: 'Comprehensive mental health clinic with specialized services for adults and adolescents',
      matchScore: 96,
      availability: 'high',
      waitTime: '1-2 days',
      address: '123 Healthcare Ave, Minneapolis, MN 55401',
      distance: '3.2 miles',
      phone: '(612) 555-1234',
      email: 'intake@mncare.example.com',
      website: 'www.mncare.example.com',
      certifications: ['JCAHO Accredited', 'State Certified', 'Insurance Approved'],
      services: ['Individual Therapy', 'Group Therapy', 'Medication Management', 'Crisis Services'],
      acceptedInsurance: ['Medicaid', 'Medicare', 'Blue Cross', 'UnitedHealthcare', 'Cigna'],
      languages: ['English', 'Spanish', 'Hmong', 'Somali'],
      accessibility: ['Wheelchair Accessible', 'Public Transit Access', 'Interpreter Services'],
      rating: 4.8,
      reviews: 124
    },
    {
      id: 'provider2',
      name: 'Northside Family Services',
      description: 'Community-based organization offering holistic mental health and family support services',
      matchScore: 89,
      availability: 'medium',
      waitTime: '3-5 days',
      address: '456 Community Blvd, Minneapolis, MN 55412',
      distance: '5.7 miles',
      phone: '(612) 555-2345',
      email: 'services@northside.example.com',
      website: 'www.northside.example.com',
      certifications: ['State Certified', 'Nonprofit Status'],
      services: ['Individual Therapy', 'Family Therapy', 'Case Management', 'Youth Programs'],
      acceptedInsurance: ['Medicaid', 'Blue Cross', 'UnitedHealthcare'],
      languages: ['English', 'Spanish', 'Somali'],
      accessibility: ['Wheelchair Accessible', 'Evening Hours'],
      rating: 4.5,
      reviews: 86
    },
    {
      id: 'provider3',
      name: 'Lakeview Behavioral Health',
      description: 'Specialized mental health services with focus on evidence-based treatments',
      matchScore: 82,
      availability: 'low',
      waitTime: '7-10 days',
      address: '789 Lakeshore Dr, St. Paul, MN 55116',
      distance: '8.3 miles',
      phone: '(651) 555-3456',
      email: 'appointments@lakeview.example.com',
      website: 'www.lakeview.example.com',
      certifications: ['JCAHO Accredited', 'Research Partner', 'State Certified'],
      services: ['Individual Therapy', 'Group Therapy', 'Psychological Testing', 'Specialized Treatments'],
      acceptedInsurance: ['Medicare', 'Blue Cross', 'UnitedHealthcare', 'Cigna', 'HealthPartners'],
      languages: ['English', 'Spanish'],
      accessibility: ['Wheelchair Accessible', 'Service Animals Welcome'],
      rating: 4.7,
      reviews: 102
    }
  ];
  
  const handleSelectProvider = (providerId: string) => {
    toast({
      title: "Provider Selected",
      description: "Your referral has been sent to the provider. You'll be notified when they respond.",
    });
    
    setTimeout(() => {
      navigate(`/case-manager/referral-tracker/${referralId}`);
    }, 1500);
  };
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-amber-600';
    return 'text-gray-600';
  };
  
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/case-manager/referrals" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to referrals
          </Link>
        </Button>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Matched Providers for Referral #{referralId}</h1>
          <p className="text-gray-500 mt-1">
            We found {providerMatches.length} providers that match your referral requirements
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Referral Overview</CardTitle>
            <CardDescription>Mental Health Services • Created: Apr 11, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-medium">Client</h3>
                <p>John Smith</p>
              </div>
              <div>
                <h3 className="font-medium">Urgency</h3>
                <Badge className="bg-amber-100 text-amber-800 mt-1">Medium</Badge>
              </div>
              <div>
                <h3 className="font-medium">Insurance</h3>
                <p>Medicaid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          {providerMatches.map((provider, index) => (
            <Card key={provider.id} className="border overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{provider.name}</CardTitle>
                      <Badge className={getAvailabilityColor(provider.availability)}>
                        {provider.availability === 'high' ? 'High Availability' : 
                         provider.availability === 'medium' ? 'Medium Availability' : 
                         'Low Availability'}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">{provider.description}</CardDescription>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(provider.matchScore)}`}>
                      {provider.matchScore}%
                    </div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>
              </CardHeader>
              
              <div>
                <Tabs defaultValue="overview">
                  <TabsList className="w-full border-b rounded-none px-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="p-0">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Wait Time</h3>
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{provider.waitTime}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <div className="flex items-start mt-1">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                              <div>
                                <div>{provider.address}</div>
                                <div className="text-sm text-gray-500">{provider.distance} away</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                            <div className="space-y-2 mt-1">
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{provider.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{provider.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Insurance Accepted</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {provider.acceptedInsurance.map((insurance, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-50">
                                  {insurance}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {provider.languages.map((language, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-50">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Client Rating</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${star <= Math.floor(provider.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm ml-1">{provider.rating} ({provider.reviews} reviews)</span>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Accessibility</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {provider.accessibility.map((feature, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-50">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {provider.certifications.map((cert, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-50">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="services" className="p-0">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3">Available Services</h3>
                          <ul className="space-y-2">
                            {provider.services.map((service, i) => (
                              <li key={i} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Why This Match?</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span>Service Match</span>
                                <span className="font-medium">98%</span>
                              </div>
                              <Progress value={98} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span>Location/Accessibility</span>
                                <span className="font-medium">95%</span>
                              </div>
                              <Progress value={95} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span>Insurance Coverage</span>
                                <span className="font-medium">100%</span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span>Availability</span>
                                <span className="font-medium">{provider.availability === 'high' ? '90%' : provider.availability === 'medium' ? '70%' : '50%'}</span>
                              </div>
                              <Progress value={provider.availability === 'high' ? 90 : provider.availability === 'medium' ? 70 : 50} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span>Client Preferences</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <Progress value={92} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="details" className="p-0">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3">Provider Details</h3>
                          <p className="text-gray-700 mb-4">
                            {provider.name} is a leading provider of mental health services in the Minneapolis area.
                            They specialize in evidence-based treatments and offer a comprehensive range of services
                            for individuals of all ages.
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium">Provider Size</h4>
                              <p className="text-sm text-gray-600">Medium (15-30 clinicians)</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Years in Service</h4>
                              <p className="text-sm text-gray-600">15+ years</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Specialized Populations</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <Badge variant="outline" className="bg-gray-50">
                                  Adults
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50">
                                  Adolescents
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50">
                                  Veterans
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50">
                                  LGBTQ+
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Recent Referral Performance</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>Acceptance Rate</span>
                              </div>
                              <Badge className="bg-green-100 text-green-800">
                                95%
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                <span>Average Response Time</span>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">
                                1.2 days
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-purple-500 mr-2" />
                                <span>Client Satisfaction</span>
                              </div>
                              <Badge className="bg-purple-100 text-purple-800">
                                4.8/5
                              </Badge>
                            </div>
                            
                            <div className="pt-4 mt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Latest Client Feedback</h4>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                      key={star} 
                                      className="h-3 w-3 text-amber-400 fill-amber-400" 
                                    />
                                  ))}
                                </div>
                                <p className="text-sm mt-1">
                                  "Great experience with this provider. Very responsive and caring staff. The therapist was knowledgeable and helped my client significantly."
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  - Case Manager, 2 weeks ago
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </div>
              
              <CardFooter className="bg-gray-50 border-t p-4 flex justify-between items-center">
                <Button variant="outline" asChild>
                  <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Visit Website
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">View Provider Profile</Button>
                  <Button 
                    className="bg-referra-500 hover:bg-referra-600"
                    onClick={() => handleSelectProvider(provider.id)}
                  >
                    Select This Provider
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MatchedProviders;
