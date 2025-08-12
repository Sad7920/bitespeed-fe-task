import {create} from 'zustand';
import type { AppNode, AppEdge } from '../types/flow';

// minimal store for selected node id, nodes, edges
type FlowState = {
  nodes: AppNode[];
  edges: AppEdge[];
  selectedNodeId: string | null;
  setNodes: (n: AppNode[]) => void;
  setEdges: (e: AppEdge[]) => void;
  setSelectedNodeId: (id: string | null) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [
    {
      id: 'text-1',
      type: 'text',
      position: { x: 400, y: 200 },
      data: { text: 'Hello World', type: 'text' },
    },
  ],
  edges: [],
  selectedNodeId: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
}));
