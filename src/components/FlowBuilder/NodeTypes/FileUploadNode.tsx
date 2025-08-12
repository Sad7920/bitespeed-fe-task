/**
 * File Upload Node Component
 * 
 * This component represents a file upload node in the flow builder.
 * It displays file upload functionality that will be available to users in the chatbot.
 * 
 * Features:
 * - Visual representation with cloud upload icon and green theme
 * - Connection handles for incoming (left) and outgoing (right) edges
 * - Display of upload configuration (label, file types, size limits, multiple files)
 * - Upload area preview with dashed border
 * - Consistent styling with other node types
 * 
 * The component is memoized for performance optimization.
 */

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AppNode } from '../../../types/flow';

/**
 * File Upload Node Component
 * 
 * Renders a file upload node with connection handles and upload configuration display.
 * 
 * @param data - Node data containing upload configuration
 * @param isConnectable - Whether the node can be connected to other nodes
 */
const FileUploadNode = ({ data, isConnectable }: NodeProps<AppNode>) => {
    // Extract upload configuration from node data with type casting for safety
    // We cast to the specific type since we know this is a file upload node
    const { label, allowedTypes, maxSize, multiple } = data as {
        label: string;
        allowedTypes: string[];
        maxSize: number;
        multiple: boolean;
        type: 'fileUpload';
    };

    /**
     * Format Allowed File Types for Display
     * 
     * Converts the array of file types to a user-friendly display string.
     * Shows "All files" if no specific types are allowed.
     * 
     * @param types - Array of allowed file extensions
     * @returns Formatted string for display
     */
    const formatAllowedTypes = (types: string[]) => {
        if (types.length === 0) return 'All files';
        return types.map(type => type.toUpperCase()).join(', ');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border-2 border-green-300 p-3 w-64">
            {/* Target Handle - Left side for incoming connections */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                style={{ background: '#9CA3AF' }}
                isConnectable={isConnectable}
            />

            <div className="text-sm text-gray-800">
                {/* Node Header with Icon and Title */}
                <div className="flex items-center mb-2">
                    {/* Cloud upload icon in green circle */}
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    {/* Node type label */}
                    <div className="font-semibold text-green-700">File Upload</div>
                </div>

                {/* Upload Configuration Details */}
                <div className="space-y-1">
                    {/* Upload label */}
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Label:</span> {label || 'Upload Files'}
                    </div>
                    {/* Allowed file types */}
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Types:</span> {formatAllowedTypes(allowedTypes)}
                    </div>
                    {/* Maximum file size */}
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Max Size:</span> {maxSize}MB
                    </div>
                    {/* Multiple files option */}
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Multiple:</span> {multiple ? 'Yes' : 'No'}
                    </div>
                </div>

                {/* Upload Area Preview */}
                <div className="mt-2 p-2 bg-gray-50 rounded border border-dashed border-gray-300">
                    <div className="text-xs text-gray-500 text-center">
                        {/* Display upload label or default text */}
                        {label || 'Click to upload files'}
                    </div>
                </div>
            </div>

            {/* Source Handle - Right side for outgoing connections */}
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

// Export memoized component for performance optimization
export default memo(FileUploadNode);
