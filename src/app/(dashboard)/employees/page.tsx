"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal, User } from "lucide-react";

export default function EmployeesPage() {
  const employees = [
    { id: 1, name: "Alice Johnson", role: "Software Engineer", department: "Engineering", status: "Active", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "Product Manager", department: "Product", status: "Active", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "Designer", department: "Design", status: "On Leave", email: "charlie@example.com" },
    { id: 4, name: "Diana Prince", role: "HR Specialist", department: "HR", status: "Active", email: "diana@example.com" },
    { id: 5, name: "Evan Wright", role: "DevOps Engineer", department: "Engineering", status: "Active", email: "evan@example.com" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
           <p className="text-muted-foreground">Manage your team members and their roles.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All Employees</CardTitle>
          <div className="relative w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input type="search" placeholder="Search employees..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Role</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Department</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div>
                            <div className="font-semibold">{employee.name}</div>
                            <div className="text-xs text-muted-foreground">{employee.email}</div>
                        </div>
                    </td>
                    <td className="p-4 align-middle">{employee.role}</td>
                    <td className="p-4 align-middle">{employee.department}</td>
                    <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                            employee.status === 'Active' 
                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                            : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                        }`}>
                            {employee.status}
                        </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
