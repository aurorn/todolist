import './styles.css';
import { createForm } from './components/form.js';
import { createToDoList } from './components/todoList.js';
import { ToDoFactory } from './models/todoFactory.js';

const toDoList = [];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found!');
    return;
  }

  app.innerHTML = '';

  const form = createForm();
  app.appendChild(form);

  const toDoContainer = document.createElement('div');
  toDoContainer.className = 'to-do-container';
  app.appendChild(toDoContainer);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.elements['title'].value;
    const description = event.target.elements['description'].value;
    const dueDate = event.target.elements['due-date'].value;
    const priority = event.target.elements['priority'].value;

    const newToDo = ToDoFactory(title, description, dueDate, priority);
    toDoList.push(newToDo);

    toDoContainer.innerHTML = '';
    const newToDoList = createToDoList(toDoList);
    toDoContainer.appendChild(newToDoList);

    form.reset();
  });
});
