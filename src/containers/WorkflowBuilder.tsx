import OutputSection from '../components/OutputSection';
import WorkflowCanvas from '../components/WorkflowCanvas';

const WorkflowBuilder = () => {


    return (
        <div style={{ height: 500 }}>
            <WorkflowCanvas />
            <OutputSection />
        </div>
    );
};

export default WorkflowBuilder;
