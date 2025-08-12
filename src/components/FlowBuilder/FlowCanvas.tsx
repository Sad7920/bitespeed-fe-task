/**
 * Flow Canvas Component
 * 
 * This is the main component of the flow builder that provides the interactive
 * canvas where users can create, connect, and manage nodes. It handles all the
 * core flow builder functionality including drag and drop, node connections,
 * keyboard shortcuts, and the overall layout of the application.
 * 
 * The component integrates React Flow for the canvas functionality and manages
 * the three-panel layout: Nodes Panel (left), Flow Canvas (center), and
 * Settings Panel (right).
 */

import { useCallback, useRef, useEffect } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    type Connection,
    type NodeChange,
    type EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowStore } from "../../hooks/useFlowState";
import type { AppNode, AppEdge } from "../../types/flow";
import TextNode from "./NodeTypes/TextNode";
import FileUploadNode from "./NodeTypes/FileUploadNode";
import NodesPanel from "./Panels/NodesPanel";
import SettingsPanel from "./NodeTypes/SettingsPanel";
import FileUploadSettingsPanel from "./NodeTypes/FileUploadSettingsPanel";

/**
 * Node Types Configuration
 * 
 * Maps node type strings to their corresponding React components.
 * This configuration is passed to React Flow to render different node types.
 */
const nodeTypes = {
    text: TextNode,
    fileUpload: FileUploadNode,
};

/**
 * Flow Canvas Component
 * 
 * Main component that renders the flow builder interface with drag and drop
 * functionality, node connections, and settings panel integration.
 */
