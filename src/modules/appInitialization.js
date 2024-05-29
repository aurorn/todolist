import { renderProjects, projects } from './projectManager';
import { setupProjectModal, setupToDoModal, setupModalCloseEvents } from './modals';
import { setupProjectFormHandler, setupToDoFormHandler } from './formHandlers';

export function initializeApp() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const sidebar = createSidebar();
  app.appendChild(sidebar);
  const mainContent = createMainContent();
  app.appendChild(mainContent);
  setupProjectModal();
  setupToDoModal();
  setupModalCloseEvents();
  setupProjectFormHandler();
  setupToDoFormHandler();
  renderProjects();
}

function createSidebar() {
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

function createMainContent() {
  const mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  return mainContent;
}