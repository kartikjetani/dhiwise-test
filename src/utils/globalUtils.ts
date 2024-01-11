export const findNodeById = (id, nodes) => {
    return nodes.find((node) => node.id === id);
}

export const findAndUpdateNodeData = (nodeId, data, nodes) => {
    return nodes.map((node) =>
        node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node
    );
}