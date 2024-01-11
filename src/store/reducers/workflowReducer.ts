// workflowReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { processDataLogic } from '../../utils/filterUtils';
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
    nodes: [],
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
        addNode: (state, action) => {
            // check if action.payload is an array
            if (Array.isArray(action.payload)) {
                state.nodes = [...state.nodes, ...action.payload];
                return;
            }
            state.nodes = [...state.nodes, action.payload];
        },
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
    setTableColumns,
    setColumnDataTypes,
    setSelectedColumn,
    setSelectedCondition,
    processData,
    setOutputData
} = workflowSlice.actions;

export default workflowSlice.reducer;

export const getNodeById = (id: string) => {
    const nodes = useSelector((state: any) => state.workflow.nodes);
    return findNodeById(id, nodes);
}