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

// Node types for React Flow
const nodeTypes = {
    text: TextNode,
    fileUpload: FileUploadNode,
};



const FlowCanvas = () => {
    const { nodes, edges, selectedNodeId, setNodes, setEdges, setSelectedNodeId } = useFlowStore();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);



    // Drag and drop handlers
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Helper function to create new nodes
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

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type || !reactFlowBounds) {
                return;
            }

            // Calculate position relative to the ReactFlow container
            const position = {
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            };

            const newNode = createNode(type, position);
            if (newNode) {
                setNodes([...nodes, newNode]);
            }
        },
        [nodes, setNodes, createNode]
    );


    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes) as AppNode[]);
        },
        [nodes, setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges) as AppEdge[]);
        },
        [edges, setEdges]
    );

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

    const onNodeClick = useCallback((_: React.MouseEvent, node: AppNode) => {
        setSelectedNodeId(node.id);
    }, [setSelectedNodeId]);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, [setSelectedNodeId]);

    // Handle keyboard shortcuts
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Delete' && selectedNodeId) {
            const newNodes = nodes.filter((n) => n.id !== selectedNodeId);
            setNodes(newNodes);
            setSelectedNodeId(null);
        }
    }, [selectedNodeId, nodes, setNodes, setSelectedNodeId]);

    // Add keyboard event listener
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);



    return (
        <div className="flex h-full w-full">
            {/* Left Panel - Nodes */}
            <NodesPanel />

            {/* Center - Flow Canvas */}
            <div
                className="flex-1 bg-gray-800 relative"
                ref={reactFlowWrapper}
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{ height: 'calc(100vh - 80px)', minHeight: '600px' }}
            >

                {/* Test with minimal ReactFlow setup */}
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
                    <Background />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>

            {/* Right Panel - Settings or Info */}
            {selectedNodeId ? (
                (() => {
                    const selectedNode = nodes.find(n => n.id === selectedNodeId);
                    if (selectedNode?.type === 'fileUpload') {
                        return <FileUploadSettingsPanel />;
                    }
                    return <SettingsPanel />;
                })()
            ) : (
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
