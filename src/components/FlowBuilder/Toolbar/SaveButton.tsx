/**
 * Save Button Component
 * 
 * This component provides the save functionality for the flow builder.
 * It validates the current flow structure before saving and provides
 * user feedback through success and error messages.
 * 
 * Features:
 * - Flow validation before saving
 * - Real-time error and success feedback
 * - Auto-clearing success messages
 * - Console logging for demo purposes
 * - Clean, accessible button design
 * 
 * The component integrates with the flow validation utility to ensure
 * that only valid flows can be saved.
 */

import React, { useState } from 'react';
import { useFlowStore } from '../../../hooks/useFlowState';
import { validateBeforeSave } from '../../../utils/validateFlow';

/**
 * Save Button Component
 * 
 * Renders a save button that validates and saves the current flow.
 * Provides user feedback through error and success messages.
 * 
 * @returns JSX element representing the save button with feedback
 */
const SaveButton: React.FC = () => {
    // Get current flow state from Zustand store
    const { nodes, edges } = useFlowStore();

    // Local state for managing user feedback
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    /**
     * Save Flow Handler
     * 
     * Validates the current flow and saves it if valid.
     * Provides user feedback through error and success messages.
     * 
     * For demo purposes, the flow is logged to console instead of
     * being sent to a backend API.
     */
    const onSave = () => {
        // Clear any previous feedback messages
        setError(null);
        setSuccess(null);

        // Validate the current flow structure
        const result = validateBeforeSave(nodes, edges);

        // If validation fails, show error message and return early
        if (!result.ok) {
            setError(result.message || 'Validation failed.');
            return;
        }

        // If validation passes, proceed with saving
        // In a real application, this would POST to a backend API
        const payload = { nodes, edges };
        console.log('Saving flow:', payload);
        setSuccess('Flow saved successfully.');

        // Auto-clear success message after 3 seconds for better UX
        setTimeout(() => setSuccess(null), 3000);
    };

    return (
        <div className="flex items-center gap-3">
            {/* Save Button */}
            <button
                onClick={onSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                Save
            </button>

            {/* Error Message Display */}
            {error && <div className="text-sm text-red-600">{error}</div>}

            {/* Success Message Display */}
            {success && <div className="text-sm text-green-600">{success}</div>}
        </div>
    );
};

export default SaveButton;
