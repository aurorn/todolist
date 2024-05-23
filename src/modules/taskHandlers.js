import { projects } from './projectManager';
import { saveProjects } from '../utils/storage';

export function deleteToDo(projectIndex, toDoIndex) {
  projects[projectIndex].todos.splice(toDoIndex, 1);
  saveProjects(projects);
}

export function editToDoInProject(projectIndex, toDoIndex, updatedToDo) {
  projects[projectIndex].todos[toDoIndex] = updatedToDo;
  saveProjects(projects);
}

export function moveToDo(fromProjectIndex, fromToDoIndex, toProjectIndex) {
  const [movedToDo] = projects[fromProjectIndex].todos.splice(fromToDoIndex, 1);
  projects[toProjectIndex].todos.push(movedToDo);
  saveProjects(projects);
}
