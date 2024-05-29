export function setupProjectModal() {
  const projectModal = document.createElement('div');
  projectModal.id = 'project-modal';
  projectModal.className = 'modal';
  projectModal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="modal-title">Project Name</div>
      <form id="project-form">
        <input type="text" id="project-name" name="project-name" placeholder="Project Name" required>
        <button type="submit">Add</button>
      </form>
    </div>
  `;
  document.body.appendChild(projectModal);

  const closeButton = projectModal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      projectModal.style.display = 'none';
    }
  });

  const projectForm = projectModal.querySelector('#project-form');
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectName = event.target['project-name'].value;
    const project = { name: projectName, todos: [] };
    addProject(project);
    projectModal.style.display = 'none';
  });
}



export function setupToDoModal() {
  const toDoModal = document.createElement('div');
  toDoModal.id = 'to-do-modal';
  toDoModal.className = 'modal';
  toDoModal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="modal-title">New To-Do</div>
      <form id="to-do-form">
        <input type="text" id="to-do-title" name="to-do-title" placeholder="Title (max 50 characters)" maxlength="50" required>
        <textarea id="to-do-description" name="to-do-description" placeholder="Description (max 300 characters)" maxlength="300" required></textarea>
        <input type="date" id="to-do-due-date" name="to-do-due-date">
        <select id="to-do-priority" name="to-do-priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="hidden" id="project-index" name="project-index">
        <button type="submit">Add</button>
      </form>
    </div>
  `;
  document.body.appendChild(toDoModal);

  const closeButton = toDoModal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    toDoModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === toDoModal) {
      toDoModal.style.display = 'none';
    }
  });
}
export function setupModalCloseEvents() {
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close-button');

  closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      modals[index].style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}
