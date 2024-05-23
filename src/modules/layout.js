export function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const addProjectButton = document.createElement('button');
  addProjectButton.id = 'add-project-button';
  addProjectButton.textContent = 'Add a Project';
  sidebar.appendChild(addProjectButton);

  const projectList = document.createElement('ul');
  projectList.className = 'project-list';
  sidebar.appendChild(projectList);

  return sidebar;
}

export function createMainContent() {
  const mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  return mainContent;
}
