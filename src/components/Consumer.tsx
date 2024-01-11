import React, { useEffect } from 'react'
import { useNodes, useNodesState, useOnSelectionChange } from 'reactflow';
import { setOutputData } from '../store/reducers/workflowReducer';
import { useDispatch, useSelector } from 'react-redux';

function Consumer() {
    const dispatch = useDispatch();

    const reduxNodes = useSelector((state) => state?.workflow?.nodes);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    useEffect(() => {
        setNodes(reduxNodes)
    }, [reduxNodes])

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            console.log('Selected elements:', nodes, edges);
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