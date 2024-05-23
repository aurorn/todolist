export function saveProjectsToLocalStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : [];
}
