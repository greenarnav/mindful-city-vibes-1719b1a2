
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Heart, MessageCircle, Moon } from 'lucide-react';

const FriendsList: React.FC = () => {
  const { cityData } = useMood();
  
  if (!cityData || !cityData.friends) return null;

  return (
    <div className="space-y-3">
      {cityData.friends.map((friend) => (
        <div 
          key={friend.id} 
          className="bg-zinc-700 rounded-lg p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{friend.name}</p>
              <p className="text-xs text-zinc-400">{friend.location}</p>
            </div>
          </div>
          
          <FriendActionIcon friend={friend} />
        </div>
      ))}
    </div>
  );
};

const FriendActionIcon: React.FC<{ friend: any }> = ({ friend }) => {
  // Randomly assign one of three possible action icons
  const icons = [
    <Heart size={20} className="text-pink-400" />,
    <MessageCircle size={20} className="text-blue-400" />,
    <Moon size={20} className="text-white" />
  ];
  
  // Use the friend id to deterministically pick an icon (but still looks random)
  const iconIndex = Number(friend.id) % icons.length;
  
  return (
    <div className="w-8 h-8 flex items-center justify-center">
      {icons[iconIndex]}
    </div>
  );
};

export default FriendsList;
