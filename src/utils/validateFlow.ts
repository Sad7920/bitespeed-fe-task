import type { AppNode, AppEdge } from '../types/flow';

/**
 * Validation rule for Save:
 * - If there's more than 1 node, show error if there exists more than one node
 *   that has empty target handles (i.e., no outgoing edges from their source handle).
 *
 * We interpret "empty target handles" as nodes that have NO outgoing edges.
 * If there's >1 such node when total nodes > 1 -> error.
 */

export function validateBeforeSave(nodes: AppNode[], edges: AppEdge[]) {
  if (nodes.length <= 1) return { ok: true };

  // build outgoing count per node (source -> count)
  const outCount = new Map<string, number>();
  edges.forEach((e) => {
    outCount.set(e.source, (outCount.get(e.source) ?? 0) + 1);
  });

  // nodes with zero outgoing edges
  const nodesWithNoOutgoing = nodes.filter((n) => (outCount.get(n.id) ?? 0) === 0);
  if (nodesWithNoOutgoing.length > 1) {
    return {
      ok: false,
      message: `There are ${nodesWithNoOutgoing.length} nodes with empty target handles. At most 1 is allowed.`,
      nodesWithNoOutgoing: nodesWithNoOutgoing.map((n) => n.id),
    };
  }

  return { ok: true };
}
