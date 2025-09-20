import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Leaf, Trophy, Users, Target, Award, CheckCircle, Droplets, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const conservationTips = [
  {
    id: 1,
    title: "Rainwater Harvesting in MMR",
    description: "Install rooftop rainwater harvesting systems to collect monsoon water. Perfect for Ambernath's moderate rainfall.",
    category: "Harvesting",
    savings: "30-40%",
    difficulty: "Medium",
    localRelevance: true
  },
  {
    id: 2,
    title: "Fix Leaky Taps Immediately",
    description: "A single dripping tap can waste 15 liters per day. Regular maintenance can save significant amounts.",
    category: "Maintenance",
    savings: "10-15%",
    difficulty: "Easy",
    localRelevance: false
  },
  {
    id: 3,
    title: "Use Bucket for Car Washing",
    description: "Instead of running hose, use bucket method. Especially important during summer months in Maharashtra.",
    category: "Outdoor",
    savings: "50-70%",
    difficulty: "Easy",
    localRelevance: true
  },
  {
    id: 4,
    title: "Install Water-Efficient Fixtures",
    description: "Low-flow showerheads and dual-flush toilets can significantly reduce daily consumption.",
    category: "Fixtures",
    savings: "20-30%",
    difficulty: "Medium",
    localRelevance: false
  }
];

const challenges = [
  {
    id: 1,
    title: "September Water Challenge",
    description: "Reduce your daily consumption by 20% this month",
    participants: 143,
    duration: "30 days",
    prize: "₹500 gift voucher",
    progress: 65,
    deadline: "Sept 30",
    status: "active"
  },
  {
    id: 2,
    title: "Leak Detection Heroes",
    description: "Report and fix leaks in your building common areas",
    participants: 89,
    duration: "Ongoing",
    prize: "Recognition badge",
    progress: 80,
    deadline: "No deadline",
    status: "active"
  },
  {
    id: 3,
    title: "Rainwater Harvesting Drive",
    description: "Install rainwater harvesting systems in your society",
    participants: 12,
    duration: "3 months",
    prize: "₹2000 rebate",
    progress: 25,
    deadline: "Dec 31",
    status: "active"
  }
];

const badges = [
  { name: "Leak Detective", description: "Fixed 3 reported leaks", earned: true, icon: "🔍" },
  { name: "Conservation Streak", description: "10 days under daily target", earned: true, icon: "🔥" },
  { name: "Rainwater Champion", description: "Harvested 1000L rainwater", earned: false, icon: "🌧️" },
  { name: "Community Leader", description: "Helped 5 neighbors save water", earned: true, icon: "👥" },
  { name: "Monthly Master", description: "Met target 3 months in a row", earned: false, icon: "🏆" },
  { name: "Eco Warrior", description: "Saved 5000L in a month", earned: true, icon: "🌱" }
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", building: "Tower A", savings: "2,850L", badges: 8 },
  { rank: 2, name: "Rajesh Kumar", building: "Tower B", savings: "2,720L", badges: 6 },
  { rank: 3, name: "You", building: "Tower A", savings: "2,650L", badges: 4 },
  { rank: 4, name: "Anita Patel", building: "Tower C", savings: "2,480L", badges: 5 },
  { rank: 5, name: "Vikram Singh", building: "Tower A", savings: "2,320L", badges: 3 }
];

export function CommunityHub() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Community Conservation Hub</h1>
          <p className="text-muted-foreground">Save water together, make a difference in Ambernath</p>
        </div>
      </div>

      <Tabs defaultValue="tips" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tips">Conservation Tips</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="gamification">Achievements</TabsTrigger>
        </TabsList>

        {/* Localized Conservation Hub */}
        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Water-Saving Tips for Ambernath & MMR
              </CardTitle>
              <CardDescription>
                Actionable conservation strategies tailored for residents in the Mumbai Metropolitan Region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conservationTips.map((tip) => (
                  <Card key={tip.id} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        {tip.localRelevance && <Badge variant="secondary">Local Tip</Badge>}
                      </div>
                      <Badge variant="outline">{tip.category}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Save {tip.savings}</span>
                        </div>
                        <Badge variant={tip.difficulty === 'Easy' ? 'secondary' : 'outline'}>
                          {tip.difficulty}
                        </Badge>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special MMR Section */}
          <Card>
            <CardHeader>
              <CardTitle>Special Focus: Rainwater Harvesting in MMR</CardTitle>
              <CardDescription>
                With Mumbai's monsoon patterns, rainwater harvesting can significantly reduce dependency on tankers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1642797071049-be15e78dd0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGNvbnNlcnZhdGlvbiUyMHRhbmslMjBkcm9wbGV0fGVufDF8fHx8MTc1ODM4MDcyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Water conservation"
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2,500mm</div>
                  <div className="text-sm text-muted-foreground">Annual rainfall in MMR</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-muted-foreground">Potential water savings</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₹15,000</div>
                  <div className="text-sm text-muted-foreground">Average setup cost</div>
                </div>
              </div>
              
              <Button className="w-full">
                Connect with Local Rainwater Harvesting Experts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Water-Saving Challenges */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant={challenge.status === 'active' ? 'secondary' : 'outline'}>
                      {challenge.status}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participants</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {challenge.participants}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prize</span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {challenge.prize}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline</span>
                      <span>{challenge.deadline}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant={challenge.status === 'active' ? 'default' : 'outline'}>
                    {challenge.status === 'active' ? 'Join Challenge' : 'View Details'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Community Leaderboard</CardTitle>
              <CardDescription>Top water savers in Residency Tower this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user.rank === 1 ? 'bg-yellow-400 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-400 text-white' : 'bg-gray-200'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.building}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{user.savings}</p>
                      <p className="text-sm text-muted-foreground">{user.badges} badges</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gamification & Badges */}
        <TabsContent value="gamification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Achievements
              </CardTitle>
              <CardDescription>Collect badges and track your water conservation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <Card key={index} className={`${badge.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className={`font-semibold ${badge.earned ? 'text-green-800' : 'text-gray-500'}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ${badge.earned ? 'text-green-600' : 'text-gray-400'}`}>
                        {badge.description}
                      </p>
                      {badge.earned && (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Total Badges</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600">4/6</div>
                <p className="text-sm text-muted-foreground">Badges earned</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Water Saved</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600">12,450L</div>
                <p className="text-sm text-muted-foreground">This year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Community Rank</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600">#3</div>
                <p className="text-sm text-muted-foreground">In your building</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}