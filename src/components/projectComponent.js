import { createElement, appendChildren } from '../utils/dom';
import { createToDoList } from './todoList';

export function createProjectList(project) {
  const projectElement = createElement('div', 'project');
  const projectTitle = createElement('h2', 'project-title', { textContent: project.name });

  appendChildren(projectElement, projectTitle);

  const toDoContainer = createElement('div', 'to-do-container');
  projectElement.appendChild(toDoContainer);
  renderProjectToDos(projectElement, project.todos);

  return projectElement;
}

function renderProjectToDos(projectElement, todos) {
  const toDoContainer = projectElement.querySelector('.to-do-container');
  toDoContainer.innerHTML = '';
  const newToDoList = createToDoList(todos);
  toDoContainer.appendChild(newToDoList);
}
