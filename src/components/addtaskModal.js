import React from 'react';

const AddTaskModal = ({
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskDueDate,
  setTaskDueDate,
  taskPriority,
  setTaskPriority,
  handleAddTask,
  hideModal,
}) => (
  <div id="to-do-modal" className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={() => hideModal('to-do-modal')}>
        &times;
      </span>
      <div className="modal-title">New Task</div>
      <form id="to-do-form" onSubmit={handleAddTask}>
        <input
          type="text"
          id="to-do-title"
          name="to-do-title"
          placeholder="Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <textarea
          id="to-do-description"
          name="to-do-description"
          placeholder="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <input
          type="date"
          id="to-do-due-date"
          name="to-do-due-date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          required
        />
        <select
          id="to-do-priority"
          name="to-do-priority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
);

export default AddTaskModal;
