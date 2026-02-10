"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useTranslations } from "next-intl"

const data = [
  { name: "Full-time", value: 65, color: "#3b82f6" },
  { name: "Part-time", value: 20, color: "#10b981" },
  { name: "Contract", value: 10, color: "#f59e0b" },
  { name: "Intern", value: 5, color: "#8b5cf6" },
]

export function DashboardDonutChart() {
  const t = useTranslations('Dashboard')

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#252525] p-6 shadow-md dark:shadow-none flex flex-col">
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        {t('charts.employmentStatus')}
      </h3>
      <div className="h-[300px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
            />
            <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                color="#888888" // Not working directly on Legend?
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
