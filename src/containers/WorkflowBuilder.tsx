import React from 'react';
// import { addWorkflow, updateWorkflow, deleteWorkflow } from '../store/actions/workflowActions';
import WorkflowCanvas from '../components/WorkflowCanvas';
import WorkflowList from '../components/WorkflowList';
import { useDispatch, useSelector } from 'react-redux';

const WorkflowBuilder = () => {
    const dispatch = useDispatch();
    const workflows = useSelector(state => state.workflow?.workflows);



    return (
        <div style={{ height: 500 }}>
            <WorkflowCanvas />
            <WorkflowList workflows={workflows} />
        </div>
    );
};

export default WorkflowBuilder;
