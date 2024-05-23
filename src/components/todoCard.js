import { createElement, appendChildren } from '../utils/dom';
import { deleteToDo } from '../modules/taskHandlers';

export function createToDoCard(toDo, projectIndex, toDoIndex) {
  const toDoCard = createElement('div', 'to-do-card');
  const title = createElement('h2', 'to-do-title', { textContent: toDo.title });

  const deleteButton = createElement('button', 'delete-button', { textContent: 'Delete' });

  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteToDo(projectIndex, toDoIndex);
  });

  toDoCard.addEventListener('click', () => {
    showToDoDetailsModal(toDo, projectIndex, toDoIndex);
  });

  appendChildren(toDoCard, title, deleteButton);

  return toDoCard;
}

function showToDoDetailsModal(toDo, projectIndex, toDoIndex) {
  const modal = document.getElementById('to-do-details-modal');
  const form = document.getElementById('to-do-details-form');
  const titleInput = document.getElementById('to-do-details-title-input');
  const descriptionInput = document.getElementById('to-do-details-description');
  const dueDateInput = document.getElementById('to-do-details-due-date');
  const priorityInput = document.getElementById('to-do-details-priority');
  const editButton = document.getElementById('edit-button');

  titleInput.value = toDo.title;
  descriptionInput.value = toDo.description;
  dueDateInput.value = toDo.dueDate;
  priorityInput.value = toDo.priority;

  modal.style.display = 'block';
  setFormReadOnly(true);
  editButton.addEventListener('click', () => {
    setFormReadOnly(false);
  });

  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.onsubmit = function(event) {
    event.preventDefault();
    const updatedToDo = {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      priority: priorityInput.value
    };
    editToDoInProject(projectIndex, toDoIndex, updatedToDo);
    modal.style.display = 'none';
  };
}

function setFormReadOnly(isReadOnly) {
  const formElements = document.querySelectorAll('#to-do-details-form input, #to-do-details-form textarea, #to-do-details-form select');
  formElements.forEach(element => {
    element.readOnly = isReadOnly;
    element.disabled = isReadOnly;
  });

  const saveButton = document.querySelector('#to-do-details-form button[type="submit"]');
  saveButton.style.display = isReadOnly ? 'none' : 'block';

  const editButton = document.getElementById('edit-button');
  editButton.style.display = isReadOnly ? 'block' : 'none';
}
