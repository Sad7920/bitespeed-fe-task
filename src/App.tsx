import FlowCanvas from './components/FlowBuilder/FlowCanvas';
import SaveButton from './components/FlowBuilder/Toolbar/SaveButton';
import { ReactFlowProvider } from '@xyflow/react';

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="px-6 py-4 border-b bg-white flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">BiteSpeed — Chatbot Flow Builder</h1>
          <SaveButton />
        </header>

        <main className="flex h-[calc(100vh-80px)] w-full">
          <FlowCanvas />
        </main>
      </div>
    </ReactFlowProvider>
  );
}
