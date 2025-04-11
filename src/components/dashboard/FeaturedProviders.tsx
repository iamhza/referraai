
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  services: string[];
  premium: boolean;
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
    services: ['Counseling', 'Therapy', 'Crisis Intervention'],
    premium: true,
    capacity: 'high',
    badge: 'Top Provider'
  },
  {
    id: '2',
    name: 'Family Services Inc.',
    type: 'Family Support',
    image: 'https://picsum.photos/seed/provider2/300/200',
    rating: 4.6,
    services: ['Parenting Support', 'Child Welfare', 'Family Therapy'],
    premium: true,
    capacity: 'medium'
  },
  {
    id: '3',
    name: 'Twin Cities Housing',
    type: 'Housing Assistance',
    image: 'https://picsum.photos/seed/provider3/300/200',
    rating: 4.5,
    services: ['Emergency Housing', 'Rental Assistance', 'Housing Search'],
    premium: true,
    capacity: 'low'
  },
  {
    id: '4',
    name: 'HealthPlus Partners',
    type: 'Healthcare',
    image: 'https://picsum.photos/seed/provider4/300/200',
    rating: 4.7,
    services: ['Primary Care', 'Specialized Treatment', 'Telehealth'],
    premium: true,
    capacity: 'high'
  },
];

const capacityColors = {
  high: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-red-100 text-red-800',
};

export const FeaturedProviders = () => {
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

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Featured Providers</h2>
          <p className="text-sm text-gray-500 mt-1">Recommended service providers</p>
        </div>
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
      </div>
      
      <div className="relative overflow-hidden" style={{ height: '360px' }}>
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {providers.map((provider) => (
            <div 
              key={provider.id}
              className="w-full flex-shrink-0"
            >
              <div className="p-6">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-40 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {provider.badge && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-referra-500 hover:bg-referra-600 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {provider.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <p className="text-sm text-gray-500">{provider.type}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
                    <span>{provider.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.services.map((service) => (
                    <Badge key={service} variant="outline" className="bg-gray-50">
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-5">
                  <Badge 
                    className={`${capacityColors[provider.capacity]} flex items-center`}
                  >
                    <span className="mr-1 text-xs">Capacity:</span>
                    <span>{provider.capacity.charAt(0).toUpperCase() + provider.capacity.slice(1)}</span>
                  </Badge>
                  
                  <Button className="bg-referra-500 hover:bg-referra-600 transition-colors">
                    <span className="mr-2">Select Provider</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {providers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-referra-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProviders;
