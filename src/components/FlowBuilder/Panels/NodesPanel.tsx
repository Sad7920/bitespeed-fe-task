import React from 'react';

/**
 * NodesPanel - draggable node palette.
 * - Drag data follows React Flow docs: dataTransfer.setData('application/reactflow', type)
 * - This component is extensible by adding more node cards and types in the future.
 */
const NodesPanel: React.FC = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-56 p-4 bg-gray-50 border-r border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-3">Nodes</h4>

            <div
                className="mb-2 p-2 rounded border border-dashed border-gray-300 bg-white cursor-grab text-gray-700 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, 'text')}
            >
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    Text Message
                </div>
            </div>

            <div
                className="mb-2 p-2 rounded border border-dashed border-gray-300 bg-white cursor-grab text-gray-700 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, 'fileUpload')}
            >
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    File Upload
                </div>
            </div>

            {/* Future node types go here */}
        </aside>
    );
};

export default NodesPanel;
