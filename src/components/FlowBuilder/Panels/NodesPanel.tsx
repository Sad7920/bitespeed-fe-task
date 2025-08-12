/**
 * Nodes Panel Component
 * 
 * This component provides a draggable palette of available node types that users
 * can drag onto the flow canvas. It serves as the source for creating new nodes
 * in the flow builder.
 * 
 * Features:
 * - Draggable node cards with visual icons
 * - Hover effects for better user experience
 * - Extensible design for adding new node types
 * - Consistent styling with the overall application theme
 * 
 * The component follows React Flow's drag and drop conventions for seamless
 * integration with the canvas.
 */

import React from 'react';

/**
 * Nodes Panel Component
 * 
 * Renders a sidebar panel containing draggable node types that can be
 * dragged onto the flow canvas to create new nodes.
 * 
 * @returns JSX element representing the nodes panel
 */
const NodesPanel: React.FC = () => {
    /**
     * Drag Start Event Handler
     * 
     * Sets up the drag data when a node type is dragged from the panel.
     * This follows React Flow's drag and drop conventions.
     * 
     * @param event - The drag start event
     * @param nodeType - The type of node being dragged ('text', 'fileUpload', etc.)
     */
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        // Set the drag data to the node type for React Flow to recognize
        event.dataTransfer.setData('application/reactflow', nodeType);
        // Set the allowed effect to 'move' for visual feedback
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-56 p-4 bg-gray-50 border-r border-gray-200">
            {/* Panel Header */}
            <h4 className="font-semibold text-gray-700 mb-3">Nodes</h4>

            {/* Text Message Node Card */}
            <div
                className="mb-2 p-2 rounded border border-dashed border-gray-300 bg-white cursor-grab text-gray-700 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, 'text')}
            >
                <div className="flex items-center">
                    {/* Chat bubble icon for text messages */}
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    {/* Node type label */}
                    Text Message
                </div>
            </div>

            {/* File Upload Node Card */}
            <div
                className="mb-2 p-2 rounded border border-dashed border-gray-300 bg-white cursor-grab text-gray-700 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, 'fileUpload')}
            >
                <div className="flex items-center">
                    {/* Cloud upload icon for file uploads */}
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    {/* Node type label */}
                    File Upload
                </div>
            </div>

            {/* Future node types will be added here */}
            {/* Example structure for new node types:
            <div
                className="mb-2 p-2 rounded border border-dashed border-gray-300 bg-white cursor-grab text-gray-700 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, 'newNodeType')}
            >
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-[color]-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-[color]-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="[path]" />
                        </svg>
                    </div>
                    New Node Type
                </div>
            </div>
            */}
        </aside>
    );
};

export default NodesPanel;
