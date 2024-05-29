import React, { useEffect, useCallback, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({
  projects,
  addProject,
  setSelectedProjectIndex,
  deleteProject,
  renameProject,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameProjectIndex, setRenameProjectIndex] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');

  const handleProjectClick = useCallback(
    (index) => {
      setSelectedProjectIndex(index);
    },
    [setSelectedProjectIndex],
  );

  const handleDropdownToggle = (index) => {
    setDropdownVisible((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const addProjectButton = document.getElementById('add-project-button');
    if (addProjectButton) {
      const handleAddProjectClick = () => {
        const projectModal = document.getElementById('project-modal');
        if (projectModal) {
          projectModal.style.display = 'block';
        } else {
          console.error('Project modal not found');
        }
      };

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
    document.getElementById('project-modal').style.display = 'none';
  };

  const handleRenameSubmit = (event) => {
    event.preventDefault();
    renameProject(renameProjectIndex, newProjectName);
    setRenameModalVisible(false);
    setNewProjectName('');
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (renameModalVisible && !event.target.closest('.modal-content')) {
        setRenameModalVisible(false);
      }
    },
    [renameModalVisible],
  );

  useEffect(() => {
    if (renameModalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [renameModalVisible, handleClickOutside]);

  return (
    <div className="sidebar">
      <button id="add-project-button">Add a Project</button>
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} id={`project-${index}`} className="project-item">
            <span
              onClick={() => handleProjectClick(index)}
              className="project-name"
            >
              {project.name}
            </span>
            <div className="project-actions">
              <i className="fas fa-star star-icon"></i>
              <i
                className="fas fa-ellipsis-v dropdown-toggle"
                onClick={() => handleDropdownToggle(index)}
              ></i>
              {dropdownVisible === index && (
                <div className="dropdown-menu">
                  <button onClick={() => deleteProject(index)}>Delete</button>
                  <button
                    onClick={() => {
                      setRenameProjectIndex(index);
                      setRenameModalVisible(true);
                    }}
                  >
                    Rename
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for adding projects */}
      <div id="project-modal" className="modal">
        <div className="modal-content">
          <span
            className="close-button"
            onClick={() =>
              (document.getElementById('project-modal').style.display = 'none')
            }
          >
            &times;
          </span>
          <div className="modal-title">Project Name</div>
          <form id="project-form" onSubmit={handleAddProjectSubmit}>
            <input
              type="text"
              id="project-name"
              name="project-name"
              placeholder="Project Name"
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      {/* Modal for renaming projects */}
      {renameModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setRenameModalVisible(false)}
            >
              &times;
            </span>
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
