import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/sidebar';
import MainContent from './components/mainContent';
import { loadProjects, saveProjects } from './utils/storage';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    const storedProjects = loadProjects();
    setProjects(storedProjects);
  }, []);

  const addTask = (projectIndex, task) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].todos.push(task);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const deleteProject = (projectIndex) => {
    const updatedProjects = projects.filter(
      (_, index) => index !== projectIndex,
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    if (selectedProjectIndex >= projectIndex && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  };

  const renameProject = (index, newName) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, name: newName } : project,
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Sidebar
          projects={projects}
          addProject={addProject}
          setSelectedProjectIndex={setSelectedProjectIndex}
          deleteProject={deleteProject}
          renameProject={renameProject}
        />
        {projects[selectedProjectIndex] && (
          <MainContent
            project={projects[selectedProjectIndex]}
            addTask={addTask}
            projectIndex={selectedProjectIndex}
            projects={projects}
            setProjects={setProjects}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;
