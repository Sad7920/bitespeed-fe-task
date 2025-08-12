/**
 * Settings Panel Component
 * 
 * This component provides the settings interface for text nodes when they are selected.
 * It allows users to edit the text content of text message nodes and provides
 * functionality to delete nodes.
 * 
 * Features:
 * - Real-time text editing with auto-save
 * - Node deletion functionality
 * - Clean, intuitive interface
 * - Responsive design that adapts to the selected node
 * 
 * The component automatically appears when a text node is selected and disappears
 * when no node is selected or when a different node type is selected.
 */

import React, { useCallback } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import type { AppNode } from '../../../types/flow';

/**
 * Settings Panel Component
 * 
 * Renders a settings panel for editing text node properties.
 * This panel appears when a text node is selected in the flow canvas.
 * 
 * @returns JSX element representing the settings panel or null if no node is selected
 */
const SettingsPanel: React.FC = () => {
    // Get flow state and actions from Zustand store
    const { nodes, selectedNodeId, setNodes, setSelectedNodeId } = useFlowStore();

    // Find the currently selected node
    const node = nodes.find((n) => n.id === selectedNodeId) as AppNode | undefined;

    /**
     * Text Change Handler
     * 
     * Updates the text content of the selected node in real-time.
     * This provides immediate feedback as the user types.
     * 
     * @param e - The change event from the textarea
     */
    const onChangeText = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!node) return;

            // Update the node's text data while preserving other properties
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), text: e.target.value } }
                    : n
            );
            setNodes(newNodes);
        },
        [node, nodes, setNodes]
    );

    /**
     * Delete Node Handler
     * 
     * Removes the selected node from the flow and clears the selection.
     * This provides a way to delete nodes that are no longer needed.
     */
    const onDeleteNode = useCallback(() => {
        if (!node) return;

        // Filter out the selected node from the nodes array
        const newNodes = nodes.filter((n) => n.id !== node.id);
        setNodes(newNodes);
        // Clear the selection since the node no longer exists
        setSelectedNodeId(null);
    }, [node, nodes, setNodes, setSelectedNodeId]);

    // Don't render anything if no node is selected
    if (!node) return null;

    return (
        <aside className="flex flex-col h-full w-80 bg-white border-l border-gray-200">
            {/* Panel Header with Title and Delete Button */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                {/* Panel title */}
                <h4 className="font-semibold text-gray-700">Message</h4>
                {/* Delete button with red styling for destructive action */}
                <button
                    onClick={onDeleteNode}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                    Delete
                </button>
            </div>

            {/* Form Content Area */}
            <div className="flex-1 p-4">
                {/* Text input label */}
                <label className="block text-xs text-gray-600 mb-1">Text</label>
                {/* Textarea for editing node text */}
                <textarea
                    className="w-full p-2 border rounded text-sm resize-none"
                    rows={4}
                    value={(node.data as any).text || ''}
                    onChange={onChangeText}
                    placeholder="Enter node text..."
                />
            </div>
        </aside>
    );
};

export default SettingsPanel;
