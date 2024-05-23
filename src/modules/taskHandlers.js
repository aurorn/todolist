import { projects, updateToDoInProject, removeToDoFromProject } from './projectManager';

export function editToDoInProject(projectIndex, toDoIndex, updatedToDo) {
  projects[projectIndex].todos[toDoIndex] = updatedToDo;
  updateToDoInProject(projectIndex, toDoIndex, updatedToDo);
}

export function deleteToDo(projectIndex, toDoIndex) {
  removeToDoFromProject(projectIndex, toDoIndex);
}
