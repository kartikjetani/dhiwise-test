import Papa from 'papaparse';
import { Handle, NodeProps, Position } from 'reactflow';
import { csvConfig } from '../configs/csvConfig';
import { setOutputData, setTableData, updateNodeData } from '../store/slices/workflowSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Obj } from '../utils/types';


function DataSourceNode(props: NodeProps) {

    const { id, data, selected } = props
    const dispatch = useAppDispatch();
    const tableData = useAppSelector((state) => state?.workflow?.tableData) as Obj;


    function onDataSourceChangeHandle(dataSourceId: string) {

        if (tableData[dataSourceId]) {
            const { columns, data } = tableData[dataSourceId]
            dispatch(updateNodeData({ id, newData: { columns, tableData: data, dataSourceId } }))
            dispatch(setOutputData(data))
            return;
        }

        const csvPath = csvConfig?.find((config) => config.id === dataSourceId)?.path
        if (!csvPath) {
            console.error('CSV path not found');
            return;
        }

        // Parse CSV content
        Papa.parse(csvPath, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: (result) => {
                dispatch(setOutputData(result.data))
                dispatch(updateNodeData({ id, newData: { columns: result.meta.fields, tableData: result.data, dataSourceId } }))
                dispatch(setTableData({ [dataSourceId]: { columns: result.meta.fields, data: result.data } }))
            },
            error: (error) => {
                console.error('CSV parsing error:', error.message);
            },
        });

    }

    return (
        <div className={` p-3 border ${selected ? 'border-blue-700' : ' border-black'} rounded-lg`}>
            <p>{data.label}</p>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 ">Example data</label>
            <select id={id}
                value={data?.dataSourceId}
                onChange={(e) => onDataSourceChangeHandle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option >Choose a data source</option>
                {
                    csvConfig?.map((config) => (
                        <option key={config.id} value={config.id}>{config.name}</option>
                    ))
                }
            </select>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
            />
        </div>
    )
}

export default DataSourceNode