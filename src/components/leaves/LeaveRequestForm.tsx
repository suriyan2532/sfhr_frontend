'use client';

import { useForm } from 'react-hook-form';
import { GlassCard, GlassButton, GlassInput, GlassLabel, GlassSelect } from '@/components/ui/glass-ui';
import { useTranslations } from 'next-intl';
import { createLeaveRequest } from '@/lib/actions/leave-actions';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface LeaveType {
    id: string;
    name: string;
    code: string;
}

export function LeaveRequestForm({ leaveTypes }: { leaveTypes: LeaveType[] }) {
    const t = useTranslations('Leave');
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));
        
        const result = await createLeaveRequest(formData);
        if (result.message) {
            alert(result.message); // Simple feedback for now
            if (result.message.includes('success')) {
                setIsOpen(false);
                reset();
            }
        }
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
                <Plus className="h-4 w-4" />
                {t('newRequest')}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <GlassCard className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{t('newRequest')}</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">✕</button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <GlassLabel htmlFor="leaveTypeId">{t('leaveType')}</GlassLabel>
                        <GlassSelect id="leaveTypeId" {...register('leaveTypeId', { required: true })}>
                            <option value="">{t('selectType')}</option>
                            {leaveTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name} ({type.code})</option>
                            ))}
                        </GlassSelect>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GlassLabel htmlFor="startDate">{t('startDate')}</GlassLabel>
                            <GlassInput type="date" id="startDate" {...register('startDate', { required: true })} />
                        </div>
                        <div>
                            <GlassLabel htmlFor="endDate">{t('endDate')}</GlassLabel>
                            <GlassInput type="date" id="endDate" {...register('endDate', { required: true })} />
                        </div>
                    </div>

                    <div>
                        <GlassLabel htmlFor="reason">{t('reason')}</GlassLabel>
                        <GlassInput id="reason" {...register('reason')} placeholder={t('reasonPlaceholder')} />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <GlassButton type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                            {t('cancel')}
                        </GlassButton>
                        <GlassButton type="submit" isLoading={isSubmitting}>
                            {t('submit')}
                        </GlassButton>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
