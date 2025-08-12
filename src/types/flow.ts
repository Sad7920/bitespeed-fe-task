/**
 * Flow Type Definitions
 * 
 * This module contains all TypeScript type definitions for the BiteSpeed
 * Chatbot Flow Builder application. It defines the structure of nodes,
 * edges, and flow data to ensure type safety throughout the application.
 * 
 * The types are designed to be extensible, allowing easy addition of
 * new node types in the future while maintaining type safety.
 */

// Import React Flow's base types to extend them for our application
import { type Node, type Edge } from '@xyflow/react';

/**
 * Node Type Union
 * 
 * Defines all available node types in the application.
 * This union type is used to ensure only valid node types can be created.
 * 
 * @example
 * - 'text': Text message nodes for displaying messages
 * - 'fileUpload': File upload nodes for collecting files
 * 
 * Future additions: 'api', 'choice', 'condition', 'webhook', etc.
 */
export type NodeType = 'text' | 'fileUpload';

/**
 * Text Node Data Interface
 * 
 * Defines the data structure for text message nodes.
 * These nodes represent text messages that will be displayed in the chatbot.
 * 
 * @property text - The message content to be displayed
 * @property type - Discriminant field to identify this as a text node
 */
export type TextNodeData = {
  text: string;
  type: 'text'; // Discriminant field - must be a type, not interface
};

/**
 * File Upload Node Data Interface
 * 
 * Defines the data structure for file upload nodes.
 * These nodes represent file upload functionality in the chatbot flow.
 * 
 * @property label - Display label for the file upload component
 * @property allowedTypes - Array of allowed file extensions (e.g., ['pdf', 'docx'])
 * @property maxSize - Maximum file size in megabytes
 * @property multiple - Whether multiple files can be uploaded
 * @property type - Discriminant field to identify this as a file upload node
 */
export type FileUploadNodeData = {
  label: string;
  allowedTypes: string[];
  maxSize: number; // in MB
  multiple: boolean;
  type: 'fileUpload';
};

/**
 * Specific Node Type Definitions
 * 
 * These types extend React Flow's Node type with our specific data structures.
 * They provide type safety for each node type while maintaining compatibility
 * with React Flow's node system.
 */
export type TextNode = Node<TextNodeData, 'text'>;
export type FileUploadNode = Node<FileUploadNodeData, 'fileUpload'>;

/**
 * Application Node Union Type
 * 
 * Union of all node types available in the application.
 * This type is used throughout the application to handle any type of node.
 * 
 * When adding new node types, simply extend this union:
 * export type AppNode = TextNode | FileUploadNode | ChoiceNode | ApiNode;
 */
export type AppNode = TextNode | FileUploadNode;

/**
 * Application Edge Type
 * 
 * Uses React Flow's Edge type directly since we don't need custom edge data.
 * Edges represent connections between nodes in the flow.
 */
export type AppEdge = Edge;

/**
 * Flow State Interface
 * 
 * Convenient interface representing the complete state of a flow.
 * This is used for saving/loading flows and for type safety in flow operations.
 * 
 * @property nodes - Array of all nodes in the flow
 * @property edges - Array of all edges connecting the nodes
 */
export interface FlowState {
  nodes: AppNode[];
  edges: AppEdge[];
}
