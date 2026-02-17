import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const taskService = {
    async getTasks() {
        const response = await axios.get(`${API_URL}?_limit=20`);
        return response.data;
    },

    async createTask(task) {
        const response = await axios.post(API_URL, task);
        return response.data;
    },

    async updateTask(id, updates) {
        const response = await axios.patch(`${API_URL}/${id}`, updates);
        return response.data;
    },

    async deleteTask(id) {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
};
