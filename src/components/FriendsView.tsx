
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MoodBadge from './MoodBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';

const FriendsView: React.FC = () => {
  const { cityData, loading } = useMood();

  if (loading || !cityData) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-40 bg-muted rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Friends</h2>
        <p className="text-muted-foreground">See how your friends are feeling today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cityData.friends.map(friend => (
          <Card key={friend.id} className="overflow-hidden">
            <div className={`h-1 bg-mood-${friend.currentMood.mood}`}></div>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{friend.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <MoodBadge 
                      mood={friend.currentMood.mood} 
                      value={friend.currentMood.value} 
                      showValue
                      size="md"
                    />
                    <span className="text-xs text-muted-foreground mt-1">
                      {format(parseISO(friend.currentMood.timestamp), 'h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Invite your friends to see their moods and compare with yours!
          </p>
          {/* In a real app, this would be a form to invite friends */}
          <div className="mt-4 flex gap-2">
            <input 
              type="email" 
              placeholder="friend@example.com" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Invite
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendsView;
