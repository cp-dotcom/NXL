import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, X } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import TaskModal from '../TaskModal';
import { cn } from '../../utils/utils';

const TaskCard = ({ task, index }) => {
    const { updateTask, deleteTask } = useBoardStore();
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (taskData) => {
        updateTask(task.id, taskData);
    };

    return (
        <>
            <Draggable draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                            "bg-card p-4 rounded-xl shadow-sm border mb-3 hover:shadow-md transition-all select-none group relative",
                            snapshot.isDragging && "shadow-xl border-primary bg-accent ring-4 ring-primary/10"
                        )}
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold leading-tight pr-4 lowercase first-letter:uppercase">
                                    {task.title}
                                </p>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                        className="p-1 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        <MoreHorizontal size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                        className="p-1 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-accent rounded-full capitalize">
                                    <span>{task.status.replace('-', ' ')}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            <TaskModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                onSave={handleSave}
                task={task}
            />
        </>
    );
};

export default TaskCard;
