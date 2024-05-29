import React from 'react';
import { createRoot } from 'react-dom/client';
import ToDoCard from '../components/todoCard';
import { loadProjects, saveProjects } from '../utils/storage';

export const projects = loadProjects();

export function renderProjectToDos(todos, projectIndex) {
  const mainContent = document.getElementById('main-content');
  let toDoContainer = mainContent.querySelector('.to-do-container');

  if (!toDoContainer) {
    toDoContainer = document.createElement('div');
    toDoContainer.className = 'to-do-container';
    mainContent.appendChild(toDoContainer);
  }

  renderToDos(toDoContainer, todos, projectIndex);
}

function renderToDos(container, todos, projectIndex) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {todos.map((toDo, toDoIndex) => (
        <ToDoCard key={toDoIndex} toDo={toDo} projectIndex={projectIndex} toDoIndex={toDoIndex} />
      ))}
    </React.StrictMode>
  );
}

export function renderProjects() {
  const projectList = document.querySelector('.project-list');
  projectList.innerHTML = '';

  projects.forEach((project, index) => {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.name;
    projectItem.addEventListener('click', () => {
      renderProjectContent(index);
    });
    projectList.appendChild(projectItem);
  });
}

export function renderProjectContent(projectIndex) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const project = projects[projectIndex];
  const projectTitle = document.createElement('h2');
  projectTitle.className = 'project-title';
  projectTitle.textContent = project.name;
  mainContent.appendChild(projectTitle);

  const addToDoButton = document.createElement('button');
  addToDoButton.className = 'add-to-do-button';
  addToDoButton.textContent = 'Add Task';
  addToDoButton.addEventListener('click', () => showToDoModal(projectIndex));
  mainContent.appendChild(addToDoButton);

  renderProjectToDos(project.todos, projectIndex);
}

function showToDoModal(projectIndex) {
  const toDoModal = document.getElementById('to-do-modal');
  const projectIndexInput = toDoModal.querySelector('#project-index');
  projectIndexInput.value = projectIndex;
  toDoModal.style.display = 'block';
}
