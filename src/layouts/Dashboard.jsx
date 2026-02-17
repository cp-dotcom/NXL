import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';
import { cn } from '../utils/utils';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-[101] md:relative md:flex shrink-0 transition-transform duration-300 md:translate-x-0 w-64",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <TopNav onMenuClick={toggleSidebar} />

                {/* Scrollable View Area */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
