'use client';

import { useTranslations } from 'next-intl';
import { Trash2, Edit } from 'lucide-react';
import { deletePosition } from '@/lib/actions/organization-actions';

interface Position {
  id: string;
  code?: string | null;
  title: string;
  level?: number | null;
  department: { name: string };
}

export function PositionTable({ positions }: { positions: Position[] }) {
  const t = useTranslations('Common');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this position?')) {
      await deletePosition(id);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {positions.map((pos) => (
            <tr key={pos.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{pos.code || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pos.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pos.department.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-medium">LVL {pos.level || 0}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button className="text-indigo-600 hover:text-indigo-900"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(pos.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
