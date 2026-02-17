import { useState } from 'react';
import {
    Search,
    ChevronDown,
    LayoutGrid,
    LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/utils';

import { useNavigate } from 'react-router-dom';
import { useBoardStore } from '../../store/boardStore';

export default function TopNav({ onMenuClick }) {
    const navigate = useNavigate();
    const { user, logout } = useBoardStore();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur-md z-40 gap-4">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-muted-foreground hover:bg-accent ring-offset-background transition-colors"
                    onClick={onMenuClick}
                >
                    <LayoutGrid size={24} />
                </Button>

            </div>

            <div className="flex items-center gap-4">

                <div className="relative">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-accent p-1.5 rounded-full transition-colors"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold shadow-sm">
                            {user ? user[0].toUpperCase() : 'U'}
                        </div>
                        <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", showDropdown && "rotate-180")} />
                    </div>

                    {showDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowDropdown(false)}
                            />
                            <div className="absolute right-0 mt-2 w-56 bg-card border rounded-xl shadow-xl z-50 p-1 animate-in fade-in zoom-in duration-200">
                                <div className="px-3 py-2 border-b">
                                    <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
                                    <p className="text-sm font-semibold truncate">{user || 'User'}</p>
                                </div>
                                <div className="p-1">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive transition-colors font-medium"
                                    >
                                        <LogOut size={16} />
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
