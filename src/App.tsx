import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { HouseholdDashboard } from './components/HouseholdDashboard';
import { TankerMarketplace } from './components/TankerMarketplace';
import { CommunityHub } from './components/CommunityHub';
import { SocietyManagement } from './components/SocietyManagement';
import { Home, Truck, Users, Building } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl">
        <Tabs defaultValue="household" className="w-full">
          <div className="sticky top-0 z-10 bg-background border-b">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1738932371950-324d3cdc0608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBibHVlJTIwY2xlYW58ZW58MXx8fHwxNzU4MzgxMjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Water droplet logo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-[ABeeZee] font-bold no-underline not-italic">AquaWise</h1>
                  <p className="text-sm text-muted-foreground">Complete Water Management Platform</p>
                </div>
              </div>
              
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="household" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Household</span>
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span className="hidden sm:inline">Marketplace</span>
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Community</span>
                </TabsTrigger>
                <TabsTrigger value="management" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="hidden sm:inline">Management</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="household" className="mt-0">
            <HouseholdDashboard />
          </TabsContent>

          <TabsContent value="marketplace" className="mt-0">
            <TankerMarketplace />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <CommunityHub />
          </TabsContent>

          <TabsContent value="management" className="mt-0">
            <SocietyManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}