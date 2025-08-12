/**
 * Main Application Component
 * 
 * This is the root component of the BiteSpeed Chatbot Flow Builder application.
 * It provides the overall layout structure including the header with the save button
 * and the main canvas area where the flow builder operates.
 * 
 * The component is wrapped in ReactFlowProvider to provide React Flow context
 * to all child components that need access to the flow state and methods.
 */

import FlowCanvas from './components/FlowBuilder/FlowCanvas';
import SaveButton from './components/FlowBuilder/Toolbar/SaveButton';
import { ReactFlowProvider } from '@xyflow/react';

export default function App() {
  return (
    // ReactFlowProvider provides the necessary context for React Flow components
    // This enables features like drag and drop, node selection, and flow state management
    <ReactFlowProvider>
      {/* Main application container with full height and gray background */}
      <div className="min-h-screen bg-gray-100">
        {/* Application header containing title and save functionality */}
        <header className="px-6 py-4 border-b bg-white flex justify-between items-center">
          {/* Application title */}
          <h1 className="text-lg font-semibold text-gray-800">BiteSpeed — Chatbot Flow Builder</h1>
          {/* Save button component for validating and saving the flow */}
          <SaveButton />
        </header>

        {/* Main content area containing the flow builder canvas */}
        {/* Height calculation: 100vh - 80px (header height) to ensure full viewport usage */}
        <main className="flex h-[calc(100vh-80px)] w-full">
          {/* FlowCanvas component contains the main flow builder interface */}
          <FlowCanvas />
        </main>
      </div>
    </ReactFlowProvider>
  );
}
