import React, { useCallback, useState } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import type { AppNode } from '../../../types/flow';

/**
 * FileUploadSettingsPanel - shows details for the selected file upload node
 * - Allows editing the file upload configuration
 * - Includes a Save Changes button
 */
const FileUploadSettingsPanel: React.FC = () => {
    const { nodes, selectedNodeId, setNodes, setSelectedNodeId } = useFlowStore();
    const [newFileType, setNewFileType] = useState('');

    const node = nodes.find((n) => n.id === selectedNodeId) as AppNode | undefined;

    // Check if this is a file upload node
    if (!node || node.type !== 'fileUpload') {
        return null;
    }

    const nodeData = node.data as {
        label: string;
        allowedTypes: string[];
        maxSize: number;
        multiple: boolean;
        type: 'fileUpload';
    };

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

    const addFileType = useCallback(() => {
        if (!newFileType.trim() || !node) return;

        const currentTypes = [...(nodeData.allowedTypes || [])];
        if (!currentTypes.includes(newFileType.trim())) {
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), allowedTypes: [...currentTypes, newFileType.trim()] } }
                    : n
            );
            setNodes(newNodes);
        }
        setNewFileType('');
    }, [newFileType, node, nodeData.allowedTypes, nodes, setNodes]);

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

    const onDeleteNode = useCallback(() => {
        if (!node) return;
        const newNodes = nodes.filter((n) => n.id !== node.id);
        setNodes(newNodes);
        setSelectedNodeId(null);
    }, [node, nodes, setNodes, setSelectedNodeId]);

    return (
        <aside className="flex flex-col h-full w-80 bg-white border-l border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-700">File Upload</h4>
                <button
                    onClick={onDeleteNode}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                    Delete
                </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Label */}
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

                {/* Max File Size */}
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

                {/* Multiple Files */}
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

                {/* Allowed File Types */}
                <div className="mb-4">
                    <label className="block text-xs text-gray-600 mb-1">Allowed File Types</label>

                    {/* Current types */}
                    <div className="mb-2">
                        {nodeData.allowedTypes && nodeData.allowedTypes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {nodeData.allowedTypes.map((type: string, index: number) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                                    >
                                        {type}
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

                    {/* Add new type */}
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

                {/* Preview */}
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
