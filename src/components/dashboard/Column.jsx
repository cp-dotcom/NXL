import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, Clock, CheckSquare, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';
import { cn } from '../../utils/utils';

const ColumnIcon = ({ id }) => {
    if (id === 'todo') return <Clock size={16} className="text-muted-foreground" />;
    if (id === 'in-progress') return <CheckSquare size={16} className="text-blue-500" />;
    if (id === 'completed') return <CheckCircle2 size={16} className="text-green-500" />;
    return null;
};

const Column = ({ column, tasks }) => {
    return (
        <div className="flex flex-col w-full h-fit bg-accent/5 rounded-2xl border transition-all hover:border-primary/20">
            {/* Column Header */}
            <div className="p-4 flex items-center justify-between border-b bg-muted/30 rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg shadow-sm">
                        <ColumnIcon id={column.id} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">{column.title}</h2>
                        <p className="text-[10px] text-muted-foreground font-bold">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
                    </div>
                </div>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                            "p-3 transition-colors min-h-[150px]",
                            snapshot.isDraggingOver && "bg-primary/5"
                        )}
                    >
                        {tasks.length === 0 ? (
                            <div className="h-24 flex flex-col items-center justify-center opacity-40 border-2 border-dashed rounded-xl">
                                <Plus size={24} className="mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">No tasks yet</span>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index} />
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
