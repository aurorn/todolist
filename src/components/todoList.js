import React from 'react';
import { useDrop } from 'react-dnd';
import { ToDoCard } from './todoCard';
import { moveToDo } from '../modules/taskHandlers';

export function ToDoList({ todos, projectIndex }) {
  const [, drop] = useDrop({
    accept: 'TODO',
    drop: (item) => {
      moveToDo(item.projectIndex, item.toDoIndex, projectIndex);
    },
  });

  return (
    <div ref={drop} className="to-do-container">
      {todos.map((toDo, index) => (
        <ToDoCard
          key={index}
          toDo={toDo}
          projectIndex={projectIndex}
          toDoIndex={index}
        />
      ))}
    </div>
  );
}