const FlowCanvas = () => {
    // Get flow state and actions from Zustand store
    const { nodes, edges, selectedNodeId, setNodes, setEdges, setSelectedNodeId } = useFlowStore();

    // Reference to the React Flow wrapper div for drag and drop calculations
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    /**
     * Drag Over Event Handler
     * 
     * Prevents default browser behavior and sets the drop effect to 'move'
     * to indicate that items can be dropped on the canvas.
     */
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    /**
     * Node Creation Helper Function
     * 
     * Creates new nodes of different types with appropriate default data.
     * This function centralizes node creation logic and ensures consistent
     * node structure across the application.
     * 
     * @param type - The type of node to create ('text' or 'fileUpload')
     * @param position - The position where the node should be placed
     * @returns The created node or null if type is not supported
     */
    const createNode = useCallback((type: string, position: { x: number; y: number }): AppNode | null => {
        const timestamp = Date.now();

        switch (type) {
            case 'text':
                return {
                    id: `${type}-${timestamp}`,
                    type: 'text',
                    position,
                    data: { text: 'New message', type: 'text' },
                };
            case 'fileUpload':
                return {
                    id: `${type}-${timestamp}`,
                    type: 'fileUpload',
                    position,
                    data: {
                        label: 'Upload Files',
                        allowedTypes: [],
                        maxSize: 5,
                        multiple: false,
                        type: 'fileUpload'
                    },
                };
            default:
                return null;
        }
    }, []);

    /**
     * Drop Event Handler
     * 
     * Handles the drop event when a node is dragged from the nodes panel
     * to the canvas. Calculates the correct position and creates a new node.
     * 
     * @param event - The drop event containing drag data and position
     */
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            // Get the React Flow container bounds for position calculation
            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // Validate that we have the necessary data
            if (typeof type === 'undefined' || !type || !reactFlowBounds) {
                return;
            }

            // Calculate position relative to the ReactFlow container
            const position = {
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            };

            // Create and add the new node to the flow
            const newNode = createNode(type, position);
            if (newNode) {
                setNodes([...nodes, newNode]);
            }
        },
        [nodes, setNodes, createNode]
    );

    /**
     * Node Changes Handler
     * 
     * Handles changes to nodes (position, selection, etc.) and updates
     * the flow state accordingly using React Flow's applyNodeChanges utility.
     */
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes) as AppNode[]);
        },
        [nodes, setNodes]
    );

    /**
     * Edge Changes Handler
     * 
     * Handles changes to edges and updates the flow state accordingly
     * using React Flow's applyEdgeChanges utility.
     */
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges) as AppEdge[]);
        },
        [edges, setEdges]
    );

    /**
     * Connection Handler
     * 
     * Handles the creation of new connections between nodes.
     * Creates edges with proper styling including arrows and colors.
     * 
     * @param connection - The connection data from React Flow
     */
    const onConnect = useCallback(
        (connection: Connection) => {
            if (connection.source && connection.target) {
                // Create edge with proper arrow styling
                const newEdge: AppEdge = {
                    id: `edge-${connection.source}-${connection.target}`,
                    source: connection.source,
                    target: connection.target,
                    sourceHandle: connection.sourceHandle || null,
                    targetHandle: connection.targetHandle || null,
                    type: 'default',
                    style: { stroke: '#3B82F6', strokeWidth: 2 },
                    markerEnd: {
                        type: 'arrowclosed',
                        color: '#3B82F6',
                        width: 20,
                        height: 20,
                    } as any,
                    animated: false,
                };

                setEdges([...edges, newEdge]);
            }
        },
        [edges, setEdges]
    );

    /**
     * Node Click Handler
     * 
     * Handles clicks on nodes to select them and show their settings panel.
     * 
     * @param _ - Mouse event (unused)
     * @param node - The clicked node
     */
    const onNodeClick = useCallback((_: React.MouseEvent, node: AppNode) => {
        setSelectedNodeId(node.id);
    }, [setSelectedNodeId]);

    /**
     * Pane Click Handler
     * 
     * Handles clicks on the empty canvas area to deselect nodes.
     */
    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, [setSelectedNodeId]);

    /**
     * Keyboard Shortcut Handler
     * 
     * Handles keyboard shortcuts for node operations.
     * Currently supports Delete key to remove selected nodes.
     * 
     * @param event - The keyboard event
     */
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Delete' && selectedNodeId) {
            const newNodes = nodes.filter((n) => n.id !== selectedNodeId);
            setNodes(newNodes);
            setSelectedNodeId(null);
        }
    }, [selectedNodeId, nodes, setNodes, setSelectedNodeId]);

    /**
     * Keyboard Event Listener Effect
     * 
     * Sets up global keyboard event listeners for shortcuts.
     * Cleans up listeners when component unmounts.
     */
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <div className="flex h-full w-full">
            {/* Left Panel - Nodes Panel */}
            <NodesPanel />

            {/* Center - Flow Canvas */}
            <div
                className="flex-1 bg-gray-800 relative"
                ref={reactFlowWrapper}
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{ height: 'calc(100vh - 80px)', minHeight: '600px' }}
            >
                {/* React Flow Canvas */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    nodeTypes={nodeTypes}
                    fitView
                    deleteKeyCode="Delete"
                    style={{ width: '100%', height: '100%' }}
                    className="react-flow-canvas"
                >
                    {/* Background grid pattern */}
                    <Background />
                    {/* Zoom and pan controls */}
                    <Controls />
                    {/* Mini map for navigation */}
                    <MiniMap />
                </ReactFlow>
            </div>

            {/* Right Panel - Settings or Info */}
            {selectedNodeId ? (
                // Render appropriate settings panel based on selected node type
                (() => {
                    const selectedNode = nodes.find(n => n.id === selectedNodeId);
                    if (selectedNode?.type === 'fileUpload') {
                        return <FileUploadSettingsPanel />;
                    }
                    return <SettingsPanel />;
                })()
            ) : (
                // Default info panel when no node is selected
                <div className="w-80 bg-white border-l border-gray-200 p-4">
                    <div className="flex flex-col h-full">
                        <h4 className="font-semibold text-gray-700 mb-4">Flow Info</h4>
                        <div className="flex-1">
                            <p className="text-gray-500 text-sm mb-4">
                                Select a node to edit its properties. Use the save button in the header to validate your flow.
                            </p>
                            <div className="text-sm text-gray-600">
                                <p className="mb-2"><strong>Instructions:</strong></p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Drag nodes from the left panel to the canvas</li>
                                    <li>Connect nodes by dragging from source handles (right) to target handles (left)</li>
                                    <li>Click on nodes to edit their text</li>
                                    <li>Save to validate your flow structure</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlowCanvas;
