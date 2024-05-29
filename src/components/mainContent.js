import React, { useState } from 'react';
import TaskList from './taskList';
import { saveProjects } from '../utils/storage';

const MainContent = ({ project, addTask, projectIndex, projects, setProjects }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
    };
    addTask(projectIndex, newTask);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('low');
  };

  const handleEditTask = (id) => {
    const taskToEdit = project.todos.find(task => task.id === id);
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
      setTaskDueDate(taskToEdit.dueDate);
      setTaskPriority(taskToEdit.priority);
      setEditingTask(taskToEdit);
      document.getElementById('edit-to-do-modal').style.display = 'block';
    }
  };

  const handleUpdateTask = (event) => {
    event.preventDefault();
    const updatedTask = {
      ...editingTask,
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
    };
    const updatedTodos = project.todos.map(task =>
      task.id === editingTask.id ? updatedTask : task
    );
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...project,
      todos: updatedTodos
    };
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('low');
    document.getElementById('edit-to-do-modal').style.display = 'none';
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = project.todos.filter(task => task.id !== id);
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...project,
      todos: updatedTodos
    };
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const moveCard = (draggedId, hoveredId) => {
    const draggedIndex = project.todos.findIndex(task => task.id === draggedId);
    const hoveredIndex = project.todos.findIndex(task => task.id === hoveredId);

    if (draggedIndex === hoveredIndex) {
      return;
    }

    const updatedTodos = [...project.todos];
    const [draggedItem] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(hoveredIndex, 0, draggedItem);

    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...project,
      todos: updatedTodos
    };
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  return (
    <div id="main-content">
      <div className="project-header">
        <h2>{project.name}</h2>
        <button onClick={() => document.getElementById('to-do-modal').style.display = 'block'} className="add-to-do-button">Add Task</button>
      </div>
      <TaskList
        tasks={project.todos}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        moveCard={moveCard}
      />

      {/* Modal for adding tasks */}
      <div id="to-do-modal" className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={() => document.getElementById('to-do-modal').style.display = 'none'}>&times;</span>
          <div className="modal-title">New Task</div>
          <form id="to-do-form" onSubmit={handleAddTask}>
            <input type="text" id="to-do-title" name="to-do-title" placeholder="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
            <textarea id="to-do-description" name="to-do-description" placeholder="Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required></textarea>
            <input type="date" id="to-do-due-date" name="to-do-due-date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} required />
            <select id="to-do-priority" name="to-do-priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      {/* Modal for editing tasks */}
      <div id="edit-to-do-modal" className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={() => document.getElementById('edit-to-do-modal').style.display = 'none'}>&times;</span>
          <div className="modal-title">Edit Task</div>
          <form id="edit-to-do-form" onSubmit={handleUpdateTask}>
            <input type="text" id="edit-to-do-title" name="edit-to-do-title" placeholder="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
            <textarea id="edit-to-do-description" name="edit-to-do-description" placeholder="Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required></textarea>
            <input type="date" id="edit-to-do-due-date" name="edit-to-do-due-date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} required />
            <select id="edit-to-do-priority" name="edit-to-do-priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
