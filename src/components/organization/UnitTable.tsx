'use client';

import { useTranslations } from 'next-intl';
import { Trash2, Edit } from 'lucide-react';
import { deleteUnit } from '@/lib/actions/organization-actions';

interface Unit {
  id: string;
  code: string;
  name: string;
  company: {
    name: string;
  };
}

export function UnitTable({ units }: { units: Unit[] }) {
  const t = useTranslations('Common');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this unit?')) {
      await deleteUnit(id);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {units.map((unit) => (
            <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.company.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button className="text-indigo-600 hover:text-indigo-900"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(unit.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
