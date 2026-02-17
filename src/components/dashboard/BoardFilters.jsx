import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { cn } from '../../utils/utils';

export default function BoardFilters() {
    const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, } = useBoardStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statusOptions = [
        { value: 'all', label: 'All' },
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ];

    const currentStatusLabel = statusOptions.find(opt => opt.value === statusFilter)?.label || 'All';


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background/40 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full md:w-auto">

                <div className="relative w-full md:w-94">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full bg-accent/50 border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>


                <div className="flex items-center gap-2 w-full md:w-auto relative" ref={dropdownRef}>
                    <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Status:</span>

                    <div className="relative flex-1 md:flex-none">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full md:w-40 flex items-center justify-between bg-accent/50 border rounded-xl px-3 h-10 md:h-9 text-sm focus:outline-none cursor-pointer hover:bg-accent transition-all font-medium"
                        >
                            <span className="truncate">{currentStatusLabel}</span>
                            <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 top-full mt-2 w-full md:w-48 bg-card border rounded-xl shadow-xl z-50 p-1 animate-in fade-in zoom-in duration-200 origin-top">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setStatusFilter(option.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={cn(
                                            "flex w-full items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors font-medium text-left",
                                            statusFilter === option.value
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {option.label}
                                        {statusFilter === option.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
            </div>

            <div className="flex items-center gap-2">
            </div>
        </div>
    );
}
