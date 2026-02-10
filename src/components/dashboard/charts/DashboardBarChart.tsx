"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { useTranslations } from "next-intl"

const data = [
  { name: "HR", count: 12, color: "#3b82f6" },
  { name: "IT", count: 25, color: "#8b5cf6" },
  { name: "Sales", count: 18, color: "#f43f5e" },
  { name: "Marketing", count: 14, color: "#10b981" },
  { name: "Finance", count: 8, color: "#f59e0b" },
]

export function DashboardBarChart() {
  const t = useTranslations('Dashboard')

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#252525] p-6 shadow-md dark:shadow-none">
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        {t('charts.employeesByDept')}
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
