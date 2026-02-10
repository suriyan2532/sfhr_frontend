'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormValues } from '@/lib/validators/user-schema';
import { updateUser, getUser, getRoles } from '@/lib/actions/user-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from '@/navigation';
import { Label } from '@/components/ui/label';

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema) as any,
    defaultValues: {
      username: '',
      email: '',
      password: '',
      roleId: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [rolesData, userData] = await Promise.all([
          getRoles(),
          getUser(params.id)
        ]);
        
        setRoles(rolesData);
        
        if (userData) {
            reset({
                username: userData.username,
                email: userData.email || '',
                password: '', // Don't show password
                roleId: userData.roleId,
                isActive: userData.isActive
            });
        }
      } catch (error) {
        alert("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.id, reset]);

  async function onSubmit(data: UserFormValues) {
    const formData = new FormData();
    formData.append('username', data.username);
    if (data.email) formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    formData.append('roleId', data.roleId.toString());
    formData.append('isActive', data.isActive.toString());

    const result = await updateUser(params.id, formData);

    if (result && result.message) {
      alert(result.message);
    } else {
      alert('User updated successfully');
      router.push('/users');
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="jdoe" {...register('username')} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="jdoe@example.com" {...register('email')} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password (Leave blank to keep current)</Label>
              <Input id="password" type="password" placeholder="******" {...register('password')} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleId">Role</Label>
              <select 
                id="roleId" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('roleId')}
              >
                <option value="0">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.roleId && <p className="text-red-500 text-sm">{errors.roleId.message}</p>}
            </div>

            <div className="flex flex-row items-center space-x-3 p-4 border rounded-md">
               <input 
                type="checkbox" 
                id="isActive" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                {...register('isActive')} 
              />
              <div className="space-y-1">
                <Label htmlFor="isActive" className="font-medium">Active Account</Label>
                <p className="text-sm text-muted-foreground">User will be able to log in.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Update User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
