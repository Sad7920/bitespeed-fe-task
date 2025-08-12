import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AppNode } from '../../../types/flow';

// FileUploadNode component for handling file uploads in the flow
const FileUploadNode = ({ data, isConnectable }: NodeProps<AppNode>) => {
    // destructure for clarity - cast to FileUploadNodeData since we know this is a file upload node
    const { label, allowedTypes, maxSize, multiple } = data as {
        label: string;
        allowedTypes: string[];
        maxSize: number;
        multiple: boolean;
        type: 'fileUpload';
    };

    // Format allowed types for display
    const formatAllowedTypes = (types: string[]) => {
        if (types.length === 0) return 'All files';
        return types.map(type => type.toUpperCase()).join(', ');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border-2 border-green-300 p-3 w-64">
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
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div className="font-semibold text-green-700">File Upload</div>
                </div>

                {/* Upload Details */}
                <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Label:</span> {label || 'Upload Files'}
                    </div>
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Types:</span> {formatAllowedTypes(allowedTypes)}
                    </div>
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Max Size:</span> {maxSize}MB
                    </div>
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Multiple:</span> {multiple ? 'Yes' : 'No'}
                    </div>
                </div>

                {/* Upload Area Preview */}
                <div className="mt-2 p-2 bg-gray-50 rounded border border-dashed border-gray-300">
                    <div className="text-xs text-gray-500 text-center">
                        {label || 'Click to upload files'}
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

export default memo(FileUploadNode);
