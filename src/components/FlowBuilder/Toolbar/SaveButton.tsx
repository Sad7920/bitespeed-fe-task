import React, { useState } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import { validateBeforeSave } from '../../../utils/validateFlow';

/**
 * SaveButton: triggers validation and shows error (if any).
 * - For demo, "save" simply validates and logs the flow JSON.
 */
const SaveButton: React.FC = () => {
    const { nodes, edges } = useFlowStore();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onSave = () => {
        setError(null);
        setSuccess(null);
        const result = validateBeforeSave(nodes, edges);

        if (!result.ok) {
            setError(result.message || 'Validation failed.');
            return;
        }

        // If ok, you could POST to backend. For now we console.log the JSON.
        const payload = { nodes, edges };
        console.log('Saving flow:', payload);
        setSuccess('Flow saved successfully.');

        // Auto-clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={onSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                Save
            </button>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}
        </div>
    );
};

export default SaveButton;
