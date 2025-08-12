/**
 * Main Application Entry Point
 * 
 * This is the entry point for the BiteSpeed Chatbot Flow Builder application.
 * It initializes the React application and renders the root App component
 * within React's StrictMode for better development experience.
 * 
 * The application uses Vite as the build tool and React 18+ features
 * including the new createRoot API for concurrent rendering.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Create the root container and render the application
// Using React 18's createRoot API for better performance and concurrent features
createRoot(document.getElementById('root')!).render(
  // StrictMode helps identify potential problems during development
  // It double-invokes functions to detect side effects and warns about deprecated APIs
  <StrictMode>
    <App />
  </StrictMode>,
)
