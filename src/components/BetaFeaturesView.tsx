
import React from 'react';
import { Sparkle, Rocket, Beaker, BadgeInfo, Trophy } from 'lucide-react';

const BetaFeaturesView: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <Beaker size={28} className="text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">Beta Features</h2>
      </div>
      
      <p className="text-zinc-400 mb-6">
        Try out experimental features before they're officially released. These features may change or be removed at any time.
      </p>
      
      <div className="space-y-4">
        <BetaFeatureCard
          icon={<Sparkle size={24} className="text-yellow-400" />}
          title="Mood Predictions"
          description="Get AI-powered predictions about how city moods will change over the next week."
          status="Coming Soon"
        />
        
        <BetaFeatureCard
          icon={<Rocket size={24} className="text-blue-400" />}
          title="Real-time Updates"
          description="Receive instant notifications when city moods change dramatically."
          status="Active"
          enabled={true}
        />
        
        <BetaFeatureCard
          icon={<BadgeInfo size={24} className="text-green-400" />}
          title="Detailed Insights"
          description="Dive deeper into what's driving mood changes with expanded analytics."
          status="Active"
          enabled={false}
        />
        
        <BetaFeatureCard
          icon={<Trophy size={24} className="text-orange-400" />}
          title="Mood Challenges"
          description="Participate in community challenges to improve the mood of your neighborhood."
          status="Coming Soon"
        />
      </div>
      
      <div className="mt-auto pt-6">
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
          <h3 className="font-semibold text-purple-300 mb-2">Join Beta Program</h3>
          <p className="text-sm text-zinc-400 mb-3">
            Help us improve by providing feedback on beta features.
          </p>
          <button className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface BetaFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'Active' | 'Coming Soon';
  enabled?: boolean;
}

const BetaFeatureCard: React.FC<BetaFeatureCardProps> = ({ 
  icon, title, description, status, enabled 
}) => {
  return (
    <div 
      className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 transition-all hover:border-zinc-700"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-zinc-500">{status}</p>
          </div>
        </div>
        
        {status === 'Active' && (
          <div 
            className={`w-10 h-5 rounded-full ${enabled ? 'bg-purple-600' : 'bg-zinc-700'} relative cursor-pointer transition-colors`}
          >
            <div 
              className={`absolute top-0.5 ${enabled ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}
            ></div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
};

export default BetaFeaturesView;
