import { Node } from "reactflow";
import { Obj } from "./types";

export const findNodeById = (id: string, nodes: Node[]) => {
    return nodes.find((node) => node.id === id);
}

export const findAndUpdateNodeData = (nodeId: string, data: Obj, nodes: Node[]) => {
    return nodes.map((node) =>
        node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node
    );
}