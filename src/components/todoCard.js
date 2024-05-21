import { createElement, appendChildren } from '../utils/dom.js';

export function createToDoCard(toDo) {
  const toDoCard = createElement('div', 'to-do-card');
  const title = createElement('h2', 'to-do-title', { textContent: toDo.title });
  const description = createElement('p', 'to-do-description', { textContent: toDo.description });
  const dueDate = createElement('p', 'to-do-due-date', { textContent: `Due: ${toDo.dueDate}` });
  const priority = createElement('p', 'to-do-priority', { textContent: `Priority: ${toDo.priority}` });

  appendChildren(toDoCard, title, description, dueDate, priority);
  return toDoCard;
}
