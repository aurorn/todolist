import { createSidebar, createMainContent } from './layout';
import { setupProjectModal, setupToDoModal, setupModalCloseEvents } from './modals';
import { setupProjectFormHandler, setupToDoFormHandler } from './formHandlers';
import { renderProjects } from './projectManager';

export function initializeApp() {
  const app = document.getElementById('app');
  const sidebar = createSidebar();
  app.appendChild(sidebar);
  const mainContent = createMainContent();
  app.appendChild(mainContent);

  setupProjectModal();
  setupToDoModal();
  setupToDoDetailsModal();
  setupModalCloseEvents();
  setupProjectFormHandler();
  setupToDoFormHandler();
  renderProjects();
}

function setupToDoDetailsModal() {
  const toDoDetailsModal = document.createElement('div');
  toDoDetailsModal.id = 'to-do-details-modal';
  toDoDetailsModal.className = 'modal';
  toDoDetailsModal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <form id="to-do-details-form">
        <h2 id="to-do-details-title">Edit To-Do</h2>
        <label for="to-do-details-title-input">Title:</label>
        <input type="text" id="to-do-details-title-input" name="title" required>
        <label for="to-do-details-description">Description:</label>
        <textarea id="to-do-details-description" name="description" required></textarea>
        <label for="to-do-details-due-date">Due Date:</label>
        <input type="date" id="to-do-details-due-date" name="dueDate" required>
        <label for="to-do-details-priority">Priority:</label>
        <select id="to-do-details-priority" name="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" id="edit-button">Edit</button>
      </form>
    </div>
  `;
  document.body.appendChild(toDoDetailsModal);
}
