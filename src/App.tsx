import React from 'react';
import WorkflowBuilder from './containers/WorkflowBuilder';
import { Provider } from 'react-redux';
import store from './store/store';
import 'reactflow/dist/style.css';

const App = () => {
  return (
    <Provider store={store}>
      <h1>Drag & Drop Workflow Builder</h1>
      <WorkflowBuilder />
    </Provider>
  );
};

export default App;
