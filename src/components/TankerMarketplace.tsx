import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Truck, Star, MapPin, Clock, CreditCard, History, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const suppliers = [
  {
    id: 1,
    name: "AquaFlow Suppliers",
    rating: 4.8,
    reviews: 234,
    price: 450,
    capacity: 5000,
    deliveryTime: "2-3 hours",
    location: "Ambernath East",
    verified: true,
    image: "https://images.unsplash.com/photo-1645888921404-604ed47d6be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmtlciUyMHRydWNrJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzU4MzgwNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Reliable Water Co.",
    rating: 4.6,
    reviews: 189,
    price: 420,
    capacity: 5000,
    deliveryTime: "1-2 hours",
    location: "Ambernath West",
    verified: true,
    image: "https://images.unsplash.com/photo-1645888921404-604ed47d6be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmtlciUyMHRydWNrJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzU4MzgwNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Crystal Clear Waters",
    rating: 4.9,
    reviews: 156,
    price: 480,
    capacity: 5000,
    deliveryTime: "3-4 hours",
    location: "Badlapur",
    verified: true,
    image: "https://images.unsplash.com/photo-1645888921404-604ed47d6be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmtlciUyMHRydWNrJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzU4MzgwNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const orderHistory = [
  {
    id: "ORD001",
    supplier: "AquaFlow Suppliers",
    date: "2024-09-18",
    amount: 450,
    capacity: 5000,
    status: "Delivered"
  },
  {
    id: "ORD002", 
    supplier: "Reliable Water Co.",
    date: "2024-09-15",
    amount: 420,
    capacity: 5000,
    status: "Delivered"
  },
  {
    id: "ORD003",
    supplier: "Crystal Clear Waters",
    date: "2024-09-12",
    amount: 480,
    capacity: 5000,
    status: "Delivered"
  }
];

export function TankerMarketplace() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [currentTracking, setCurrentTracking] = useState({
    supplier: "AquaFlow Suppliers",
    orderId: "ORD004",
    status: "On the way",
    estimatedArrival: "2:30 PM",
    currentLocation: "Near Ambernath Railway Station"
  });
  const [filters, setFilters] = useState({
    maxPrice: '',
    capacity: '',
    deliveryTime: '',
    rating: ''
  });

  const filteredSuppliers = suppliers.filter(supplier => {
    if (filters.maxPrice && supplier.price > parseInt(filters.maxPrice)) return false;
    if (filters.capacity && supplier.capacity < parseInt(filters.capacity)) return false;
    if (filters.rating && supplier.rating < parseFloat(filters.rating)) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <Truck className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Water Tanker Marketplace</h1>
          <p className="text-muted-foreground">Find and book reliable water suppliers in your area</p>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Suppliers</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Browse Suppliers */}
        <TabsContent value="browse" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Max Price (₹)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="e.g. 500"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Min Capacity (L)</Label>
                  <Select value={filters.capacity} onValueChange={(value) => setFilters({...filters, capacity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3000">3,000L+</SelectItem>
                      <SelectItem value="5000">5,000L+</SelectItem>
                      <SelectItem value="8000">8,000L+</SelectItem>
                      <SelectItem value="10000">10,000L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Min Rating</Label>
                  <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.0">4.0+</SelectItem>
                      <SelectItem value="4.5">4.5+</SelectItem>
                      <SelectItem value="4.8">4.8+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={() => setFilters({maxPrice: '', capacity: '', deliveryTime: '', rating: ''})}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    {supplier.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{supplier.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({supplier.reviews} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ImageWithFallback 
                    src={supplier.image} 
                    alt="Water tanker truck"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-semibold">₹{supplier.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <span>{supplier.capacity.toLocaleString()}L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Delivery Time</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">{supplier.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{supplier.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">View Profile</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{supplier.name}</DialogTitle>
                          <DialogDescription>Supplier details and reviews</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={supplier.image} />
                              <AvatarFallback>{supplier.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{supplier.name}</h3>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{supplier.rating} ({supplier.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Recent Reviews</h4>
                            <div className="space-y-2">
                              <div className="border-l-4 border-green-500 pl-3">
                                <p className="text-sm">"Excellent service, always on time!"</p>
                                <p className="text-xs text-muted-foreground">- Rajesh M., 2 days ago</p>
                              </div>
                              <div className="border-l-4 border-blue-500 pl-3">
                                <p className="text-sm">"Clean water and professional delivery."</p>
                                <p className="text-xs text-muted-foreground">- Priya S., 1 week ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button className="flex-1">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Tracking */}
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Delivery</CardTitle>
              <CardDescription>Track your water tanker in real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{currentTracking.supplier}</h3>
                  <p className="text-sm text-muted-foreground">Order #{currentTracking.orderId}</p>
                </div>
                <Badge variant="secondary">{currentTracking.status}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Order Confirmed</span>
                  <span className="text-xs text-muted-foreground">12:30 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Tanker Dispatched</span>
                  <span className="text-xs text-muted-foreground">1:15 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{currentTracking.currentLocation}</span>
                  <span className="text-xs text-muted-foreground">Now</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Estimated Arrival</span>
                  <span className="text-xs text-muted-foreground">{currentTracking.estimatedArrival}</span>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Live Map</h4>
                <div className="h-32 bg-gray-100 rounded-lg relative overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 400 128" className="absolute inset-0">
                    {/* Map Background */}
                    <rect width="400" height="128" fill="#f3f4f6" />
                    
                    {/* Roads */}
                    <path d="M20 64 L380 64" stroke="#d1d5db" strokeWidth="8" />
                    <path d="M120 20 L120 108" stroke="#d1d5db" strokeWidth="6" />
                    <path d="M280 20 L280 108" stroke="#d1d5db" strokeWidth="6" />
                    
                    {/* Route Path */}
                    <path d="M20 64 L120 64 L120 80 L280 80 L280 64 L350 64" 
                          stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" fill="none">
                      <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
                    </path>
                    
                    {/* Landmarks */}
                    <circle cx="120" cy="64" r="4" fill="#10b981" />
                    <text x="120" y="55" textAnchor="middle" fontSize="8" fill="#374151">Station</text>
                    
                    <circle cx="280" cy="64" r="4" fill="#f59e0b" />
                    <text x="280" y="55" textAnchor="middle" fontSize="8" fill="#374151">Market</text>
                    
                    <circle cx="350" cy="64" r="6" fill="#ef4444" />
                    <text x="350" y="55" textAnchor="middle" fontSize="8" fill="#374151">Your Location</text>
                    
                    {/* Tanker Icon (animated) */}
                    <g transform="translate(200, 58)">
                      <animateTransform attributeName="transform" type="translate" 
                                        values="20,58;120,58;120,74;280,74;280,58;320,58" 
                                        dur="10s" repeatCount="indefinite" />
                      <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#2563eb" />
                      <circle cx="0" cy="0" r="3" fill="#1d4ed8" />
                      <text x="0" y="1" textAnchor="middle" fontSize="6" fill="white">🚛</text>
                    </g>
                    
                    {/* Progress Indicator */}
                    <rect x="20" y="110" width="320" height="4" rx="2" fill="#e5e7eb" />
                    <rect x="20" y="110" width="160" height="4" rx="2" fill="#3b82f6">
                      <animate attributeName="width" values="160;200;240" dur="5s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                  
                  {/* Live Status Badge */}
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Order History & Receipts
              </CardTitle>
              <CardDescription>View all your past water tanker bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.supplier}</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.capacity.toLocaleString()}L • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.amount}</p>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Receipt
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment options for secure transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">UPI Payment</h4>
                  <p className="text-sm text-muted-foreground">Pay with any UPI app</p>
                  <Badge variant="secondary" className="mt-2">Preferred</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Card Payment</h4>
                  <p className="text-sm text-muted-foreground">Credit/Debit cards accepted</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Net Banking</h4>
                  <p className="text-sm text-muted-foreground">Direct bank transfer</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Cash on Delivery</h4>
                  <p className="text-sm text-muted-foreground">Pay when tanker arrives</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Recent Payments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>AquaFlow Suppliers</span>
                    <span className="font-medium">₹450</span>
                    <Badge variant="outline">Paid via UPI</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Reliable Water Co.</span>
                    <span className="font-medium">₹420</span>
                    <Badge variant="outline">Paid via Card</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}