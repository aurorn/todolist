import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app-root');
  if (container) {
    createRoot(container).render(
      <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </React.StrictMode>,
    );
  }
});
