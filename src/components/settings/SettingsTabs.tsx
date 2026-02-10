'use client';

import { useTranslations } from 'next-intl';
import { Settings, Clock, Database } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const t = useTranslations('Settings');

  const tabs = [
    { id: 'general', label: t('tabs.general'), icon: Settings },
    { id: 'working-conditions', label: t('tabs.workingConditions'), icon: Clock },
    { id: 'master-data', label: t('tabs.masterData'), icon: Database },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${isActive
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <tab.icon
                className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                `}
                aria-hidden="true"
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
