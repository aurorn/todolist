import { createElement, appendChildren } from '../utils/dom';

export function createForm() {
  const form = createElement('form', 'add-to-do-form');
  const titleInput = createElement('input', null, {
    type: 'text',
    name: 'title',
    placeholder: 'Title',
    required: true,
  });
  const descriptionInput = createElement('input', null, {
    type: 'text',
    name: 'description',
    placeholder: 'Description',
    required: true,
  });
  const dueDateInput = createElement('input', null, {
    type: 'date',
    name: 'due-date',
    required: true,
  });
  const prioritySelect = createElement('select', null, { name: 'priority' });

  const priorities = ['low', 'medium', 'high'];
  priorities.forEach((priority) => {
    const option = createElement('option', null, {
      value: priority,
      textContent: priority.charAt(0).toUpperCase() + priority.slice(1),
    });
    prioritySelect.appendChild(option);
  });

  const submitButton = createElement('button', null, {
    type: 'submit',
    textContent: 'Add To-Do',
  });

  appendChildren(
    form,
    titleInput,
    descriptionInput,
    dueDateInput,
    prioritySelect,
    submitButton,
  );

  return form;
}
