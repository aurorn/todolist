import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ToDoCard = ({ id, title, description, dueDate, priority, onEdit, onDelete, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.id !== id) {
        moveCard(item.id, id);
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {description}
          </Typography>
          <Typography color="textSecondary">
            Due: {dueDate}
          </Typography>
          <Typography color="textSecondary">
            Priority: {priority}
          </Typography>
          <IconButton onClick={() => onEdit(id)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToDoCard;
