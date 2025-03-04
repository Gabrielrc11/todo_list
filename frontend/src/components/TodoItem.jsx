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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
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
        secondaryAction={
          <Box>
            {isEditing ? (
              <>
                <IconButton edge="end" onClick={handleSave} color="primary" sx={{ mr: 1 }}>
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleCancel} color="error">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" onClick={() => setIsEditing(true)} color="primary" sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => onDelete(todo.id)} color="error" sx={{ mr: 1 }}>
                  <DeleteIcon />
                </IconButton>
                <MuiIconButton edge="end" onClick={toggleExpand}>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MuiIconButton>
              </>
            )}
          </Box>
        }
        disablePadding
      >
        <ListItemButton onClick={() => !isEditing && onToggle(todo.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              disabled={isEditing}
            />
          </ListItemIcon>
          {isEditing ? (
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                size="small"
                autoFocus
                sx={{ mb: 1 }}
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
              />
            </Box>
          ) : (
            <ListItemText
              primary={todo.title}
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 9, pr: 2, pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {todo.description || 'Sem descrição'}
          </Typography>
        </Box>
      </Collapse>
    </>
  );
};

export default TodoItem; 