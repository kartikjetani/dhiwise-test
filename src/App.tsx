import { Provider } from 'react-redux';
import 'reactflow/dist/style.css';
import WorkflowBuilder from './containers/WorkflowBuilder';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <h1 className='m-2 font-bold text-blue-500'>Drag & Drop Workflow Builder</h1>
      <WorkflowBuilder />
    </Provider>
  );
};

export default App;
