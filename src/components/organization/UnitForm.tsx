'use client';

import { useTranslations } from 'next-intl';
import { createUnit } from '@/lib/actions/organization-actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitSchema, UnitFormValues } from '@/lib/validators/organization-schema';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

export function UnitForm({ companies }: { companies: Company[] }) {
  const t = useTranslations('Common');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
  });

  const onSubmit = async (data: UnitFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));
    
    try {
      await createUnit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Unit Code</label>
          <input
            {...register('code')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            placeholder="e.g. UNIT-001"
          />
          {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Unit Name</label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            placeholder="e.g. Sales Unit"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
          <select
            {...register('companyId')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.companyId && <p className="mt-1 text-xs text-red-500">{errors.companyId.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Unit
        </button>
      </div>
    </form>
  );
}
