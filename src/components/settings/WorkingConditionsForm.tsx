'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';

interface WorkingConditionsData {
  standardWorkDays: string[];
  workStartTime: string;
  workEndTime: string;
  lateThresholdMinutes: number;
}

export function WorkingConditionsForm() {
  const t = useTranslations('Settings');
  const tCommon = useTranslations('Common');
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<WorkingConditionsData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: WorkingConditionsData) => {
    console.log('Saving working conditions:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage(t('savedSuccessfully'));
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const daysOfWeek = [
      { id: 'mon', label: t('days.monday') },
      { id: 'tue', label: t('days.tuesday') },
      { id: 'wed', label: t('days.wednesday') },
      { id: 'thu', label: t('days.thursday') },
      { id: 'fri', label: t('days.friday') },
      { id: 'sat', label: t('days.saturday') },
      { id: 'sun', label: t('days.sunday') },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
        <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">{t('workingConditions.title')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('workingConditions.description')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            
            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">{t('workingConditions.standardWorkDays')}</span>
                <div className="flex flex-wrap gap-4">
                    {daysOfWeek.map((day) => (
                         <div key={day.id} className="relative flex items-start">
                            <div className="flex items-center h-5">
                            <input
                                id={`day-${day.id}`}
                                type="checkbox"
                                value={day.id}
                                {...register('standardWorkDays')}
                                defaultChecked={['mon', 'tue', 'wed', 'thu', 'fri'].includes(day.id)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            </div>
                            <div className="ml-3 text-sm">
                            <label htmlFor={`day-${day.id}`} className="font-medium text-gray-700">
                                {day.label}
                            </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                     <label htmlFor="workStartTime" className="block text-sm font-medium text-gray-700">{t('workingConditions.startTime')}</label>
                     <div className="mt-1">
                        <input
                            type="time"
                            {...register('workStartTime')}
                            defaultValue="08:00"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                     </div>
                </div>

                <div>
                     <label htmlFor="workEndTime" className="block text-sm font-medium text-gray-700">{t('workingConditions.endTime')}</label>
                     <div className="mt-1">
                        <input
                            type="time"
                            {...register('workEndTime')}
                            defaultValue="17:00"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                     </div>
                </div>
            </div>
            
            <div>
                 <label htmlFor="lateThresholdMinutes" className="block text-sm font-medium text-gray-700">{t('workingConditions.lateThreshold')}</label>
                 <div className="mt-1 relative rounded-md shadow-sm w-32">
                    <input
                        type="number"
                        {...register('lateThresholdMinutes')}
                        defaultValue={15}
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-8"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{t('mins')}</span>
                    </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">{t('workingConditions.lateThresholdDesc')}</p>
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
