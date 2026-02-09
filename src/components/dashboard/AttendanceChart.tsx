'use client';

interface ChartData {
    date: string;
    fullDate: string;
    count: number;
}

export function AttendanceChart({ data }: { data: ChartData[] }) {
    const maxVal = Math.max(...data.map(d => d.count), 1);
    
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Attendance Trend</h3>
            <div className="flex items-end justify-between h-48 gap-2">
                {data.map((d, i) => {
                    const height = (d.count / maxVal) * 100;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="relative w-full h-full flex items-end justify-center">
                                {/* Bar */}
                                <div 
                                    className="w-full max-w-[32px] bg-indigo-500 rounded-t-lg transition-all duration-500 hover:bg-indigo-600 cursor-pointer"
                                    style={{ height: `${height}%` }}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {d.count} Employees
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-500">{d.date}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
