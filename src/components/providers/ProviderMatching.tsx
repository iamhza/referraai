
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, MessageSquare, Star, Info, AlertCircle, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Provider {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  match: number;
  services: string[];
  counties: string[];
  insurances: string[];
  capacity: 'high' | 'medium' | 'low';
  availability: string;
  distance: string;
  premium: boolean;
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Minnesota Care Center',
    type: 'Mental Health',
    image: 'https://picsum.photos/seed/provider1/300/200',
    rating: 4.8,
    match: 98,
    services: ['Counseling', 'Therapy', 'Crisis Intervention'],
    counties: ['Hennepin', 'Ramsey'],
    insurances: ['Medicaid', 'Medicare', 'Blue Cross'],
    capacity: 'high',
    availability: 'Next day',
    distance: '3.2 miles',
    premium: true
  },
  {
    id: '2',
    name: 'Family Services Inc.',
    type: 'Family Support',
    image: 'https://picsum.photos/seed/provider2/300/200',
    rating: 4.6,
    match: 95,
    services: ['Parenting Support', 'Child Welfare', 'Family Therapy'],
    counties: ['Hennepin', 'Anoka'],
    insurances: ['Medicaid', 'UCare', 'HealthPartners'],
    capacity: 'medium',
    availability: '3-5 days',
    distance: '5.8 miles',
    premium: true
  },
  {
    id: '3',
    name: 'Twin Cities Housing',
    type: 'Housing Assistance',
    image: 'https://picsum.photos/seed/provider3/300/200',
    rating: 4.5,
    match: 90,
    services: ['Emergency Housing', 'Rental Assistance', 'Housing Search'],
    counties: ['Hennepin', 'Ramsey', 'Dakota'],
    insurances: ['Medicaid', 'Self-Pay', 'Sliding Scale'],
    capacity: 'low',
    availability: '1-2 weeks',
    distance: '7.1 miles',
    premium: false
  },
  {
    id: '4',
    name: 'HealthPlus Partners',
    type: 'Healthcare',
    image: 'https://picsum.photos/seed/provider4/300/200',
    rating: 4.7,
    match: 88,
    services: ['Primary Care', 'Specialized Treatment', 'Telehealth'],
    counties: ['Hennepin', 'Washington', 'Anoka'],
    insurances: ['Medicaid', 'Medicare', 'Most Private'],
    capacity: 'high',
    availability: '2-3 days',
    distance: '4.5 miles',
    premium: false
  },
  {
    id: '5',
    name: 'Community Mental Health',
    type: 'Mental Health',
    image: 'https://picsum.photos/seed/provider5/300/200',
    rating: 4.4,
    match: 85,
    services: ['Counseling', 'Psychiatry', 'Group Therapy'],
    counties: ['Ramsey', 'Dakota'],
    insurances: ['Medicaid', 'Medicare', 'Some Private'],
    capacity: 'medium',
    availability: '1 week',
    distance: '8.2 miles',
    premium: false
  },
];

const capacityColors = {
  high: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-red-100 text-red-800',
};

export const ProviderMatching = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSelectProvider = (providerId: string) => {
    setSelectedProvider(providerId);
    toast({
      title: "Provider Selected",
      description: "The provider has been notified of your referral. You'll be updated when they respond.",
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow-card">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Provider Matches</h2>
            <p className="text-gray-500 mt-1">Based on your referral for Maria Johnson</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Refine Matches</Button>
            <Button variant="outline">Filter Results</Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-referra-100 text-referra-800 hover:bg-referra-200">Medicaid</Badge>
          <Badge className="bg-referra-100 text-referra-800 hover:bg-referra-200">Mental Health</Badge>
          <Badge className="bg-referra-100 text-referra-800 hover:bg-referra-200">Hennepin County</Badge>
          <Badge className="bg-referra-100 text-referra-800 hover:bg-referra-200">Weekday Availability</Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <AlertCircle className="h-4 w-4" />
          <span>Showing top 5 provider matches out of 27 total providers</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {providers.map((provider) => (
          <Card 
            key={provider.id}
            className={cn(
              "border overflow-hidden transition-all duration-300 hover:shadow-md",
              selectedProvider === provider.id ? "ring-2 ring-referra-500" : ""
            )}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 lg:w-64 relative overflow-hidden">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={`bg-referra-500 text-white ${
                    provider.match >= 95 ? "animate-pulse-scale" : ""
                  }`}>
                    {provider.match}% Match
                  </Badge>
                </div>
                {provider.premium && (
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-amber-400 text-amber-900">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <p className="text-gray-500">{provider.type}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
                    <span>{provider.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 mt-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Services</div>
                    <div className="flex flex-wrap gap-1">
                      {provider.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Counties Served</div>
                    <div className="flex flex-wrap gap-1">
                      {provider.counties.map((county) => (
                        <div key={county} className="text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{county}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Insurance</div>
                    <p className="text-sm">{provider.insurances.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-1">
                    <Badge 
                      className={`${capacityColors[provider.capacity]} flex items-center`}
                    >
                      <span className="text-xs">Capacity:</span>
                      <span>{provider.capacity.charAt(0).toUpperCase() + provider.capacity.slice(1)}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Available: {provider.availability}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{provider.distance}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    className="bg-referra-500 hover:bg-referra-600 transition-colors"
                    onClick={() => handleSelectProvider(provider.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    <span>Select Provider</span>
                  </Button>
                  <Button variant="outline">
                    <Info className="h-4 w-4 mr-2" />
                    <span>View Details</span>
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Message</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mr-2">Show More Providers</Button>
        <Button variant="outline">Request Additional Matches</Button>
      </div>
    </div>
  );
};

export default ProviderMatching;
