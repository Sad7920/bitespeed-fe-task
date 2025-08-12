// central types for the app — use React Flow's exported types
import { type Node, type Edge } from '@xyflow/react';

export type NodeType = 'text' | 'fileUpload'; // add more types later: 'api', 'choice', etc.

export type TextNodeData = {
  text: string;
  type: 'text'; // discriminant — use a "type" field (must be a type, not interface)
};

export type FileUploadNodeData = {
  label: string;
  allowedTypes: string[];
  maxSize: number; // in MB
  multiple: boolean;
  type: 'fileUpload';
};

// specific node types
export type TextNode = Node<TextNodeData, 'text'>;
export type FileUploadNode = Node<FileUploadNodeData, 'fileUpload'>;

// union of all node types in the app (extendable)
export type AppNode = TextNode | FileUploadNode; // later: TextNode | FileUploadNode | ChoiceNode | ApiNode

// edges can use the provided Edge type
export type AppEdge = Edge;

// convenient flow state shape
export interface FlowState {
  nodes: AppNode[];
  edges: AppEdge[];
}
