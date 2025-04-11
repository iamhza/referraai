
import React, { useState, useEffect } from 'react';
import { Star, MapPin, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Provider {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  location: string;
  services: string[];
  capacity: 'high' | 'medium' | 'low';
  badge?: string;
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Minnesota Care Center',
    type: 'Mental Health',
    image: 'https://picsum.photos/seed/provider1/300/200',
    rating: 4.8,
    location: 'Minneapolis, MN',
    services: ['Counseling', 'Therapy', 'Crisis Intervention'],
    capacity: 'high',
    badge: 'Featured Provider'
  },
  {
    id: '2',
    name: 'Family Services Inc.',
    type: 'Family Support',
    image: 'https://picsum.photos/seed/provider2/300/200',
    rating: 4.6,
    location: 'St. Paul, MN',
    services: ['Parenting Support', 'Child Welfare'],
    capacity: 'medium',
  },
  {
    id: '3',
    name: 'Twin Cities Housing',
    type: 'Housing Assistance',
    image: 'https://picsum.photos/seed/provider3/300/200',
    rating: 4.5,
    location: 'Bloomington, MN',
    services: ['Emergency Housing', 'Rental Assistance'],
    capacity: 'low',
  },
];

const capacityColors = {
  high: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-red-100 text-red-800',
};

const FeaturedProviderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % providers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + providers.length) % providers.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % providers.length);
  };

  const currentProvider = providers[currentIndex];

  return (
    <Card className="border-none shadow-sm bg-white mb-6">
      <CardHeader className="pb-0 pt-5 flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Featured Provider</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handlePrev}
          >
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleNext}
          >
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="relative w-full md:w-1/3 h-40 md:h-auto">
            <img 
              src={currentProvider.image} 
              alt={currentProvider.name} 
              className="w-full h-full object-cover rounded-lg" 
            />
            {currentProvider.badge && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-referra-500 hover:bg-referra-600 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {currentProvider.badge}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{currentProvider.name}</h3>
                <p className="text-sm text-gray-500">{currentProvider.type}</p>
              </div>
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
                <span>{currentProvider.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{currentProvider.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProvider.services.map((service) => (
                <Badge key={service} variant="outline" className="bg-gray-50">
                  <Check className="h-3 w-3 mr-1" /> {service}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-5">
              <Badge 
                className={`${capacityColors[currentProvider.capacity]} flex items-center`}
              >
                <span className="mr-1 text-xs">Capacity:</span>
                <span>{currentProvider.capacity.charAt(0).toUpperCase() + currentProvider.capacity.slice(1)}</span>
              </Badge>
              
              <Button className="bg-referra-500 hover:bg-referra-600 transition-colors">
                Start Referral
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {providers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-referra-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to provider ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedProviderCard;
