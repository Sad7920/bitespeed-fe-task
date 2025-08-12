/**
 * File Upload Settings Panel Component
 * 
 * This component provides the settings interface for file upload nodes when they are selected.
 * It allows users to configure various aspects of file upload functionality including
 * label, file types, size limits, and multiple file options.
 * 
 * Features:
 * - Real-time configuration editing with auto-save
 * - Dynamic file type management (add/remove)
 * - File size limit configuration
 * - Multiple file toggle
 * - Live preview of upload configuration
 * - Node deletion functionality
 * - Comprehensive form validation
 * 
 * The component automatically appears when a file upload node is selected and provides
 * a complete interface for customizing the upload behavior.
 */

import React, { useCallback, useState } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import type { AppNode } from '../../../types/flow';

/**
 * File Upload Settings Panel Component
 * 
 * Renders a comprehensive settings panel for editing file upload node properties.
 * This panel appears when a file upload node is selected in the flow canvas.
 * 
 * @returns JSX element representing the file upload settings panel or null if no file upload node is selected
 */
const FileUploadSettingsPanel: React.FC = () => {
    // Get flow state and actions from Zustand store
    const { nodes, selectedNodeId, setNodes, setSelectedNodeId } = useFlowStore();

    // Local state for managing new file type input
    const [newFileType, setNewFileType] = useState('');

    // Find the currently selected node
    const node = nodes.find((n) => n.id === selectedNodeId) as AppNode | undefined;

    // Early return if no node is selected or if it's not a file upload node
    if (!node || node.type !== 'fileUpload') {
        return null;
    }

    // Type-safe access to file upload node data
    const nodeData = node.data as {
        label: string;
        allowedTypes: string[];
        maxSize: number;
        multiple: boolean;
        type: 'fileUpload';
    };

    /**
     * Label Change Handler
     * 
     * Updates the upload label in real-time as the user types.
     * 
     * @param e - The change event from the input field
     */
    const onChangeLabel = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!node) return;
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), label: e.target.value } }
                    : n
            );
            setNodes(newNodes);
        },
        [node, nodes, setNodes]
    );

    /**
     * Max Size Change Handler
     * 
     * Updates the maximum file size limit. Ensures the value is a valid number.
     * 
     * @param e - The change event from the number input
     */
    const onChangeMaxSize = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!node) return;
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), maxSize: parseInt(e.target.value) || 1 } }
                    : n
            );
            setNodes(newNodes);
        },
        [node, nodes, setNodes]
    );

    /**
     * Multiple Files Toggle Handler
     * 
     * Toggles the multiple files option on/off.
     * 
     * @param e - The change event from the checkbox
     */
    const onChangeMultiple = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!node) return;
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), multiple: e.target.checked } }
                    : n
            );
            setNodes(newNodes);
        },
        [node, nodes, setNodes]
    );

    /**
     * Add File Type Handler
     * 
     * Adds a new file type to the allowed types list.
     * Prevents duplicates and validates input.
     */
    const addFileType = useCallback(() => {
        if (!newFileType.trim() || !node) return;

        const currentTypes = [...(nodeData.allowedTypes || [])];
        // Only add if the type doesn't already exist
        if (!currentTypes.includes(newFileType.trim())) {
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), allowedTypes: [...currentTypes, newFileType.trim()] } }
                    : n
            );
            setNodes(newNodes);
        }
        // Clear the input field after adding
        setNewFileType('');
    }, [newFileType, node, nodeData.allowedTypes, nodes, setNodes]);

    /**
     * Remove File Type Handler
     * 
     * Removes a specific file type from the allowed types list.
     * 
     * @param typeToRemove - The file type to remove
     */
    const removeFileType = useCallback(
        (typeToRemove: string) => {
            if (!node) return;
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), allowedTypes: (n.data as any).allowedTypes.filter((t: string) => t !== typeToRemove) } }
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
     */
    const onDeleteNode = useCallback(() => {
        if (!node) return;
        const newNodes = nodes.filter((n) => n.id !== node.id);
        setNodes(newNodes);
        setSelectedNodeId(null);
    }, [node, nodes, setNodes, setSelectedNodeId]);

    return (
        <aside className="flex flex-col h-full w-80 bg-white border-l border-gray-200">
            {/* Panel Header with Title and Delete Button */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                {/* Panel title */}
                <h4 className="font-semibold text-gray-700">File Upload</h4>
                {/* Delete button with red styling for destructive action */}
                <button
                    onClick={onDeleteNode}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                    Delete
                </button>
            </div>

            {/* Form Content Area with Scroll */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Upload Label Configuration */}
                <div className="mb-4">
                    <label className="block text-xs text-gray-600 mb-1">Upload Label</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded text-sm"
                        value={nodeData.label || ''}
                        onChange={onChangeLabel}
                        placeholder="Enter upload label..."
                    />
                </div>

                {/* Maximum File Size Configuration */}
                <div className="mb-4">
                    <label className="block text-xs text-gray-600 mb-1">Max File Size (MB)</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        className="w-full p-2 border rounded text-sm"
                        value={nodeData.maxSize || 1}
                        onChange={onChangeMaxSize}
                    />
                </div>

                {/* Multiple Files Toggle */}
                <div className="mb-4">
                    <label className="flex items-center text-xs text-gray-600">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={nodeData.multiple || false}
                            onChange={onChangeMultiple}
                        />
                        Allow multiple files
                    </label>
                </div>

                {/* Allowed File Types Configuration */}
                <div className="mb-4">
                    <label className="block text-xs text-gray-600 mb-1">Allowed File Types</label>

                    {/* Display Current File Types */}
                    <div className="mb-2">
                        {nodeData.allowedTypes && nodeData.allowedTypes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {nodeData.allowedTypes.map((type: string, index: number) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                                    >
                                        {type}
                                        {/* Remove button for each file type */}
                                        <button
                                            onClick={() => removeFileType(type)}
                                            className="ml-1 text-green-600 hover:text-green-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xs text-gray-500 italic">No restrictions (all files allowed)</div>
                        )}
                    </div>

                    {/* Add New File Type Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded text-sm"
                            value={newFileType}
                            onChange={(e) => setNewFileType(e.target.value)}
                            placeholder="e.g., .pdf, .jpg"
                            onKeyDown={(e) => e.key === 'Enter' && addFileType()}
                        />
                        <button
                            onClick={addFileType}
                            className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Configuration Preview */}
                <div className="mt-6 p-3 bg-gray-50 rounded border">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Preview</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                        <div><strong>Label:</strong> {nodeData.label || 'Upload Files'}</div>
                        <div><strong>Max Size:</strong> {nodeData.maxSize || 1}MB</div>
                        <div><strong>Multiple:</strong> {nodeData.multiple ? 'Yes' : 'No'}</div>
                        <div><strong>Types:</strong> {nodeData.allowedTypes && nodeData.allowedTypes.length > 0 ? nodeData.allowedTypes.join(', ') : 'All files'}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FileUploadSettingsPanel;
