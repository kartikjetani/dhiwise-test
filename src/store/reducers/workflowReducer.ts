// workflowReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges, getIncomers } from 'reactflow';
import { findAndUpdateNodeData, findNodeById } from '../../utils/globalUtils';

type WorkFlowStateType = {
    nodes: Array<Node>,
    edges: Array<Edge>,
    tableData: {},
    tableColumns: Array<any>,
    columnDataTypes: any,
    selectedColumn: string | null,
    selectedCondition: string | null,
    outputData: Array<any>,
}

const initialState: WorkFlowStateType = {
    nodes: [
        {
            id: 'node-2',
            type: 'CSVSelectorNode',
            // sourcePosition: Position.Right,
            position: { x: 0, y: 0 },
            data: { label: 'node 2' },
        },
        {
            id: 'node-3',
            type: 'FilterNode',
            // targetPosition: ,
            position: { x: 200, y: 200 },
            data: { label: 'node 3' },
        },
    ],
    edges: [],
    tableData: {},
    tableColumns: [],
    columnDataTypes: {},
    selectedColumn: null,
    selectedCondition: null,
    outputData: [],
};

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        setNodes: (state, action) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        setEdges: (state, action) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        addReduxEdge: (state, action) => {

            state.edges = addEdge(action.payload, state.edges);
        },
        updateNodeData: (state, action) => {
            state.nodes = findAndUpdateNodeData(action.payload.id, action.payload.newData, state.nodes);
        },
        setTableColumns: (state, action) => {
            state.tableColumns = action.payload;
        },
        setTableData: (state, action) => {
            state.tableData = action.payload;
        },
        setColumnDataTypes: (state, action) => {
            state.columnDataTypes = { ...state.columnDataTypes, ...action.payload };
        },
        setSelectedColumn: (state, action) => {
            state.selectedColumn = action.payload;
        },
        setSelectedCondition: (state, action) => {
            state.selectedCondition = action.payload;
        },
        processData: (state, action) => {
            const nodeId = action.payload
            const nodeData = findNodeById(nodeId, state.nodes)?.data;
            const sourceNodeData = findNodeById(nodeData?.sourceNode, state.nodes)?.data;

            switch (nodeData.selectedCondition) {
                case "number is equal to":

                    const number = Number.parseFloat(nodeData?.inputValue);
                    const filteredData = sourceNodeData?.tableData?.filter((row) => {
                        return row[nodeData?.selectedColumn] === number;
                    });

                    state.nodes = findAndUpdateNodeData(nodeId, { tableData: filteredData }, state.nodes);
                    state.outputData = filteredData;
                    break;
                default:
                    console.log("No condition found");
                    break;
            }
        },
        setOutputData: (state, action) => {
            state.outputData = action.payload;
        }
    }
});

export const { setNodes, setEdges, addReduxEdge, updateNodeData, setTableData, setTableColumns, setColumnDataTypes, setSelectedColumn, setSelectedCondition,
    processData, setOutputData } = workflowSlice.actions;

export default workflowSlice.reducer;

export const getNodeById = (id: string) => {
    const nodes = useSelector((state: any) => state.workflow.nodes);
    return findNodeById(id, nodes);
}