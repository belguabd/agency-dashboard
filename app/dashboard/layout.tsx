
import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';


export default async function DashboardLayout({ children }: { children: ReactNode }) {

    const { isAuthenticated} = await auth();

    if (!isAuthenticated) {
        redirect('/');
    }
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-black">
                {children}
            </main>
        </div>
    );
}
