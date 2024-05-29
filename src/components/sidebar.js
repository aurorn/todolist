import React, { useEffect, useCallback, useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ projects, addProject, setSelectedProjectIndex, deleteProject, renameProject }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameProjectIndex, setRenameProjectIndex] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');

  const renameModalRef = useRef(null);
  const addProjectModalRef = useRef(null);

  const handleProjectClick = useCallback((index) => {
    setSelectedProjectIndex(index);
  }, [setSelectedProjectIndex]);

  const handleClickOutside = (event) => {
    if (renameModalVisible && renameModalRef.current && !renameModalRef.current.contains(event.target)) {
      setRenameModalVisible(false);
    }
    if (addProjectModalRef.current && addProjectModalRef.current.style.display === 'block' && !addProjectModalRef.current.contains(event.target)) {
      addProjectModalRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [renameModalVisible]);

  const handleAddProjectClick = () => {
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
      projectModal.style.display = 'block';
    } else {
      console.error('Project modal not found');
    }
  };

  useEffect(() => {
    const addProjectButton = document.getElementById('add-project-button');
    if (addProjectButton) {
      addProjectButton.addEventListener('click', handleAddProjectClick);

      return () => {
        addProjectButton.removeEventListener('click', handleAddProjectClick);
      };
    } else {
      console.error('Add Project button not found');
    }
  }, []);

  useEffect(() => {
    const projectListItems = document.querySelectorAll('.project-list li');
    projectListItems.forEach((item, index) => {
      const handleClick = () => handleProjectClick(index);
      item.addEventListener('click', handleClick);

      return () => {
        item.removeEventListener('click', handleClick);
      };
    });
  }, [projects, handleProjectClick]);

  const handleAddProjectSubmit = (event) => {
    event.preventDefault();
    const projectName = event.target['project-name'].value;
    const newProject = { name: projectName, todos: [] };
    addProject(newProject);
    addProjectModalRef.current.style.display = 'none';
  };

  const handleRenameSubmit = (event) => {
    event.preventDefault();
    if (renameProjectIndex !== null) {
      renameProject(renameProjectIndex, newProjectName);
      setRenameModalVisible(false);
      setNewProjectName('');
    } else {
      console.error('No project index set for renaming');
    }
  };

  const openRenameModal = (index) => {
    setRenameProjectIndex(index);
    setRenameModalVisible(true);
    setNewProjectName(projects[index].name); // Pre-fill the input with the current project name
  };

  return (
    <div className="sidebar">
      <button id="add-project-button">Add a Project</button>
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} id={`project-${index}`} className="project-item">
            <span onClick={() => handleProjectClick(index)} className="project-name">{project.name}</span>
            <div className="project-actions">
              <i className="fas fa-star star-icon"></i>
              <i className="fas fa-ellipsis-v dropdown-toggle"></i>
              <div className="dropdown-menu">
                <button onClick={() => deleteProject(index)}>Delete</button>
                <button onClick={() => openRenameModal(index)}>Rename</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for adding projects */}
      <div id="project-modal" className="modal" ref={addProjectModalRef}>
        <div className="modal-content">
          <span className="close-button" onClick={() => addProjectModalRef.current.style.display = 'none'}>&times;</span>
          <div className="modal-title">Project Name</div>
          <form id="project-form" onSubmit={handleAddProjectSubmit}>
            <input type="text" id="project-name" name="project-name" placeholder="Project Name" required />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      {/* Modal for renaming projects */}
      {renameModalVisible && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content" ref={renameModalRef}>
            <span className="close-button" onClick={() => setRenameModalVisible(false)}>&times;</span>
            <div className="modal-title">Rename Project</div>
            <form onSubmit={handleRenameSubmit}>
              <input
                type="text"
                placeholder="New Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
              />
              <button type="submit">Rename</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
