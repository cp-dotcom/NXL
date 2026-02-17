import React, { useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useBoardStore } from '../../store/boardStore';
import Column from './Column';

const COLUMNS = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' }
];

export default function KanbanBoard() {
    const { fetchTasks, getFilteredTasks, toggleStatus, loading, error } = useBoardStore();
    const tasks = getFilteredTasks();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const onDragEnd = (result) => {
        const { destination, draggableId } = result;
        if (!destination) return;
        toggleStatus(parseInt(draggableId), destination.droppableId);
    };

    if (loading && tasks.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-bold text-muted-foreground">Loading tasks...</span>
                </div>
            </div>
        );
    }

    if (error && tasks.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive font-bold mb-4">{error}</p>
                    <button onClick={fetchTasks} className="px-4 py-2 bg-primary text-white rounded-lg transition-transform active:scale-95">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                    {COLUMNS.map((column) => {
                        const columnTasks = tasks.filter(task => task.status === column.id);
                        return (
                            <Column
                                key={column.id}
                                column={column}
                                tasks={columnTasks}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
