import React, { useState } from 'react';
import TaskList from './taskList';
import AddTaskModal from './addtaskModal';
import EditTaskModal from './editaskModal';
import { saveProjects } from '../utils/storage';

const MainContent = ({
  project,
  addTask,
  projectIndex,
  projects,
  setProjects,
}) => {
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
    resetTaskForm();
  };

  const handleEditTask = (id) => {
    const taskToEdit = project.todos.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
      setTaskDueDate(taskToEdit.dueDate);
      setTaskPriority(taskToEdit.priority);
      setEditingTask(taskToEdit);
      showModal('edit-to-do-modal');
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
    const updatedTodos = project.todos.map((task) =>
      task.id === editingTask.id ? updatedTask : task,
    );
    updateProjects(updatedTodos);
    resetTaskForm();
    hideModal('edit-to-do-modal');
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = project.todos.filter((task) => task.id !== id);
    updateProjects(updatedTodos);
  };

  const moveCard = (draggedId, hoveredId) => {
    const draggedIndex = project.todos.findIndex(
      (task) => task.id === draggedId,
    );
    const hoveredIndex = project.todos.findIndex(
      (task) => task.id === hoveredId,
    );

    if (draggedIndex !== hoveredIndex) {
      const updatedTodos = [...project.todos];
      const [draggedItem] = updatedTodos.splice(draggedIndex, 1);
      updatedTodos.splice(hoveredIndex, 0, draggedItem);
      updateProjects(updatedTodos);
    }
  };

  const updateProjects = (updatedTodos) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...project,
      todos: updatedTodos,
    };
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const resetTaskForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('low');
    setEditingTask(null);
  };

  const showModal = (modalId) => {
    document.getElementById(modalId).style.display = 'block';
  };

  const hideModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
  };

  return (
    <div id="main-content">
      <div className="project-header">
        <h2>{project.name}</h2>
        <button
          onClick={() => showModal('to-do-modal')}
          className="add-to-do-button"
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={project.todos}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        moveCard={moveCard}
      />

      <AddTaskModal
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskDueDate={taskDueDate}
        setTaskDueDate={setTaskDueDate}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        handleAddTask={handleAddTask}
        hideModal={hideModal}
      />

      <EditTaskModal
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskDueDate={taskDueDate}
        setTaskDueDate={setTaskDueDate}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        handleUpdateTask={handleUpdateTask}
        hideModal={hideModal}
      />
    </div>
  );
};

export default MainContent;
