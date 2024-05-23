import React, { useState, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';
import Push from 'push.js';
import Tagify from '@yaireo/tagify';
import { deleteToDo, editToDoInProject } from '../modules/taskHandlers';

export function ToDoCard({ toDo, projectIndex, toDoIndex }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { projectIndex, toDoIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedToDo, setEditedToDo] = useState(toDo);
  const inputRef = useRef(null);

  useEffect(() => {
    new Tagify(inputRef.current);

    const dueDate = moment(toDo.dueDate);
    const now = moment();

    if (dueDate.isAfter(now) && dueDate.diff(now, 'days') <= 1) {
      Push.create('Task Due Soon', {
        body: `${toDo.title} is due soon!`,
      });
    }
  }, [toDo.dueDate, toDo.title]);

  const handleSave = () => {
    editToDoInProject(projectIndex, toDoIndex, editedToDo);
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`to-do-card ${isDragging ? 'dragging' : ''}`}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedToDo.title}
            onChange={(e) =>
              setEditedToDo({ ...editedToDo, title: e.target.value })
            }
          />
          <textarea
            value={editedToDo.description}
            onChange={(e) =>
              setEditedToDo({ ...editedToDo, description: e.target.value })
            }
          />
          <input
            ref={inputRef}
            name="tags"
            defaultValue={editedToDo.tags}
            onChange={(e) =>
              setEditedToDo({ ...editedToDo, tags: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2 className="to-do-title">{toDo.title}</h2>
          <p className="to-do-due-date">{moment(toDo.dueDate).fromNow()}</p>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              deleteToDo(projectIndex, toDoIndex);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
