import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Handle, NodeProps, Position, getIncomers, useEdges, useNodes } from 'reactflow';
import { getNodeById, processData, setColumnDataTypes, updateNodeData } from '../store/reducers/workflowReducer';
import { getColumnDataType, getConditionsFromDataType } from '../utils/filterUtils';

function FilterNode(props: NodeProps) {

    const { id, data, xPos, yPos, selected } = props
    const nodes = useNodes()
    const edges = useEdges()
    const incomers = getIncomers(
        { id, data, position: { x: xPos, y: yPos } },
        nodes,
        edges,
    );

    const sourceData = getNodeById(incomers?.at(0)?.id ?? "")?.data

    const tableColumns = sourceData?.columns
    const tableData = sourceData?.tableData
    const selectedColumn = data?.selectedColumn
    const columnDataType = useSelector((state) => state?.workflow?.columnDataTypes)
    const selectedCondition = data?.selectedCondition
    const [input, setInput] = useState()

    const dispatch = useDispatch()

    const conditions = getConditionsFromDataType(columnDataType[selectedColumn ?? ""])

    useEffect(() => {

        dispatch(updateNodeData({ id, newData: { tableData: sourceData?.tableData, sourceNode: incomers?.at(0)?.id } }))

    }, [sourceData?.tableData])


    function onColumnChangeHandler(columnValue: string) {

        dispatch(updateNodeData({ id, newData: { selectedColumn: columnValue } }))

        // If column data type is not set, set it
        if (!columnDataType[columnValue]) {
            const columnType = getColumnDataType(tableData, columnValue)
            dispatch(setColumnDataTypes({ [columnValue]: columnType }))
        }
    }

    function onConditionChangeHandler(conditionValue: string) {
        dispatch(updateNodeData({ id, newData: { selectedCondition: conditionValue } }))
    }

    function handleRun() {
        dispatch(updateNodeData({ id, newData: { inputValue: input } }))
        dispatch(processData(id))
    }

    return (<div className={` p-3 border  ${selected ? 'border-blue-700' : ' border-black'} rounded-lg`}>
        <p>Filter</p>
        <label htmlFor="column-name" className="block mb-2 text-sm font-medium text-gray-900 ">Column name:</label>
        <select
            onChange={(e) => onColumnChangeHandler(e.target.value)}
            id="column-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected value={undefined}>Choose a column</option>
            {tableColumns?.map((column) => (
                <option key={column} value={column}>{column}</option>
            ))}
        </select>

        {selectedColumn && <>
            <label htmlFor="column-name" className="block mb-2 text-sm font-medium text-gray-900 ">Condition:</label>
            <select
                onChange={(e) => onConditionChangeHandler(e.target.value)}
                id="column-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected value={undefined}>Select condition</option>
                {conditions?.map((condition) => (
                    <option key={condition} value={condition}>{condition}</option>
                ))}
            </select>
        </>
        }
        {selectedColumn && selectedCondition && <div>
            <input type={columnDataType[selectedColumn] === "number" ? "number" : "text"}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
        </div>
        }
        {selectedColumn && selectedCondition && input &&
            <button type="button"
                onClick={() => handleRun()}
                className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">
                Run
            </button>}
        <Handle
            type="target"
            position={Position.Left}
            id="b"
        />
    </div>
    )
}

export default FilterNode