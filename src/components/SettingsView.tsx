
import React from 'react';
import { Bell, Lock, User, HelpCircle, Moon, Globe, Share2 } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center">
          <User size={32} className="text-zinc-400" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <p className="text-zinc-400 text-sm">Manage your account</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <SettingsGroup 
          title="Account" 
          items={[
            { icon: <User size={18} />, label: 'Personal Information', toggle: false },
            { icon: <Lock size={18} />, label: 'Privacy & Security', toggle: false },
            { icon: <Bell size={18} />, label: 'Notifications', toggle: true, toggled: true }
          ]}
        />
        
        <SettingsGroup 
          title="Preferences" 
          items={[
            { icon: <Moon size={18} />, label: 'Dark Mode', toggle: true, toggled: true },
            { icon: <Globe size={18} />, label: 'Language', toggle: false },
            { icon: <Share2 size={18} />, label: 'Share Settings', toggle: false }
          ]}
        />
        
        <SettingsGroup 
          title="Support" 
          items={[
            { icon: <HelpCircle size={18} />, label: 'Help Center', toggle: false },
            { icon: <Bell size={18} />, label: 'Feedback', toggle: false }
          ]}
        />
      </div>
      
      <div className="mt-auto pt-6">
        <button className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-800 transition-colors">
          Sign Out
        </button>
        <p className="text-center text-xs text-zinc-500 mt-4">
          App Version 1.0.0
        </p>
      </div>
    </div>
  );
};

interface SettingsGroupProps {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    toggle: boolean;
    toggled?: boolean;
  }[];
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, items }) => {
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <h3 className="text-sm font-medium text-zinc-400 mb-2">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
            {item.toggle ? (
              <div 
                className={`w-10 h-5 rounded-full ${item.toggled ? 'bg-blue-600' : 'bg-zinc-700'} relative cursor-pointer transition-colors`}
              >
                <div 
                  className={`absolute top-0.5 ${item.toggled ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}
                ></div>
              </div>
            ) : (
              <span className="text-zinc-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsView;
