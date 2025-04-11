
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Star, MapPin, Clock, CheckCheck, Shield, DollarSign } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  image: string;
  description: string;
  services: string[];
  counties: string[];
  insurance: string[];
  availability: 'high' | 'medium' | 'low';
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

const MatchedProviders = () => {
  const { referralId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Mock data for demo purposes
  const providers: Provider[] = [
    {
      id: '1',
      name: 'Minnesota Care Center',
      image: 'https://picsum.photos/seed/provider1/300/200',
      description: 'Comprehensive mental health services with a focus on trauma-informed care and evidence-based approaches.',
      services: ['Mental Health Therapy', 'Crisis Intervention', 'Family Counseling'],
      counties: ['Hennepin', 'Ramsey', 'Dakota'],
      insurance: ['Medicaid', 'Medicare', 'Blue Cross', 'HealthPartners'],
      availability: 'high',
      rating: 4.8,
      reviewCount: 124,
      featured: true
    },
    {
      id: '2',
      name: 'Family Services Inc.',
      image: 'https://picsum.photos/seed/provider2/300/200',
      description: 'Specialized family support services focused on strengthening relationships and improving family dynamics.',
      services: ['Family Therapy', 'Parenting Support', 'Youth Counseling'],
      counties: ['Hennepin', 'Anoka', 'Washington'],
      insurance: ['Medicaid', 'HealthPartners', 'UCare'],
      availability: 'medium',
      rating: 4.6,
      reviewCount: 86
    },
    {
      id: '3',
      name: 'Lifeline Behavioral Health',
      image: 'https://picsum.photos/seed/provider3/300/200',
      description: 'Comprehensive mental health and substance use treatment for individuals of all ages.',
      services: ['Substance Use Treatment', 'Mental Health Therapy', 'Group Therapy'],
      counties: ['Ramsey', 'Dakota', 'Washington'],
      insurance: ['Medicaid', 'Medicare', 'Blue Cross', 'Cigna'],
      availability: 'high',
      rating: 4.5,
      reviewCount: 92
    },
    {
      id: '4',
      name: 'Twin Cities Counseling',
      image: 'https://picsum.photos/seed/provider4/300/200',
      description: 'Culturally competent counseling services with specialists in trauma, anxiety, and depression.',
      services: ['Individual Therapy', 'Cultural Counseling', 'Trauma Therapy'],
      counties: ['Hennepin', 'Ramsey'],
      insurance: ['Medicaid', 'UCare', 'HealthPartners'],
      availability: 'low',
      rating: 4.7,
      reviewCount: 78
    },
    {
      id: '5',
      name: 'Community Wellness Partners',
      image: 'https://picsum.photos/seed/provider5/300/200',
      description: 'Holistic approach to mental health and wellness, combining traditional therapy with integrative practices.',
      services: ['Mental Health Therapy', 'Wellness Programs', 'Group Support'],
      counties: ['Anoka', 'Hennepin', 'Sherburne'],
      insurance: ['Medicaid', 'Medicare', 'Blue Cross'],
      availability: 'medium',
      rating: 4.4,
      reviewCount: 65
    }
  ];

  const handleSelectProvider = (providerId: string) => {
    setSelectedProvider(providerId);
    toast({
      title: "Provider Selected",
      description: "You've selected this provider. Click 'Confirm Selection' to proceed.",
    });
  };

  const handleConfirmSelection = () => {
    if (!selectedProvider) {
      toast({
        title: "No Provider Selected",
        description: "Please select a provider before confirming.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Referral Updated",
      description: "Provider has been notified and the referral status has been updated.",
    });

    // Navigate to the referral tracker with the referral ID
    setTimeout(() => {
      navigate(`/referral-tracker/${referralId}`);
    }, 1500);
  };

  const availabilityColors = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-red-100 text-red-800'
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Matched Providers</h1>
                <p className="text-gray-600 mt-1">
                  Referral #{referralId} • Mental Health Services • Urgent
                </p>
              </div>
              
              <Button 
                onClick={handleConfirmSelection}
                disabled={!selectedProvider}
                className="bg-referra-500 hover:bg-referra-600"
              >
                <CheckCheck className="mr-2 h-5 w-5" />
                Confirm Provider Selection
              </Button>
            </div>

            {/* Contextual information */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800">About Provider Matching</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Our AI has matched these providers based on your referral criteria, including service type, 
                  insurance acceptance, and availability. All providers are pre-vetted for quality and reliability.
                </p>
              </div>
            </div>
          </div>

          {/* Providers list */}
          <div className="space-y-4">
            {providers.map((provider) => (
              <Card 
                key={provider.id} 
                className={`overflow-hidden transition-all ${
                  selectedProvider === provider.id 
                    ? 'ring-2 ring-referra-500 shadow-md' 
                    : 'hover:shadow-md'
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Provider image */}
                    <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="w-full h-full object-cover" 
                      />
                      {provider.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-referra-500 hover:bg-referra-600 text-white">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Featured Provider
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Provider details */}
                    <div className="w-full md:w-3/4 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{provider.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{provider.rating}</span>
                            <span className="text-gray-500 text-sm">({provider.reviewCount} reviews)</span>
                          </div>
                        </div>
                        
                        <Badge 
                          className={`${availabilityColors[provider.availability]} flex items-center`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {provider.availability === 'high' && 'High Availability'}
                          {provider.availability === 'medium' && 'Medium Availability'}
                          {provider.availability === 'low' && 'Limited Availability'}
                        </Badge>
                      </div>
                      
                      <p className="mt-3 text-gray-600">{provider.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {provider.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Counties Served</h4>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{provider.counties.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Accepted Insurance</h4>
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{provider.insurance.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end items-end md:items-center">
                          <Button
                            className={
                              selectedProvider === provider.id
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-referra-500 hover:bg-referra-600"
                            }
                            onClick={() => handleSelectProvider(provider.id)}
                          >
                            {selectedProvider === provider.id ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Selected
                              </>
                            ) : (
                              'Select Provider'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MatchedProviders;
