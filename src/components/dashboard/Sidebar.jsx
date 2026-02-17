import React from 'react';
import {
    Layout,
    Command,
    Plus,
    X,
    HelpCircle,
    CloudDrizzle
} from 'lucide-react';
import { cn } from '../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

const SidebarItem = ({ icon: Icon, label, active, onClick, className }) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all group",
            active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-accent text-muted-foreground hover:text-foreground",
            className
        )}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={cn(active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
            <span className="text-sm font-medium">{label}</span>
        </div>
    </div>
);

const SidebarSection = ({ title, children, hasPlus }) => (
    <div className="mb-4">
        <div className="flex items-center justify-between px-3 mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{title}</span>
            {hasPlus && <Plus size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />}
        </div>
        <div className="space-y-0.5">
            {children}
        </div>
    </div>
);

export default function Sidebar({ onClose }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboardActive = location.pathname === '/' || location.pathname === '/dashboard';
    const isErrorActive = location.pathname === '/error';

    return (
        <div className="w-full h-full border-r bg-card flex flex-col overflow-y-auto shadow-2xl md:shadow-none ">
            <div className="p-4 flex items-center justify-between mb-2 border-b">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                        <Command size={20} className="text-primary-foreground" />

                    </div>
                    <span className="font-bold text-lg tracking-tight">NXL</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-muted-foreground"
                    onClick={onClose}
                >
                    <X size={20} />
                </Button>
            </div>

            <div className="flex-1 px-3 py-4 flex flex-col gap-1">
                <SidebarSection title="General">
                    <SidebarItem
                        icon={Layout}
                        label="Dashboard"
                        active={isDashboardActive}
                        onClick={() => {
                            navigate('/');
                            onClose?.();
                        }}
                    />
                    <SidebarItem
                        icon={HelpCircle}
                        label="Error Page"
                        active={isErrorActive}
                        onClick={() => {
                            navigate('/error');
                            onClose?.();
                        }}
                    />
                </SidebarSection>
            </div>
        </div>
    );
}
