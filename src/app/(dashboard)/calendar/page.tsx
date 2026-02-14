"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Mock calendar data for Feb 2026
  // Feb 1 2026 is a Sunday. 
  // 28 days total.
  
  const dates = Array.from({ length: 28 }, (_, i) => i + 1);
  const startDayOffset = 0; // Starts on Sunday

  const events = [
    { date: 5, title: "Team Meeting", type: 'meeting' },
    { date: 12, title: "Product Launch", type: 'launch' },
    { date: 16, title: "Company Holiday", type: 'holiday' },
    { date: 24, title: "Quarterly Review", type: 'review' },
  ];

  const getEventsForDate = (date: number) => events.filter(e => e.date === date);

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold w-32 text-center">February 2026</span>
            <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-4">
              <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground">
                  {days.map(day => (
                      <div key={day} className="py-2">{day}</div>
                  ))}
              </div>
          </CardHeader>
          <CardContent className="flex-1 grid grid-cols-7 auto-rows-fr gap-px bg-zinc-200 dark:bg-zinc-800 border-t border-l">
              {Array.from({ length: startDayOffset }).map((_, i) => (
                   <div key={`empty-${i}`} className="bg-background min-h-[100px]" />
              ))}
              {dates.map((date) => {
                  const dayEvents = getEventsForDate(date);
                  return (
                    <div key={date} className="relative bg-background p-2 min-h-[120px] border-b border-r hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                        <span className={`text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full ${date === 6 ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}>
                            {date}
                        </span>
                        <div className="mt-2 space-y-1">
                            {dayEvents.map((event, idx) => (
                                <div key={idx} className={`text-xs px-2 py-1 rounded truncate ${
                                    event.type === 'holiday' ? 'bg-red-100 text-red-700' :
                                    event.type === 'launch' ? 'bg-emerald-100 text-emerald-700' :
                                    'bg-blue-50 text-blue-700'
                                }`}>
                                    {event.title}
                                </div>
                            ))}
                        </div>
                        {/* Add interaction hit area */}
                        <div className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 flex items-end justify-end p-2 pointer-events-none">
                            <span className="text-xs bg-black text-white px-2 py-1 rounded opacity-50">+ Add</span>
                        </div>
                    </div>
                  );
              })}
          </CardContent>
      </Card>
    </div>
  );
}
