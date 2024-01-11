import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEdgesState, useNodesState, useOnSelectionChange } from 'reactflow';
import { setOutputData } from '../store/reducers/workflowReducer';

function Consumer() {
    const dispatch = useDispatch();

    const reduxNodes = useSelector((state) => state?.workflow?.nodes);
    const reduxEdges = useSelector((state) => state?.workflow?.edges);
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
        onChange: ({ nodes, edges }) => {
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