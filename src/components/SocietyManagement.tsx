import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Building, Users, Truck, MessageSquare, AlertTriangle, TrendingUp } from 'lucide-react';

const buildingData = [
  { wing: 'Tower A', consumption: 45600, households: 48, avgPerHousehold: 950, alerts: 2 },
  { wing: 'Tower B', consumption: 52800, households: 48, avgPerHousehold: 1100, alerts: 1 },
  { wing: 'Tower C', consumption: 48200, households: 48, avgPerHousehold: 1004, alerts: 3 },
  { wing: 'Common Areas', consumption: 8400, households: 0, avgPerHousehold: 0, alerts: 0 }
];

const floorData = [
  { floor: 'Ground', consumption: 5200, households: 4, alerts: 1 },
  { floor: '1st', consumption: 4800, households: 4, alerts: 0 },
  { floor: '2nd', consumption: 4600, households: 4, alerts: 0 },
  { floor: '3rd', consumption: 4900, households: 4, alerts: 0 },
  { floor: '4th', consumption: 5100, households: 4, alerts: 1 },
  { floor: '5th', consumption: 4700, households: 4, alerts: 0 },
  { floor: '6th', consumption: 4400, households: 4, alerts: 0 },
  { floor: '7th', consumption: 4500, households: 4, alerts: 0 },
  { floor: '8th', consumption: 4600, households: 4, alerts: 0 },
  { floor: '9th', consumption: 4300, households: 4, alerts: 0 },
  { floor: '10th', consumption: 4800, households: 4, alerts: 0 },
  { floor: '11th', consumption: 4900, households: 4, alerts: 0 },
  { floor: '12th', consumption: 4200, households: 4, alerts: 0 }
];

const weeklyTrend = [
  { day: 'Mon', totalConsumption: 48500, efficiency: 85 },
  { day: 'Tue', totalConsumption: 52000, efficiency: 82 },
  { day: 'Wed', totalConsumption: 49800, efficiency: 84 },
  { day: 'Thu', totalConsumption: 51200, efficiency: 83 },
  { day: 'Fri', totalConsumption: 53500, efficiency: 81 },
  { day: 'Sat', totalConsumption: 58200, efficiency: 78 },
  { day: 'Sun', totalConsumption: 55600, efficiency: 80 }
];

const tankerSuppliers = [
  { id: 1, name: "AquaFlow Suppliers", price: 420, capacity: 10000, rating: 4.8, available: true },
  { id: 2, name: "Reliable Water Co.", price: 450, capacity: 10000, rating: 4.6, available: true },
  { id: 3, name: "Crystal Clear Waters", price: 480, capacity: 10000, rating: 4.9, available: false },
  { id: 4, name: "Metro Water Supply", price: 400, capacity: 15000, rating: 4.7, available: true }
];

const announcements = [
  {
    id: 1,
    title: "Water Supply Interruption - Tower B",
    message: "Due to pipeline maintenance, water supply to Tower B will be interrupted from 2 PM to 6 PM today.",
    priority: "high",
    date: "2024-09-20"
  },
  {
    id: 2,
    title: "Tanker Delivery Scheduled",
    message: "Bulk tanker delivery scheduled for tomorrow at 8 AM. Main tank will be filled.",
    priority: "medium",
    date: "2024-09-19"
  },
  {
    id: 3,
    title: "Water Conservation Drive",
    message: "Join our society-wide water conservation challenge this month. Prizes for top 10 households!",
    priority: "low",
    date: "2024-09-18"
  }
];

