import React, { useCallback } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import type { AppNode } from '../../../types/flow';

/**
 * SettingsPanel - shows details for the selected node
 * - Allows editing the text for a Text Node
 * - Includes a Save Changes button (top-right)
 */
const SettingsPanel: React.FC = () => {
    const { nodes, selectedNodeId, setNodes, setSelectedNodeId } = useFlowStore();

    const node = nodes.find((n) => n.id === selectedNodeId) as AppNode | undefined;

    const onChangeText = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!node) return;
            const newNodes = nodes.map((n) =>
                n.id === node.id
                    ? { ...n, data: { ...(n.data as any), text: e.target.value } }
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

    if (!node) return null;

    return (
        <aside className="flex flex-col h-full w-80 bg-white border-l border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-700">Message</h4>
                <button
                    onClick={onDeleteNode}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                    Delete
                </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4">
                <label className="block text-xs text-gray-600 mb-1">Text</label>
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
