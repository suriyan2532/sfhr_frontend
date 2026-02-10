'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, User as UserIcon, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Link } from '@/navigation';
import { getUsers, deleteUser } from '@/lib/actions/user-actions';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    const res = await deleteUser(id);
    if (res.message === 'User deleted') {
        alert('User deleted successfully');
        loadUsers();
    } else {
        alert(res.message);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">User Information</h1>
           <p className="text-muted-foreground">Manage system users and their access rights.</p>
        </div>
        <Link href="/users/create">
            <Button>
            <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All Users</CardTitle>
          <div className="relative w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input type="search" placeholder="Search users..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Username</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Role</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {loading ? (
                    <tr>
                        <td colSpan={5} className="p-4 text-center">Loading...</td>
                    </tr>
                ) : users.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No users found.</td>
                    </tr>
                ) : (
                    users.map((user) => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle font-medium flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                <UserIcon className="h-4 w-4 text-zinc-500" />
                            </div>
                            <div>
                                <div className="font-semibold">{user.username}</div>
                            </div>
                        </td>
                        <td className="p-4 align-middle">{user.email || '-'}</td>
                        <td className="p-4 align-middle">
                            {user.Role ? (
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {user.Role.name}
                                </span>
                            ) : '-'}
                        </td>
                        <td className="p-4 align-middle">
                             <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                                user.isActive 
                                ? 'bg-green-50 text-green-700 ring-green-600/20' 
                                : 'bg-red-50 text-red-700 ring-red-600/20'
                            }`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                                <Link href={`/users/${user.id}`}>
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                                    <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
