/**
 * Flow State Management Hook
 * 
 * This module provides a centralized state management solution using Zustand
 * for the BiteSpeed Chatbot Flow Builder application. It manages the core
 * flow data including nodes, edges, and selected node state.
 * 
 * The store is designed to be minimal and efficient, providing only the
 * essential state and actions needed for the flow builder functionality.
 */

import {create} from 'zustand';
import type { AppNode, AppEdge } from '../types/flow';

/**
 * Flow State Interface
 * 
 * Defines the structure of the global flow state managed by Zustand.
 * This includes the core data (nodes, edges) and the UI state (selected node).
 */
type FlowState = {
  /** Array of all nodes in the flow */
  nodes: AppNode[];
  /** Array of all edges connecting nodes in the flow */
  edges: AppEdge[];
  /** ID of the currently selected node, null if no node is selected */
  selectedNodeId: string | null;
  /** Action to update the nodes array */
  setNodes: (n: AppNode[]) => void;
  /** Action to update the edges array */
  setEdges: (e: AppEdge[]) => void;
  /** Action to update the selected node ID */
  setSelectedNodeId: (id: string | null) => void;
};

/**
 * Zustand Store Instance
 * 
 * Creates and exports the global flow state store with initial data.
 * The store provides a simple API for managing flow state across the application.
 */
export const useFlowStore = create<FlowState>((set) => ({
  // Initial nodes array with a default text node for demonstration
  nodes: [
    {
      id: 'text-1',
      type: 'text',
      position: { x: 400, y: 200 }, // Centered position on canvas
      data: { text: 'Hello World', type: 'text' },
    },
  ],
  // Initial edges array (empty on startup)
  edges: [],
  // Initial selected node state (no node selected)
  selectedNodeId: null,
  
  // State update actions
  /** Updates the nodes array with new nodes */
  setNodes: (nodes) => set({ nodes }),
  /** Updates the edges array with new edges */
  setEdges: (edges) => set({ edges }),
  /** Updates the selected node ID */
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
}));
