import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL da API Laravel
});

export const TodoService = {
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  updateTodo: async (id, todo) => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};

export default api; 