import React, { useState } from 'react';
import BoardHeader from '../../components/dashboard/BoardHeader';
import BoardFilters from '../../components/dashboard/BoardFilters';
import TaskBoard from '../../components/dashboard/TaskBoard.jsx'
import TaskModal from '../../components/TaskModal.jsx';
import { useBoardStore } from '../../store/boardStore';

export default function TaskBoardView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addTask } = useBoardStore();

    const handleAddTask = (taskData) => {
        addTask(taskData);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <BoardHeader onAddTask={() => setIsModalOpen(true)} />
            <BoardFilters />

            <main className="flex-1 overflow-hidden flex flex-col">
                <TaskBoard />
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTask}
            />
        </div>
    );
}
