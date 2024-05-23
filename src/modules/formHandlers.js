import { addProject, addToDoToProject, getProjectIndex } from './projectManager';

export function setupProjectFormHandler() {
  const projectForm = document.querySelector('#project-form');

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectName = event.target.elements['project-name'].value;
    addProject({ name: projectName, todos: [] });

    document.getElementById('project-modal').style.display = 'none';
    projectForm.reset();
  });
}

export function setupToDoFormHandler() {
  const toDoForm = document.querySelector('#to-do-form');

  toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.elements['to-do-title'].value;
    const description = event.target.elements['to-do-description'].value;
    const dueDate = event.target.elements['to-do-due-date'].value;
    const priority = event.target.elements['to-do-priority'].value;

    const newToDo = { title, description, dueDate, priority };

    addToDoToProject(getProjectIndex(), newToDo);

    document.getElementById('to-do-modal').style.display = 'none';
    toDoForm.reset();
  });
}
