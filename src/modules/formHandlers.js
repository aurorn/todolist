import { renderProjects, renderProjectContent, projects } from './projectManager';
import { saveProjects } from '../utils/storage';

export function setupProjectFormHandler() {
  const projectForm = document.getElementById('project-form');

  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = e.target.elements['project-name'].value;
    projects.push({ name: projectName, todos: [] });
    saveProjects(projects);
    renderProjects();
    projectForm.reset();
    document.getElementById('project-modal').style.display = 'none';
  });
}

export function setupToDoFormHandler() {
  const toDoForm = document.getElementById('to-do-form');

  toDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements['to-do-title'].value;
    const description = e.target.elements['to-do-description'].value;
    const dueDate = e.target.elements['to-do-due-date'].value;
    const priority = e.target.elements['to-do-priority'].value;
    const projectIndex = parseInt(e.target.elements['project-index'].value, 10);


    if (Number.isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {

      return;
    }

    const newToDo = { title, description, dueDate, priority };
    projects[projectIndex].todos.push(newToDo);
    saveProjects(projects);
    renderProjectContent(projectIndex);
    toDoForm.reset();
    document.getElementById('to-do-modal').style.display = 'none';
  });
}
