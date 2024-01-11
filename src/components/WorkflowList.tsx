import { useDispatch, useSelector } from 'react-redux';
import { addNode, setEdges } from '../store/reducers/workflowReducer';
import CsvToTable from './CSVToTable';
import { nodeTypes } from './WorkflowCanvas';

const WorkflowList = () => {

    const nodes = useSelector((state) => state?.workflow?.nodes);
    const edges = useSelector((state) => state?.workflow?.edges);
    const dispatch = useDispatch();

    function createNewNode(type: keyof typeof nodeTypes) {
        // Create a new node
        const newNode = {
            id: `node-${nodes.length + 1}`, // This will give a unique id to the new node
            type: type, // The type of node to be created
            position: { x: Math.random() * 300, y: Math.random() * 300 }, // Random position for the new node
            data: { label: `Node ${nodes.length + 1}` }, // Label for the new node
        };

        // Add the new node to the nodes state
        dispatch(addNode(newNode));

    }

    function saveWork() {
        localStorage.setItem('workflow', JSON.stringify({ nodes, edges }))
    }


    function restoreWork() {
        const workflow = JSON.parse(localStorage.getItem('workflow') ?? "")
        console.log(workflow)
        dispatch(addNode(workflow?.nodes))
        dispatch(setEdges(workflow?.edges))
    }
    return (
        <div className='m-4'>
            <button onClick={() => createNewNode('CSVSelectorNode')} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Example Data</button>
            <button onClick={() => createNewNode("FilterNode")} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Filter</button>
            <button onClick={saveWork} type="button" className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Work</button>
            <button onClick={restoreWork} type="button" className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Restore Work</button>
            <h2>Output</h2>
            <CsvToTable />
        </div>
    );
};

export default WorkflowList;
