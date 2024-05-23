import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { initializeApp } from './modules/appInitialization';

const App = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="app"></div>
    </DndProvider>
  );
};

export default App;
