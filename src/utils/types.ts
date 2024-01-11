import { Edge, Node } from "reactflow";

export type Obj = {
    [key: string]: any;
}

export type WorkFlowStateType = {
    nodes: Array<Node>,
    edges: Array<Edge>,
    outputData: Array<Obj>,
    tableData: Obj
}