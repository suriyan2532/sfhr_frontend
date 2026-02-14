"use client";

import { AttendanceFilters } from "@/components/attendance/AttendanceFilters";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AttendanceCalendar } from "@/components/attendance/AttendanceCalendar";
import { AttendanceViewToggle } from "@/components/attendance/AttendanceViewToggle";
import { useState, useEffect } from "react";
import {
  getAttendanceRecords,
  getMyEmployeeId,
} from "@/lib/actions/attendance-actions";

interface AttendanceDay {
  day: number;
  date: string;
  status: string | undefined;
  leaveType: string | undefined;
  timeIn: string | null;
  timeOut: string | null;
}

interface AttendanceRecord {
  id: string;
  employeeCode: string;
  name: string;
  department: string;
  days: AttendanceDay[];
  totalDays: number;
}

export default function AttendancePage() {
  const [view, setView] = useState<"self" | "team">("self");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [myEmployeeId, setMyEmployeeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const id = await getMyEmployeeId();
      setMyEmployeeId(id);
    }
    init();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getAttendanceRecords();
      setRecords(data);
      setLoading(false);
    }
    if (myEmployeeId !== null || view === "team") {
      fetchData();
    }
  }, [month, year, view, myEmployeeId]);

  return (
    <div className="flex flex-col h-full bg-gray-50/50 dark:bg-black p-4 sm:p-6 lg:p-10 space-y-8 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <AttendanceViewToggle view={view} onViewChange={setView} />
      </div>

      <AttendanceFilters
        month={month}
        year={year}
        onFilterChange={(m, y) => {
          setMonth(m);
          setYear(y);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {view === "self" ? (
            records.length > 0 ? (
              <AttendanceCalendar
                record={records[0]}
                month={month}
                year={year}
              />
            ) : (
              <div className="text-center p-20 bg-white dark:bg-[#252525] rounded-3xl border border-gray-100 dark:border-white/10">
                No attendance records found for your profile.
              </div>
            )
          ) : (
            <AttendanceTable records={records} month={month} year={year} />
          )}
        </>
      )}
    </div>
  );
}
