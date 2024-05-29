import React from 'react';

const EditTaskModal = ({
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskDueDate,
  setTaskDueDate,
  taskPriority,
  setTaskPriority,
  handleUpdateTask,
  hideModal,
}) => (
  <div id="edit-to-do-modal" className="modal">
    <div className="modal-content">
      <span
        className="close-button"
        onClick={() => hideModal('edit-to-do-modal')}
      >
        &times;
      </span>
      <div className="modal-title">Edit Task</div>
      <form id="edit-to-do-form" onSubmit={handleUpdateTask}>
        <input
          type="text"
          id="edit-to-do-title"
          name="edit-to-do-title"
          placeholder="Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <textarea
          id="edit-to-do-description"
          name="edit-to-do-description"
          placeholder="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <input
          type="date"
          id="edit-to-do-due-date"
          name="edit-to-do-due-date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          required
        />
        <select
          id="edit-to-do-priority"
          name="edit-to-do-priority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
);

export default EditTaskModal;
