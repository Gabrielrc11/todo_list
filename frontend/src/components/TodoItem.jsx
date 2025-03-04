import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
  Collapse,
  IconButton as MuiIconButton,
  Divider,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');
  const [expanded, setExpanded] = useState(false);

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      onEdit(todo.id, editedTitle, editedDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setIsEditing(false);
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem
        sx={{
          bgcolor: todo.completed ? theme.palette.action.hover : 'transparent',
          transition: 'background-color 0.3s',
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
          pr: 1,
        }}
        secondaryAction={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isEditing ? (
              <>
                <IconButton 
                  edge="end" 
                  onClick={handleSave} 
                  color="primary"
                  sx={{ 
                    bgcolor: theme.palette.primary.main + '10',
                    '&:hover': {
                      bgcolor: theme.palette.primary.main + '20',
                    },
                    p: 1.5,
                  }}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  onClick={handleCancel} 
                  color="error"
                  sx={{ 
                    bgcolor: theme.palette.error.main + '10',
                    '&:hover': {
                      bgcolor: theme.palette.error.main + '20',
                    },
                    p: 1.5,
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton 
                  edge="end" 
                  onClick={() => setIsEditing(true)} 
                  color="primary"
                  sx={{ 
                    bgcolor: theme.palette.primary.main + '10',
                    '&:hover': {
                      bgcolor: theme.palette.primary.main + '20',
                    },
                    p: 1.5,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  onClick={() => onDelete(todo.id)} 
                  color="error"
                  sx={{ 
                    bgcolor: theme.palette.error.main + '10',
                    '&:hover': {
                      bgcolor: theme.palette.error.main + '20',
                    },
                    p: 1.5,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                {todo.description && (
                  <MuiIconButton 
                    edge="end" 
                    onClick={toggleExpand}
                    sx={{ 
                      color: theme.palette.info.main,
                      bgcolor: theme.palette.info.main + '10',
                      '&:hover': {
                        bgcolor: theme.palette.info.main + '20',
                      },
                      p: 1.5,
                    }}
                  >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </MuiIconButton>
                )}
              </>
            )}
          </Box>
        }
        disablePadding
      >
        <ListItemButton 
          onClick={() => !isEditing && onToggle(todo.id)} 
          dense
          sx={{ py: 2 }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              disabled={isEditing}
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </ListItemIcon>
          {isEditing ? (
            <Box sx={{ flex: 1, pr: 2 }}>
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                size="small"
                autoFocus
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSave();
                  }
                }}
              />
              <TextField
                fullWidth
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                size="small"
                multiline
                rows={3}
                placeholder="Descrição da tarefa"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          ) : (
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                    fontWeight: 500,
                  }}
                >
                  {todo.title}
                </Typography>
              }
              secondary={todo.description && !expanded && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <DescriptionIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {todo.description}
                  </Typography>
                </Box>
              )}
            />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box 
          sx={{ 
            pl: 9, 
            pr: 2, 
            pb: 2,
            pt: 1,
            bgcolor: theme.palette.grey[50],
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {todo.description}
          </Typography>
        </Box>
      </Collapse>
      <Divider />
    </>
  );
};

export default TodoItem; 