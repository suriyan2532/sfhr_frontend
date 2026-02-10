import { useTranslations } from 'next-intl';
import { ChainOfCommandNode, NodeData } from '@/components/organization/ChainOfCommandNode';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ChainOfCommandPage() {
  const t = await getTranslations('ChainOfCommand');

  // Dummy Hierarchy Data based on image
  const hierarchyData: NodeData = {
    id: '1',
    name: 'Somchai Khemglad',
    position: 'Executive Management',
    level: 'High Level',
    type: 'manager',
    initials: 'SK',
    children: [
        {
            id: '2',
            name: 'Test 1',
            position: 'Planning Level',
            level: 'Planning Level',
            type: 'manager',
            children: [
                {
                    id: '4',
                    name: 'Wipawee Rangsit',
                    position: 'UX/UI Designer',
                    level: 'Staff',
                    initials: 'WR'
                }
            ]
        },
        {
            id: '3',
            name: 'Test 2',
            position: 'Planning Level',
            level: 'Planning Level',
            type: 'manager',
            children: [
                {
                    id: '5',
                    name: 'Sub Test 2-1',
                    position: 'Planning Level',
                    level: 'Planning Level',
                    children: [
                        { id: '7', name: 'Nadech Kukimiya', position: 'Frontend Dev', level: 'Staff', initials: 'NK' },
                        { id: '8', name: 'Mark Prin', position: 'Content Creator', level: 'Staff', initials: 'MP' }
                    ]
                },
                {
                    id: '6',
                    name: 'Sub Test 2-2',
                    position: 'Planning Level',
                    level: 'Planning Level',
                    children: [
                        { id: '9', name: 'Sunny Suwanmethanont', position: 'Graphic Designer', level: 'Staff', initials: 'SS' }
                    ]
                }
            ]
        }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
                <div>
                   <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                   <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <RotateCcw className="h-5 w-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                        <Plus className="h-4 w-4" />
                        {t('btnAddNode')}
                    </button>
                </div>
            </div>
        </div>

        {/* Content Area - Hierarchy Container */}
        <div className="flex-1 overflow-auto p-12 bg-[#F9FAFB] rounded-xl">
            <div className="min-w-max flex justify-center">
                <div className="relative p-8 rounded-2xl border border-dashed border-gray-300 bg-white/50">
                    {/* Floating Controls (Zoom/Pan placeholders) */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                        <button className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center">+</button>
                        <button className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center">-</button>
                    </div>

                    <ChainOfCommandNode node={hierarchyData} isRoot={true} />
                </div>
            </div>
        </div>
    </div>
  );
}