export function SocietyManagement() {
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', priority: 'medium' });
  const [bulkOrder, setBulkOrder] = useState({ supplier: '', capacity: '', households: '' });

  const totalConsumption = buildingData.reduce((sum, building) => sum + building.consumption, 0);
  const totalHouseholds = buildingData.reduce((sum, building) => sum + building.households, 0);
  const totalAlerts = buildingData.reduce((sum, building) => sum + building.alerts, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <Building className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Society Management Dashboard</h1>
          <p className="text-muted-foreground">Residency Tower Complex - Central Control Panel</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsumption.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">Today's usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Households</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHouseholds}</div>
            <p className="text-xs text-muted-foreground">Across 3 towers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Efficiency</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Water efficiency score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bulk-orders">Bulk Orders</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="zones">High Usage Zones</TabsTrigger>
        </TabsList>

        {/* Society-Wide Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Building-wise Consumption</CardTitle>
                <CardDescription>Water usage across all towers and common areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={buildingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="wing" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}L`, 'Consumption']} />
                    <Bar dataKey="consumption" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Trend</CardTitle>
                <CardDescription>Society-wide consumption and efficiency trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="totalConsumption" stroke="#8884d8" name="Consumption (L)" />
                    <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Building Statistics</CardTitle>
              <CardDescription>Comprehensive view of each building's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Building</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Households</TableHead>
                    <TableHead>Avg/Household</TableHead>
                    <TableHead>Alerts</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buildingData.map((building) => (
                    <TableRow key={building.wing}>
                      <TableCell className="font-medium">{building.wing}</TableCell>
                      <TableCell>{building.consumption.toLocaleString()}L</TableCell>
                      <TableCell>{building.households}</TableCell>
                      <TableCell>{building.avgPerHousehold.toLocaleString()}L</TableCell>
                      <TableCell>
                        {building.alerts > 0 ? (
                          <Badge variant="destructive">{building.alerts}</Badge>
                        ) : (
                          <Badge variant="secondary">0</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={building.alerts > 0 ? "destructive" : "secondary"}>
                          {building.alerts > 0 ? "Attention Needed" : "Normal"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bulk Tanker Ordering */}
        <TabsContent value="bulk-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Bulk Tanker Orders
              </CardTitle>
              <CardDescription>Order water tankers for the entire society or main tank refill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Select Supplier</Label>
                  <Select value={bulkOrder.supplier} onValueChange={(value) => setBulkOrder({...bulkOrder, supplier: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {tankerSuppliers.filter(s => s.available).map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name} - ₹{supplier.price} ({supplier.capacity.toLocaleString()}L)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Total Capacity (L)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g. 50000"
                    value={bulkOrder.capacity}
                    onChange={(e) => setBulkOrder({...bulkOrder, capacity: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="households">No. of Households</Label>
                  <Input
                    id="households"
                    type="number"
                    placeholder="e.g. 25"
                    value={bulkOrder.households}
                    onChange={(e) => setBulkOrder({...bulkOrder, households: e.target.value})}
                  />
                </div>
              </div>
              
              <Button className="w-full">Place Bulk Order</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Suppliers</CardTitle>
              <CardDescription>Compare bulk pricing from verified suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tankerSuppliers.map((supplier) => (
                  <Card key={supplier.id} className={`${!supplier.available ? 'opacity-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{supplier.name}</h4>
                        <Badge variant={supplier.available ? "secondary" : "outline"}>
                          {supplier.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Bulk Price:</span>
                          <span className="font-medium">₹{supplier.price}/tank</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span>{supplier.capacity.toLocaleString()}L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <span>{supplier.rating}/5.0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resident Communication Tool */}
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Send Announcement
              </CardTitle>
              <CardDescription>Broadcast important messages to all residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Announcement Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Water Supply Schedule Update"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your announcement message here..."
                  rows={4}
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Information</SelectItem>
                    <SelectItem value="medium">Medium - Important Notice</SelectItem>
                    <SelectItem value="high">High - Urgent Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Send to All Residents</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Messages sent to residents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Alert key={announcement.id} className={`${
                    announcement.priority === 'high' ? 'border-red-200 bg-red-50' :
                    announcement.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{announcement.title}</h4>
                          <Badge variant={
                            announcement.priority === 'high' ? 'destructive' :
                            announcement.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <AlertDescription>{announcement.message}</AlertDescription>
                      </div>
                      <span className="text-xs text-muted-foreground">{announcement.date}</span>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* High-Consumption Zones */}
        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>High Consumption Analysis</CardTitle>
              <CardDescription>Identify floors and areas with unusual water usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={floorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="floor" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}L`, 'Consumption']} />
                  <Bar dataKey="consumption" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Floor-wise Analysis</CardTitle>
              <CardDescription>Detailed consumption data for Tower A</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Floor</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Households</TableHead>
                    <TableHead>Avg/Household</TableHead>
                    <TableHead>Alerts</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {floorData.map((floor) => (
                    <TableRow key={floor.floor} className={floor.alerts > 0 ? 'bg-red-50' : ''}>
                      <TableCell className="font-medium">{floor.floor}</TableCell>
                      <TableCell>{floor.consumption.toLocaleString()}L</TableCell>
                      <TableCell>{floor.households}</TableCell>
                      <TableCell>{(floor.consumption / floor.households).toFixed(0)}L</TableCell>
                      <TableCell>
                        {floor.alerts > 0 ? (
                          <Badge variant="destructive">{floor.alerts}</Badge>
                        ) : (
                          <Badge variant="secondary">0</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {floor.alerts > 0 ? (
                          <Button variant="outline" size="sm">Investigate</Button>
                        ) : (
                          <span className="text-muted-foreground text-sm">Normal</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>High Usage Alert:</strong> Ground floor and 4th floor showing 15% higher consumption than average. 
              Potential leak detection recommended for these areas.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}