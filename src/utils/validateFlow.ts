/**
 * Flow Validation Utility
 * 
 * This module provides validation logic for the flow builder to ensure
 * that flows have a proper structure before they can be saved.
 * 
 * The validation ensures that flows follow a logical structure where
 * there is a clear flow direction and no disconnected endpoints.
 * 
 * Validation Rules:
 * - If there's more than 1 node, show error if there exists more than one node
 *   that has empty target handles (i.e., no outgoing edges from their source handle).
 * - We interpret "empty target handles" as nodes that have NO outgoing edges.
 * - If there's >1 such node when total nodes > 1 -> error.
 * 
 * This prevents flows with multiple disconnected endpoints, ensuring
 * a single, coherent flow structure.
 */

import type { AppNode, AppEdge } from '../types/flow';

/**
 * Validation Result Interface
 * 
 * Defines the structure of the validation result returned by validateBeforeSave.
 */
interface ValidationResult {
  /** Whether the validation passed */
  ok: boolean;
  /** Error message if validation failed */
  message?: string;
  /** IDs of nodes with no outgoing edges (for debugging) */
  nodesWithNoOutgoing?: string[];
}

/**
 * Validate Flow Before Save
 * 
 * Validates the flow structure to ensure it meets the required criteria
 * before allowing it to be saved. This prevents invalid flow configurations.
 * 
 * @param nodes - Array of all nodes in the flow
 * @param edges - Array of all edges connecting the nodes
 * @returns ValidationResult object indicating if the flow is valid
 */
export function validateBeforeSave(nodes: AppNode[], edges: AppEdge[]): ValidationResult {
  // If there's only one node or no nodes, the flow is always valid
  if (nodes.length <= 1) return { ok: true };

  // Build a map of outgoing edge counts per node
  // This tracks how many edges originate from each node
  const outCount = new Map<string, number>();
  edges.forEach((e) => {
    outCount.set(e.source, (outCount.get(e.source) ?? 0) + 1);
  });

  // Find nodes that have no outgoing edges (endpoints)
  // These are nodes that don't connect to any other nodes
  const nodesWithNoOutgoing = nodes.filter((n) => (outCount.get(n.id) ?? 0) === 0);
  
  // If there are more than 1 nodes with no outgoing edges, the flow is invalid
  // This indicates multiple disconnected endpoints, which is not allowed
  if (nodesWithNoOutgoing.length > 1) {
    return {
      ok: false,
      message: `There are ${nodesWithNoOutgoing.length} nodes with empty target handles. At most 1 is allowed.`,
      nodesWithNoOutgoing: nodesWithNoOutgoing.map((n) => n.id),
    };
  }

  // If we reach here, the flow is valid
  return { ok: true };
}
