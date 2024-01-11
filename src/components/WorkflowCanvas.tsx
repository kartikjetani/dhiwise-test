import React, { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, Node, applyEdgeChanges, applyNodeChanges, useOnSelectionChange } from 'reactflow';
import CSVSelectorNode from './CSVSelectorNode';
import FilterNode from './FilterNode';
import { useDispatch, useSelector } from 'react-redux';
import { addReduxEdge, setEdges, setNodes } from '../store/reducers/workflowReducer';
import CsvToTable from './CSVToTable';
import Consumer from './Consumer';

const nodeTypes = {
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
        (connection) => dispatch(addReduxEdge(connection)),
        [setEdges]
    );


    // const handleAdd = () => {
    //     // Add your logic to create a new workflow element
    //     const newElement = {
    //         id: 'someUniqueId',
    //         type: 'default',
    //         position: { x: 0, y: 0 },
    //         data: { label: 'New Node' },
    //     };
    //     onAddWorkflow(newElement);
    // };

    // const handleUpdate = () => {
    //     // Add your logic to update a workflow element
    //     const updatedElement = {
    //         id: 'someUniqueId',
    //         type: 'default',
    //         position: { x: 100, y: 100 },
    //         data: { label: 'Updated Node' },
    //     };
    //     onUpdateWorkflow(updatedElement);
    // };

    // const handleDelete = () => {
    //     // Add your logic to delete a workflow element
    //     onDeleteWorkflow('someUniqueId');
    // };



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
