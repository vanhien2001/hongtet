import React from 'react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: Tab.HOME, label: 'Trang Chủ' },
    { id: Tab.FOOD, label: 'Món Ăn Tết' },
    { id: Tab.ABOUT, label: 'Giới Thiệu' },
  ];

  return (
    <div className="relative">
      {/* Vietnam Flag - Absolute positioned within container */}
      <div className="absolute left-0 top-0 ml-4">
        <img 
          src="/flag-vn.svg" 
          alt="Cờ Việt Nam" 
          className="w-14 h-9 shadow-lg rounded-sm border border-gray-200 hover:scale-110 transition-transform duration-300"
          title="Việt Nam"
          loading="eager"
          width="56"
          height="36"
        />
      </div>
      
      <nav className="sticky top-4 z-40 mx-auto max-w-md w-full px-4 mb-8" aria-label="Menu chính">
        <div className="bg-white shadow-lg rounded-full p-1.5 flex justify-between border-2 border-gray-200" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-label={`Chuyển đến ${tab.label}`}
            className={`
              flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-tetRed text-white shadow-md transform scale-105' 
                : 'text-tetRed hover:text-white hover:bg-tetRed/10'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
    </div>
  );
};

export default Navigation;