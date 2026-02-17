import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { taskService } from '../services/taskService';

export const useBoardStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            tasks: [],
            loading: false,
            error: null,
            searchQuery: '',
            statusFilter: 'all',

            // User actions
            setUser: (user) => set({ user, isLoggedIn: !!user }),
            logout: () => set({ user: null, isLoggedIn: false }),

            // Task actions
            fetchTasks: async () => {
                set({ loading: true, error: null });
                try {
                    const data = await taskService.getTasks();
                    const mappedTasks = data.map(task => ({
                        ...task,
                        status: task.completed ? 'completed' : 'todo',
                        description: task.description || 'No description provided.'
                    }));
                    set({ tasks: mappedTasks, loading: false });
                } catch (err) {
                    set({ error: 'Failed to fetch tasks', loading: false });
                }
            },

            addTask: (task) => set((state) => ({
                tasks: [{ ...task, id: Date.now(), status: task.status || 'todo' }, ...state.tasks]
            })),

            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updates } : task
                ),
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })),

            toggleStatus: (id, newStatus) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, status: newStatus, completed: newStatus === 'completed' } : task
                ),
            })),

            setSearchQuery: (query) => set({ searchQuery: query }),
            setStatusFilter: (filter) => set({ statusFilter: filter }),

            getFilteredTasks: () => {
                const { tasks, searchQuery, statusFilter } = get();
                const taskArray = Array.isArray(tasks) ? tasks : [];
                return taskArray.filter((task) => {
                    const matchesSearch = task?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
                    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
                    return matchesSearch && matchesStatus;
                });
            },
        }),
        {
            name: 'board-storage',
            partialize: (state) => ({ tasks: state.tasks, user: state.user, isLoggedIn: state.isLoggedIn }),
        }
    )
);
