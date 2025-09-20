import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, TrendingUp, Target, AlertTriangle, Calendar, Gauge } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const usageData = [
  { day: 'Mon', consumption: 450, goal: 400 },
  { day: 'Tue', consumption: 380, goal: 400 },
  { day: 'Wed', consumption: 520, goal: 400 },
  { day: 'Thu', consumption: 410, goal: 400 },
  { day: 'Fri', consumption: 390, goal: 400 },
  { day: 'Sat', consumption: 480, goal: 400 },
  { day: 'Sun', consumption: 350, goal: 400 },
];

const monthlyData = [
  { month: 'Jan', consumption: 12500, average: 11800 },
  { month: 'Feb', consumption: 11200, average: 11800 },
  { month: 'Mar', consumption: 13100, average: 11800 },
  { month: 'Apr', consumption: 12800, average: 11800 },
  { month: 'May', consumption: 14200, average: 11800 },
  { month: 'Jun', consumption: 13500, average: 11800 },
];

export function HouseholdDashboard() {
  const [meterReading, setMeterReading] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState(12000);
  const currentUsage = 8750;
  const estimatedBill = 2450;
  const goalProgress = (currentUsage / monthlyGoal) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Personalized Dashboard Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <Droplets className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Water Management Dashboard</h1>
          <p className="text-muted-foreground">Flat 404, Residency Tower, Ambernath</p>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Usage</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425L</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUsage.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">
              {monthlyGoal - currentUsage}L remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Bill</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{estimatedBill}</div>
            <p className="text-xs text-muted-foreground">
              Due on 25th Sept
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalProgress.toFixed(1)}%</div>
            <Progress value={goalProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Leak Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Potential Leak Detected!</strong> Unusual overnight usage detected yesterday (50L between 11 PM - 5 AM). 
          Consider checking your taps and pipes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="meter" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meter">Meter Entry</TabsTrigger>
          <TabsTrigger value="usage">Usage Charts</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>

        {/* Quick Meter Entry */}
        <TabsContent value="meter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Meter Reading</CardTitle>
              <CardDescription>Enter your current water meter reading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reading">Current Reading (Liters)</Label>
                <Input
                  id="reading"
                  type="number"
                  placeholder="Enter meter reading"
                  value={meterReading}
                  onChange={(e) => setMeterReading(e.target.value)}
                />
              </div>
              <Button className="w-full">Submit Reading</Button>
              <div className="text-sm text-muted-foreground">
                Last reading: 156,750L (2 days ago)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historical Usage Graphs */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage Trend</CardTitle>
              <CardDescription>Your water consumption over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}L`, name === 'consumption' ? 'Usage' : 'Goal']} />
                  <Line type="monotone" dataKey="consumption" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="goal" stroke="#dc2626" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Comparison</CardTitle>
              <CardDescription>Monthly usage vs building average</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}L`, name === 'consumption' ? 'Your Usage' : 'Building Average']} />
                  <Bar dataKey="consumption" fill="#2563eb" />
                  <Bar dataKey="average" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goal Setting */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Conservation Goals</CardTitle>
              <CardDescription>Set and track your water-saving targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Monthly Goal (Liters)</Label>
                <Input
                  id="goal"
                  type="number"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress this month</span>
                  <span>{currentUsage.toLocaleString()}L / {monthlyGoal.toLocaleString()}L</span>
                </div>
                <Progress value={goalProgress} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,250L</div>
                  <div className="text-sm text-muted-foreground">Saved this month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹375</div>
                  <div className="text-sm text-muted-foreground">Money saved</div>
                </div>
              </div>

              <Button className="w-full">Update Goal</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparative Analysis */}
        <TabsContent value="compare" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household Comparison</CardTitle>
              <CardDescription>See how your usage compares to others in your building</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">8,750L</div>
                  <div className="text-sm text-muted-foreground">Your Usage</div>
                  <Badge variant="secondary">This Month</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">11,800L</div>
                  <div className="text-sm text-muted-foreground">Building Average</div>
                  <Badge variant="outline">25% Less</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">13,200L</div>
                  <div className="text-sm text-muted-foreground">Society Average</div>
                  <Badge variant="destructive">33% Less</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Top 10% Efficient</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm">You're here!</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  You're in the top 10% most efficient households in Residency Tower!
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}