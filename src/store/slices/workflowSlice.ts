import { createSlice } from '@reduxjs/toolkit';
import { addEdge } from 'reactflow';
import { processDataLogic } from '../../utils/filterUtils';
import { findAndUpdateNodeData } from '../../utils/globalUtils';
import { WorkFlowStateType } from '../../utils/types';

const initialState: WorkFlowStateType = {
    nodes: [],
    edges: [],
    outputData: [],
    tableData: {}
};

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        addNode: (state, action) => {
            // check if action.payload is an array
            if (Array.isArray(action.payload)) {
                state.nodes = [...state.nodes, ...action.payload];
                return;
            }
            state.nodes = [...state.nodes, action.payload];
        },
        setNodes: (state, action) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action) => {
            state.edges = action.payload;
        },
        addReduxEdge: (state, action) => {
            state.edges = addEdge(action.payload, state.edges);
        },
        updateNodeData: (state, action) => {
            state.nodes = findAndUpdateNodeData(action.payload.id, action.payload.newData, state.nodes);
        },
        setTableData: (state, action) => {
            state.tableData = action.payload;
        },
        processData: processDataLogic,
        setOutputData: (state, action) => {
            state.outputData = action.payload;
        }
    }
});

export const {
    addNode,
    setNodes,
    setEdges,
    addReduxEdge,
    updateNodeData,
    setTableData,
    processData,
    setOutputData
} = workflowSlice.actions;


export default workflowSlice.reducer;