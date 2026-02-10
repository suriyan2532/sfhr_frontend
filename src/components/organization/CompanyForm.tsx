'use client';

import { createCompany, updateCompany } from '@/lib/actions/organization-actions';
import { Company } from '@prisma/client';
import { Link } from '@/navigation';
import { Building2, Save, X } from 'lucide-react';
import { useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, CompanyFormValues } from '@/lib/validators/organization-schema';
import { useTranslations } from 'next-intl';

interface CompanyFormProps {
  company?: Company;
  parentOptions: { id: string; name: string; code: string }[];
}

export function CompanyForm({ company, parentOptions }: CompanyFormProps) {
  const router = useRouter();  
  const t = useTranslations('Organization');
  const tCommon = useTranslations('Common');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
        code: company?.code || '',
        name: company?.name || '',
        taxId: company?.taxId || '',
        address: company?.address || '',
        phone: company?.phone || '',
        parentId: company?.parentId || '',
    },
  });

  const onSubmit = async (data: CompanyFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value.toString());
    });

    let result;
    if (company) {
        result = await updateCompany(company.id, formData);
    } else {
        result = await createCompany(formData);
    }
    
    if (result?.errors) {
        Object.entries(result.errors).forEach(([key, messages]) => {
            setError(key as any, { message: messages[0] });
        });
    } else if (result?.message) {
        alert(result.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 border-b border-gray-200">
           <h3 className="text-lg leading-6 font-medium text-white flex items-center">
             <Building2 className="mr-2 h-5 w-5" />
             {company ? t('editTitle') : t('newTitle')}
           </h3>
           <p className="mt-1 text-sm text-indigo-100">
             {company ? t('editDesc') : t('newDesc')}
           </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                
                {/* Company Code */}
                <div className="sm:col-span-2">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t('code')} *</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register('code')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="e.g. COMP-001"
                        />
                        {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
                    </div>
                </div>

                {/* Company Name */}
                <div className="sm:col-span-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('name')} *</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register('name')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="e.g. Safari HR Co., Ltd."
                        />
                         {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                </div>

                {/* Tax ID */}
                 <div className="sm:col-span-3">
                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">{t('taxId')}</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register('taxId')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder={t('taxId')}
                        />
                         {errors.taxId && <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>}
                    </div>
                </div>
                
                {/* Phone */}
                 <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('phone')}</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register('phone')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="+66 2 123 4567"
                        />
                         {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>
                </div>
                
                {/* Parent Company */}
                <div className="sm:col-span-6">
                    <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">{t('parentCompany')}</label>
                    <div className="mt-1">
                        <select
                            {...register('parentId')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">{t('selectParent')}</option>
                            {parentOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name} ({opt.code})
                                </option>
                            ))}
                        </select>
                        <p className="mt-2 text-sm text-gray-500">Select a parent organization if this is a subsidiary.</p>
                         {errors.parentId && <p className="mt-1 text-sm text-red-600">{errors.parentId.message}</p>}
                    </div>
                </div>

                {/* Address */}
                <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('address')}</label>
                    <div className="mt-1">
                        <textarea
                            {...register('address')}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={''}
                        />
                         {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
                <Link
                    href="/dashboard/organization"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                >
                    <X className="mr-2 h-4 w-4" />
                    {tCommon('cancel')}
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center"
                >
                    {isSubmitting ? (
                        tCommon('saving')
                    ) : (
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
