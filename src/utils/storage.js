export const loadProjects = () => {
  const storedProjects = localStorage.getItem('projects');
  return storedProjects ? JSON.parse(storedProjects) : [];
};

export const saveProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
