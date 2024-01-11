import { useCallback } from 'react';
import ReactFlow, { Background, Connection, Controls, Edge, EdgeChange, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { setEdges, setNodes } from '../store/slices/workflowSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import Consumer from './Consumer';
import DataSourceNode from './DataSourceNode';
import FilterNode from './FilterNode';

export const nodeTypes = {
    DataSourceNode,
    FilterNode
};

const WorkflowCanvas = () => {

    const nodes = useAppSelector((state) => state?.workflow?.nodes);
    const edges = useAppSelector((state) => state?.workflow?.edges);

    const dispatch = useAppDispatch();

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            dispatch(setNodes(applyNodeChanges(changes, nodes)))
        },
        [nodes],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            dispatch(setEdges(applyEdgeChanges(changes, edges)))
        },
        [edges],
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            // Check if the target node already has an edge connected to it
            const targetHasEdge = edges.some((edge: Edge) => edge.target === connection.target);

            // If the target node doesn't have an edge, create the new edge
            if (!targetHasEdge) {
                dispatch(setEdges(addEdge(connection, edges)))
            }
        },
        [edges],
    );

    return (
        <div style={{ height: 500, width: "100vw" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                style={{ backgroundColor: "#B8CEFF" }}
                fitView
                defaultEdgeOptions={{ animated: true }}
            >
                <Background />
                <Controls />
                <Consumer />
            </ReactFlow>
        </div>
    );
};

export default WorkflowCanvas;
