import React from 'react';
import ToDoCard from './todoCard';

const TaskList = ({ tasks, onEdit, onDelete, moveCard }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <ToDoCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
          onEdit={onEdit}
          onDelete={onDelete}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default TaskList;
