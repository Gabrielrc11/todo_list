import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { TodoService } from '../services/api';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await TodoService.getAllTodos();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar as tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await TodoService.createTodo({ 
        title: newTodo, 
        description: newDescription,
        completed: false 
      });
      setTodos([...todos, todo]);
      setNewTodo('');
      setNewDescription('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar tarefa');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await TodoService.updateTodo(id, { 
        ...todoToUpdate,
        completed: !todoToUpdate.completed 
      });
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
      setError('');
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError('');
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error(err);
    }
  };

  const handleEditTodo = async (id, newTitle, newDescription) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await TodoService.updateTodo(id, { 
        ...todoToUpdate,
        title: newTitle,
        description: newDescription
      });
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
      setError('');
    } catch (err) {
      setError('Erro ao editar tarefa');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Lista de Tarefas
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleAddTodo}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Título da tarefa"
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Descrição da tarefa"
                variant="outlined"
                size="small"
                multiline
                rows={3}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!newTodo.trim()}
              >
                Adicionar
              </Button>
            </Box>
          </form>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}
              {todos.length === 0 && (
                <Typography sx={{ p: 2, textAlign: 'center' }}>
                  Nenhuma tarefa encontrada
                </Typography>
              )}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default TodoList; 