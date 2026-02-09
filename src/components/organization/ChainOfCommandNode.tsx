'use client';

import { clsx } from 'clsx';
import { User, ShieldCheck } from 'lucide-react';

export interface NodeData {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  initials?: string;
  level: string;
  children?: NodeData[];
  type?: 'manager' | 'staff';
}

interface ChainOfCommandNodeProps {
  node: NodeData;
  isRoot?: boolean;
}

export function ChainOfCommandNode({ node, isRoot = false }: ChainOfCommandNodeProps) {
  const isManager = node.type === 'manager' || (node.children && node.children.length > 0);

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className={clsx(
        "relative flex flex-col items-center p-4 min-w-[200px] rounded-xl border-2 transition-all hover:shadow-lg",
        isManager ? "bg-white border-indigo-600 shadow-sm" : "bg-gray-50 border-emerald-500 shadow-sm"
      )}>
        {/* Top Icon Decoration */}
        <div className={clsx(
          "absolute -top-4 w-8 h-8 rounded-lg flex items-center justify-center text-white",
          isManager ? "bg-indigo-600" : "bg-emerald-500"
        )}>
           {isManager ? <ShieldCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </div>

        {/* Avatar/Initials */}
        <div className={clsx(
            "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3",
            isManager ? "bg-indigo-500" : "bg-emerald-400"
        )}>
          {node.initials || node.name.charAt(0)}
        </div>

        {/* Details */}
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-sm">{node.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{node.position}</p>
          <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600 font-medium">
            {node.level}
          </div>
        </div>
      </div>

      {/* Connection Line Down */}
      {node.children && node.children.length > 0 && (
        <div className="w-px h-8 bg-gray-300"></div>
      )}

      {/* Children Container */}
      {node.children && node.children.length > 0 && (
        <div className="relative">
             {/* Horizontal Connection Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-100px)] h-px bg-gray-300"></div>
            
            <div className="flex gap-8 px-4">
                {node.children.map((child) => (
                    <div key={child.id} className="relative pt-8">
                        {/* Vertical line from horizontal line to child */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
                        <ChainOfCommandNode node={child} />
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
