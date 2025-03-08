
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMood } from '@/context/MoodContext';
import TodayMood from './TodayMood';
import HistoryView from './HistoryView';
import NeighborhoodsView from './NeighborhoodsView';
import FriendsView from './FriendsView';
import AddMood from './AddMood';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Clock, 
  MapPin, 
  Users, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout: React.FC = () => {
  const { activeTab, setActiveTab, refreshData } = useMood();

  return (
    <div className="container py-6 max-w-5xl">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">City Mood</h1>
          <p className="text-muted-foreground">Real-time city mood tracker</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 h-auto p-1">
              <TabsTrigger value="today" className="py-2">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Today</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="py-2">
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="neighborhoods" className="py-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Areas</span>
              </TabsTrigger>
              <TabsTrigger value="friends" className="py-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Friends</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-6 space-y-4">
              <TodayMood />
            </TabsContent>

            <TabsContent value="history" className="mt-6 space-y-4">
              <HistoryView />
            </TabsContent>

            <TabsContent value="neighborhoods" className="mt-6 space-y-4">
              <NeighborhoodsView />
            </TabsContent>

            <TabsContent value="friends" className="mt-6 space-y-4">
              <FriendsView />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <AddMood />
        </div>
      </div>
    </div>
  );
};

export default Layout;
