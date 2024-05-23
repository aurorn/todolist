import { createElement, appendChildren } from '../utils/dom';
import { createToDoCard } from '../components/todoCard';
import { showToDoModal } from './modals';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from '../utils/storage';

export const projects = loadProjectsFromLocalStorage();
let projectIndex;

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

export function renderProjectContent(index) {
  projectIndex = index;
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const project = projects[projectIndex];

  const projectHeader = createElement('div', 'project-header');
  const projectTitle = createElement('h2', 'project-title', { textContent: project.name });

  const addToDoButton = createElement('button', 'add-to-do-button', { textContent: 'Add Task' });
  addToDoButton.addEventListener('click', showToDoModal);

  appendChildren(projectHeader, projectTitle, addToDoButton);
  mainContent.appendChild(projectHeader);

  const toDoContainer = createElement('div', 'to-do-container');
  mainContent.appendChild(toDoContainer);
  renderProjectToDos(toDoContainer, project.todos);
}

function renderProjectToDos(container, todos) {
  container.innerHTML = '';
  todos.forEach((toDo, index) => {
    const toDoCard = createToDoCard(toDo, projectIndex, index);
    container.appendChild(toDoCard);
  });
}

export function getProjectIndex() {
  return projectIndex;
}

export function setProjectIndex(index) {
  projectIndex = index;
}

export function addProject(project) {
  projects.push(project);
  saveProjectsToLocalStorage(projects);
  renderProjects();
}

export function addToDoToProject(projectIndex, toDo) {
  projects[projectIndex].todos.push(toDo);
  saveProjectsToLocalStorage(projects);
  renderProjectContent(projectIndex);
}

export function updateToDoInProject(projectIndex, toDoIndex, toDo) {
  projects[projectIndex].todos[toDoIndex] = toDo;
  saveProjectsToLocalStorage(projects);
  renderProjectContent(projectIndex);
}

export function removeToDoFromProject(projectIndex, toDoIndex) {
  projects[projectIndex].todos.splice(toDoIndex, 1);
  saveProjectsToLocalStorage(projects);
  renderProjectContent(projectIndex);
}
