import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AppNode } from '../../../types/flow';

// NodeProps expects the concrete Node type (or the AppNode union)
const TextNode = ({ data, isConnectable }: NodeProps<AppNode>) => {
    // destructure for clarity - cast to TextNodeData since we know this is a text node
    const { text } = data as { text: string; type: 'text' };


    return (
        <div className="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-3 w-64">
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                style={{ background: '#9CA3AF' }}
                isConnectable={isConnectable}
            />

            <div className="text-sm text-gray-800">
                {/* Node Header */}
                <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div className="font-semibold text-blue-700">Text Message</div>
                </div>

                {/* Message Content */}
                <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Message:</span>
                    </div>
                </div>

                {/* Message Preview */}
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                    <div className="text-xs text-gray-700">
                        {text || 'Empty message'}
                    </div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                id="right"
                style={{ background: '#3B82F6' }}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default memo(TextNode);
