import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-black">{children}</main>
        </div>
    );
}
