import { createElement } from '../utils/dom';
import { createToDoCard } from './todoCard';

export function createToDoList(toDoList, projectIndex) {
  const toDoContainer = createElement('div', 'to-do-container');

  toDoList.forEach((toDo, toDoIndex) => {
    const toDoCard = createToDoCard(toDo, projectIndex, toDoIndex);
    toDoContainer.appendChild(toDoCard);
  });

  return toDoContainer;
}
