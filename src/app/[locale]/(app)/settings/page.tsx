'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SettingsTabs } from '@/components/settings/SettingsTabs';
import { GeneralSettingsForm } from '@/components/settings/GeneralSettingsForm';
import { WorkingConditionsForm } from '@/components/settings/WorkingConditionsForm';
import { Link } from '@/navigation';
import { ArrowRight, Building2, Users, Network, Briefcase } from 'lucide-react';

// Using client component for interactivity with tabs, 
// though we could use searchParams for server-side tab rendering.
export default function SettingsPage() {
  const t = useTranslations('Settings');
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col h-full bg-gray-50/50 dark:bg-black rounded-xl">
        <div className="bg-white border-b border-gray-200 p-6 sm:p-8 rounded-xl rounded-b-none">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
        </div>

        <div className="bg-white px-6 sm:px-8 border-b border-gray-200">
             <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 p-6 sm:p-8 overflow-auto">
             {activeTab === 'general' && <GeneralSettingsForm />}
             {activeTab === 'working-conditions' && <WorkingConditionsForm />}
             {activeTab === 'master-data' && (
                 <div className="space-y-6">
                     <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{t('tabs.masterData')}</h3>
                        <p className="mt-1 text-sm text-gray-500">Manage all system master data from here.</p>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/settings/master" className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all">
                             <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                             </div>
                             <h4 className="font-semibold text-gray-900 mb-1">Go to Master Data</h4>
                             <p className="text-sm text-gray-500">Manage Companies, Departments, Positions, and more.</p>
                        </Link>
                     </div>
                 </div>
             )}
        </div>
    </div>
  );
}
