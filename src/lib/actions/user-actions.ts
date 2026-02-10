'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuthToken } from '@/lib/utils'; // Assuming a utility to get token from session/cookie

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper to get headers with token
async function getHeaders() {
    const token = await getAuthToken();
    return {
        'Content-Type': 'application/json',
        'x-access-token': token || '',
    };
}

export async function getUsers(query: string = '') {
    // Note: Backend might need update to support query/pagination if not already
    // Current backend getAllUsers just returns all.
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/users`, { headers, cache: 'no-store' });
    
    if (!res.ok) {
        console.error('Failed to fetch users');
        return [];
    }
    
    return res.json();
}

export async function getUser(id: string) {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/users/${id}`, { headers, cache: 'no-store' });
    
    if (!res.ok) {
        return null;
    }
    
    return res.json();
}

export async function getRoles() {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/roles`, { headers, cache: 'no-store' });
    
    if (!res.ok) {
         console.error('Failed to fetch roles');
        return [];
    }
    
    return res.json();
}

export async function createUser(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const headers = await getHeaders();
    
    // Convert logic if needed, e.g. roleId string to number happens in backend or here?
    // userSchema coerces roleId. Backend expects roleId.
    
    const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const error = await res.json();
        return { message: error.message || 'Failed to create user' };
    }

    revalidatePath('/users');
    redirect('/users');
}

export async function updateUser(id: string, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const headers = await getHeaders();

    const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const error = await res.json();
        return { message: error.message || 'Failed to update user' };
    }

    revalidatePath('/users');
    redirect('/users');
}

export async function deleteUser(id: string) {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers,
    });

    if (!res.ok) {
        return { message: 'Failed to delete user' };
    }
    
    revalidatePath('/users');
    return { message: 'User deleted' };
}
