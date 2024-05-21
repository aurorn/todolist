import { createElement, appendChildren } from '../utils/dom.js';

export function createToDoList(toDoList) {
  const toDoContainer = createElement('div', 'to-do-container');

  toDoList.forEach(toDo => {
    const toDoCard = createElement('div', 'to-do-card');

    const title = createElement('h3', 'to-do-title', { textContent: toDo.title });
    const description = createElement('p', 'to-do-description', { textContent: toDo.description });
    const dueDate = createElement('p', 'to-do-due-date', { textContent: `Due: ${toDo.dueDate}` });
    const priority = createElement('p', 'to-do-priority', { textContent: `Priority: ${toDo.priority}` });

    appendChildren(toDoCard, title, description, dueDate, priority);
    toDoContainer.appendChild(toDoCard);
  });

  return toDoContainer;
}
