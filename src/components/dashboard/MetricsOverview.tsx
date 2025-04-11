
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, AlertTriangle, Users, Search, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReferralPipeline from './ReferralPipeline';
import OpenReferrals from './OpenReferrals';
import FeaturedProviderCard from './FeaturedProviderCard';
import ReferralMetrics from './ReferralMetrics';
import PriorityMetrics from './PriorityMetrics';

export const MetricsOverview = () => {
  // Get user name from context or state in a real app
  const userName = "Casey";
  
  // Key metrics for the dashboard header
  const keyMetrics = [
    { label: 'Active Referrals', value: 24, icon: <Users className="h-5 w-5 text-blue-500" /> },
    { label: 'Pending Matches', value: 8, icon: <Clock className="h-5 w-5 text-amber-500" /> },
    { label: 'Urgent Actions', value: 5, icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Modern Dashboard Header with Search and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md bg-white overflow-hidden h-full">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userName}</h1>
                  <p className="text-gray-600">Here's what's happening with your referrals today</p>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search clients, referrals, or providers..."
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-referra-400 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                  {keyMetrics.map((metric, index) => (
                    <Link 
                      to={`/${metric.label.toLowerCase().replace(' ', '-')}`} 
                      key={index}
                      className="group hover:shadow-md transition-all duration-200"
                    >
                      <div className="bg-white border rounded-lg p-4 flex items-center justify-between group-hover:border-referra-400 group-hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white">{metric.icon}</div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md bg-white overflow-hidden h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-referra-500" />
                  Quick Actions
                </h2>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start bg-referra-500 hover:bg-referra-600 text-white h-12" 
                  asChild
                >
                  <Link to="/new-referral">
                    Create New Referral Request
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-800 border-gray-200 h-12"
                  asChild
                >
                  <Link to="/pending-matches">
                    Review Pending Matches ({keyMetrics[1].value})
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-800 border-gray-200 h-12"
                  asChild
                >
                  <Link to="/urgent-actions">
                    Handle Urgent Referrals ({keyMetrics[2].value})
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Recent Performance
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Avg. Placement Time</span>
                  <span className="font-medium">3.2 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">15% faster than last month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Referral Pipeline with enhanced design */}
      <ReferralPipeline />
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OpenReferrals />
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <FeaturedProviderCard />
          <ReferralMetrics />
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
