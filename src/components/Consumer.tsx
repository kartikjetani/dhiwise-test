import { useEffect } from 'react';
import { useEdgesState, useNodesState, useOnSelectionChange } from 'reactflow';
import { setOutputData } from '../store/slices/workflowSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function Consumer() {
    const dispatch = useAppDispatch();

    const reduxNodes = useAppSelector((state) => state?.workflow?.nodes);
    const reduxEdges = useAppSelector((state) => state?.workflow?.edges);
    const [, setNodes,] = useNodesState([]);
    const [, setEdges,] = useEdgesState([]);

    // sync nodes state between redux and reactflow (zustand)
    useEffect(() => {
        setNodes(reduxNodes)
    }, [reduxNodes])

    // sync edges state between redux and reactflow (zustand)
    useEffect(() => {
        setEdges(reduxEdges)
    }, [reduxEdges])

    useOnSelectionChange({
        onChange: ({ nodes }) => {
            if (nodes?.at(0)?.data?.tableData) {
                dispatch(setOutputData(nodes?.at(0)?.data?.tableData))
            }
        },
    });




    return (
        <></>
    )
}

export default Consumer