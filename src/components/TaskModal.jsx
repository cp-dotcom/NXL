import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../utils/utils';

export default function TaskModal({ isOpen, onClose, onSave, task = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [openStatus, setOpenStatus] = useState(false);


    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStatus(task.status || 'todo');
        } else {
            setTitle('');
            setDescription('');
            setStatus('todo');
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, status });
        onClose();
    };



    const statuses = [
        { label: "To Do", value: "todo" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
    ];


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-card border rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">{task ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-accent rounded-full transition-colors">
                        <X size={20} className="text-muted-foreground" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Title</label>
                        <input
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-accent/50 border rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="What needs to be done?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-accent/50 border rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                            placeholder="Add more details..."
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                Initial Status
                            </label>

                            <div
                                onClick={() => setOpenStatus(!openStatus)}
                                className="w-full bg-accent/50 border rounded-xl py-2 px-4 text-sm cursor-pointer flex justify-between items-center"
                            >
                                {statuses.find((s) => s.value === status)?.label}
                                <span>⌄</span>
                            </div>

                            {openStatus && (
                                <div className="absolute z-50 w-full bg-card border rounded-xl shadow-lg mt-1 overflow-hidden">
                                    {statuses.map((s) => (
                                        <div
                                            key={s.value}
                                            onClick={() => {
                                                setStatus(s.value);
                                                setOpenStatus(false);
                                            }}
                                            className={cn(
                                                "px-4 py-2 text-sm cursor-pointer hover:bg-accent",
                                                status === s.value && "bg-accent"
                                            )}
                                        >
                                            {s.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 rounded-xl shadow-lg">
                            {task ? 'Update Task' : 'Create Task'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
