import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { Background, Controls } from 'reactflow';
import { addReduxEdge, setEdges, setNodes } from '../store/reducers/workflowReducer';
import CSVSelectorNode from './CSVSelectorNode';
import Consumer from './Consumer';
import FilterNode from './FilterNode';

export const nodeTypes = {
    CSVSelectorNode,
    FilterNode
};

const WorkflowCanvas = () => {

    const nodes = useSelector((state) => state?.workflow?.nodes);
    const edges = useSelector((state) => state?.workflow?.edges);

    const dispatch = useDispatch();

    const onNodesChange = useCallback(
        (changes) => dispatch(setNodes(changes)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => dispatch(setEdges(changes)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {
            // Check if the target node already has an edge connected to it
            const targetHasEdge = edges.some(edge => edge.target === connection.target);

            // If the target node doesn't have an edge, create the new edge
            if (!targetHasEdge) {
                dispatch(addReduxEdge(connection));
            }
        },
        [edges]
    );

    // const onNodesChange = useCallback(
    //     (changes) => {
    //         dispatch( applyNodeChanges(changes, nodes))
    //     },
    //     [],
    // );
    // const onEdgesChange = useCallback(
    //     (changes) => setEdges((eds) => applyEdgeChanges(changes, edges)),
    //     [],
    // );

    // const onConnect = useCallback(
    //     (params) => setEdges((eds) => addEdge(params, eds)),
    //     [],
    // );

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
            {/* <button onClick={handleAdd}>Add Node</button>
            <button onClick={handleUpdate}>Update Node</button>
            <button onClick={handleDelete}>Delete Node</button> */}
        </div>
    );
};

export default WorkflowCanvas;
