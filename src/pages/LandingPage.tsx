
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Search, 
  Filter, 
  BarChart3, 
  Diamond, 
  User2, 
  Clock, 
  Bell, 
  Building2, 
  CheckCircle2, 
  BedDouble, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from '@/components/Logo';

type TabId = "dashboard" | "matched" | "provider-profile";

const renderTabContent = (activeTab: TabId) => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                label: "Total Referrals", 
                value: "247", 
                trend: "↑ 12% this month", 
                trendColor: "text-emerald-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                  </div>
                )
              },
              { 
                label: "Pending Matches", 
                value: "28", 
                trend: "5 urgent cases", 
                trendColor: "text-amber-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                )
              },
              { 
                label: "Matched Providers", 
                value: "183", 
                trend: "92% success rate", 
                trendColor: "text-blue-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User2 className="w-6 h-6 text-blue-600" />
                  </div>
                )
              },
              { 
                label: "Response Time", 
                value: "2.4h", 
                trend: "Within target", 
                trendColor: "text-violet-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-violet-600" />
                  </div>
                )
              },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between">
                  {stat.icon}
                  <div className={`px-2 py-1 rounded-lg bg-opacity-10 ${stat.trendColor} text-xs font-medium`}>
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-black">{stat.label}</div>
                  <div className="text-2xl font-bold text-black mt-1">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Referrals Table */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-slate-200">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-slate-900">Active Referrals</h2>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  Last 24 hours
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    className="w-full md:w-[280px] h-10 pl-10 pr-4 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-referra-500 focus:border-transparent"
                  />
                </div>
                <button className="h-10 px-4 rounded-lg border border-slate-200 text-sm font-medium inline-flex items-center gap-2 hover:bg-slate-50 text-slate-600">
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Client Location</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Service Requested</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Urgency</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Last Updated</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      location: "Minneapolis",
                      service: "Housing Stabilization",
                      urgency: { level: "High", color: "bg-red-500" },
                      status: { text: "Pending", color: "bg-amber-500" },
                      updated: "2 hours ago",
                    },
                    {
                      location: "Saint Paul",
                      service: "Mental Health Support",
                      urgency: { level: "Medium", color: "bg-amber-500" },
                      status: { text: "Matched", color: "bg-emerald-500" },
                      updated: "5 hours ago",
                    },
                    {
                      location: "Bloomington",
                      service: "Financial Counseling",
                      urgency: { level: "Low", color: "bg-blue-500" },
                      status: { text: "In Progress", color: "bg-blue-500" },
                      updated: "1 hour ago",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
                            {row.location.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-900">{row.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-900">{row.service}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${row.urgency.color}`} />
                          <span className="text-sm text-slate-600">{row.urgency.level}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                          row.status.text === "Matched" 
                            ? "bg-emerald-50 text-emerald-700"
                            : row.status.text === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${row.status.color}`} />
                          {row.status.text}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">{row.updated}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button className="text-referra-600 hover:text-referra-700 text-sm font-medium">View</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-referra-600 hover:text-referra-700 text-sm font-medium">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "matched":
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Matching Process</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="w-[280px] h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-referra-500 focus:border-transparent"
                />
              </div>
              <button className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium inline-flex items-center gap-2 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"></div>
            
            <div className="space-y-8">
              {[
                {
                  side: "left",
                  title: "Referral Created",
                  description: "Case manager submitted new referral for housing support",
                  time: "2 hours ago",
                  status: "completed",
                },
                {
                  side: "right",
                  title: "Provider Matched",
                  description: "Hope Housing Services identified as potential match",
                  time: "1 hour ago",
                  status: "completed",
                },
                {
                  side: "left",
                  title: "Initial Contact",
                  description: "Case manager reviewed and approved the match",
                  time: "45 minutes ago",
                  status: "active",
                },
                {
                  side: "right",
                  title: "Provider Review",
                  description: "Provider reviewing client details and requirements",
                  time: "Now",
                  status: "pending",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex ${item.side === "right" ? "justify-start pl-8 md:pl-1/2" : "justify-end pr-8 md:pr-1/2"} relative`}
                >
                  <div
                    className={`w-full md:w-1/2 bg-white p-4 rounded-lg border ${
                      item.status === "completed"
                        ? "border-green-100 shadow-green-100/50"
                        : item.status === "active"
                          ? "border-blue-100 shadow-blue-100/50"
                          : "border-gray-100"
                    } shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === "completed"
                            ? "bg-green-50 text-green-600"
                            : item.status === "active"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {item.status === "completed" ? "✓" : item.status === "active" ? "●" : "○"}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "provider-profile":
      return (
        <div className="space-y-8">
          {/* Provider Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Sunrise Living Service Inc.</h2>
                <p className="text-gray-600">Assisted Living & Specialized Care Services</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-referra-600 text-white rounded-lg hover:bg-referra-700 transition-colors">
              Update Availability
            </button>
          </div>

          {/* Provider Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Referrals", value: "5", trend: "Current cases", trendColor: "text-blue-600" },
              { label: "Success Rate", value: "94%", trend: "Above average", trendColor: "text-green-600" },
              { label: "Response Time", value: "24h", trend: "Average reply time", trendColor: "text-blue-600" },
              { label: "Total Reviews", value: "156", trend: "4.8/5 rating ⭐", trendColor: "text-yellow-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-base font-semibold text-black">{stat.label}</div>
                <div className="text-3xl md:text-4xl font-bold text-black">{stat.value}</div>
                <div className={`text-sm ${stat.trendColor} mt-1`}>{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Provider Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Adult companion services",
                    "Adult day services (ADS)",
                    "Adult rehabilitative mental health services (ARMHS)",
                    "Assisted living facility with dementia care",
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Transportation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Address</h4>
                    <p className="text-sm text-gray-900">1234 Elm Street, Minneapolis, MN 55401</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Nearby Transportation</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-900">🚍 Bus Line 5 (1 block away)</p>
                      <p className="text-sm text-gray-900">🚆 Metro Light Rail Green Line (0.5 miles)</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Counties Served</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Hennepin", "Ramsey", "Anoka", "Dakota"].map((county, i) => (
                        <div key={i} className="text-sm text-gray-900">{county}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability & Capacity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Status</span>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Accepting Referrals</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Bed Capacity</span>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-gray-900" />
                      <span className="text-sm text-gray-900">2 Open Beds</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Email</span>
                    <span className="text-sm text-blue-600">contact@provider.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Phone</span>
                    <span className="text-sm text-gray-900">(612) 555-0123</span>
                  </div>
                  <div className="pt-4">
                    <button className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStartNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate(`/signup?email=${encodeURIComponent(email)}`);
    } else {
      navigate('/signup');
    }
  };

  // Updated to use navigate directly instead of wrapping in another function
  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const AnnouncementBanner = () => (
    <div className="inline-flex items-center gap-2 rounded-full bg-referra-50 border border-referra-100 px-4 py-1.5 text-sm font-medium text-referra-700">
      <Badge className="bg-referra-200 text-referra-700 hover:bg-referra-200 px-2 py-0.5 text-[11px]">NEW</Badge>
      <span>Now offering AI-powered provider matching</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ecf4fc]">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold">Referra</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md">
                            <div className="p-2 rounded-md bg-referra-50 text-referra-500">
                              <User2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">For Case Managers</div>
                              <div className="text-sm text-gray-500">Streamline your referral process</div>
                            </div>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md">
                            <div className="p-2 rounded-md bg-blue-50 text-blue-500">
                              <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">For Providers</div>
                              <div className="text-sm text-gray-500">Grow your practice with qualified referrals</div>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="#features" className={navigationMenuTriggerStyle()}>
                      Features
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-4">
              {/* Fixed: Changed to use a regular Button with onClick handler */}
              <Button 
                variant="ghost" 
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                className="bg-referra-500 hover:bg-referra-600" 
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-16 md:pt-32 pb-16 relative">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <div className="flex justify-center">
            <AnnouncementBanner />
          </div>

          <div className="space-y-6 md:space-y-8 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
              Effortless <span className="bg-gradient-to-r from-referra-700 to-referra-500 bg-clip-text text-transparent">AI-Powered Referrals</span>
            </h1>
            <div className="space-y-3 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-600">
                Referra connects case managers with pre-vetted service providers in seconds.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 text-base text-gray-800">
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  No manual searches
                </span>
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  Qualified referrals
                </span>
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  Enhanced outcomes
                </span>
              </div>
            </div>

            <div className="pt-4">
              <form onSubmit={handleStartNow} className="max-w-md mx-auto">
                <div className="bg-white rounded-full p-1.5 flex items-center border-2 border-referra-200">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none rounded-l-full"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-referra-600 text-white text-sm font-medium rounded-full hover:bg-referra-700 transition-colors whitespace-nowrap"
                  >
                    Start now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative z-20">
          <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15),0_0_60px_-20px_rgba(99,102,241,0.25)] overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-6 py-3">
              <div className="absolute left-4 top-[14px] flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a032]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#27aa35]" />
              </div>
              
              <div className="mx-auto max-w-sm bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-400 font-medium">referra.ai</span>
              </div>

              <div className="flex items-center justify-center gap-1 mt-4 overflow-x-auto">
                {[
                  { id: "dashboard" as TabId, label: "Dashboard", icon: BarChart3 },
                  { id: "matched" as TabId, label: "Matched", icon: Diamond },
                  { id: "provider-profile" as TabId, label: "Provider Profile", icon: User2 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-lg transition-colors relative ${
                      activeTab === tab.id 
                        ? "text-referra-600 bg-white border-t border-x border-slate-200" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-8 bg-white relative z-10">
              {renderTabContent(activeTab)}
            </div>
          </div>
          
          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-[#ecf4fc] to-transparent transform-gpu" />
        </div>
      </section>

      <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Let&apos;s transform your referral process
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Whether you&apos;re a case manager looking to streamline referrals or a provider wanting to grow your client base, 
                Referra&apos;s intelligent platform makes the entire process seamless.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "For Case Managers",
                  description: "Streamline your referral process with our intelligent matching system. Find and connect with the right providers instantly.",
                  features: [
                    "Intelligent matching",
                    "Status updates",
                    "Case management"
                  ]
                },
                {
                  title: "For Providers",
                  description: "Grow your practice with perfectly matched referrals. Increase visibility and connect with qualified clients instantly.",
                  features: [
                    "Enhanced visibility",
                    "Qualified referrals",
                    "Practice growth"
                  ]
                },
                {
                  title: "Seamless Matching",
                  description: "Experience fast, efficient referrals with our automated matching system. Stay informed and connected throughout the process.",
                  features: [
                    "Real-time updates",
                    "Secure messaging",
                    "Complete tracking"
                  ]
                }
              ].map((card, index) => (
                <div key={index} className="group relative min-h-[420px]">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-50/5 to-indigo-50/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative z-10 h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-6">{card.description}</p>
                    <div className="mt-auto">
                      <div className="space-y-3">
                        {card.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-referra-50 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-referra-600" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <button className="text-referra-600 font-medium text-sm inline-flex items-center gap-1 hover:text-referra-700 transition-colors">
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
