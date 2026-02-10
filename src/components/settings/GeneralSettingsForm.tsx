'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';
// We'll simulate saving for now or use a server action later
// import { updateSystemConfig } from '@/lib/actions/settings-actions'; 

interface GeneralSettingsFormData {
  appName: string;
  dateFormat: string;
  defaultLanguage: string;
}

export function GeneralSettingsForm() {
  const t = useTranslations('Settings');
  const tCommon = useTranslations('Common');
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<GeneralSettingsFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: GeneralSettingsFormData) => {
    // TODO: Implement server action to save to SystemConfig
    console.log('Saving general settings:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage(t('savedSuccessfully'));
    
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">{t('general.title')}</h3>
        <p className="mt-1 text-sm text-gray-500">{t('general.description')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
            <div className="sm:col-span-4">
                <label htmlFor="appName" className="block text-sm font-medium text-gray-700">{t('general.appName')}</label>
                <div className="mt-1">
                    <input
                        type="text"
                        {...register('appName')}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue="Safari HR"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">{t('general.dateFormat')}</label>
                <div className="mt-1">
                    <select
                        {...register('dateFormat')}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue="DD/MM/YYYY"
                    >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">{t('general.defaultLanguage')}</label>
                <div className="mt-1">
                    <select
                        {...register('defaultLanguage')}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue="th"
                    >
                        <option value="th">Thai</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>

        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            {successMessage && (
                <span className="text-sm text-green-600 mr-4 animate-fade-in">{successMessage}</span>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center"
            >
                {isSubmitting ? tCommon('saving') : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        {tCommon('save')}
                    </>
                )}
            </button>
        </div>
      </form>
    </div>
  );
}
