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
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import { TodoService } from '../services/api';
import TodoItem from './TodoItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const TodoList = ({ onToggleTheme, isDarkMode }) => {
  const theme = useTheme();
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
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: 4,
        px: 2,
        bgcolor: theme.palette.background.default,
        transition: 'background-color 0.3s',
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: '600px',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              width: '100%',
              position: 'relative',
            }}
          >
            <Tooltip title={`Mudar para tema ${isDarkMode ? 'claro' : 'escuro'}`}>
              <IconButton
                onClick={onToggleTheme}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              Lista de Tarefas
            </Typography>
          </Paper>

          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              borderRadius: 2,
              width: '100%',
            }}
          >
            <form onSubmit={handleAddTodo}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Título da tarefa"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!newTodo.trim()}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: 2,
                  }}
                >
                  Adicionar Tarefa
                </Button>
              </Box>
            </form>
          </Paper>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                width: '100%',
              }}
            >
              {error}
            </Alert>
          )}

          <Paper 
            elevation={2}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List sx={{ p: 0, width: '100%' }}>
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
                  <Box 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <Typography variant="body1">
                      Nenhuma tarefa encontrada
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Adicione uma nova tarefa usando o formulário acima
                    </Typography>
                  </Box>
                )}
              </List>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default TodoList; 