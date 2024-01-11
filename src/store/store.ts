// store.js
import { configureStore } from '@reduxjs/toolkit';
import workflowSlice from './reducers/workflowReducer';

const store = configureStore({
    reducer: {
        workflow: workflowSlice,
    },
});

export default store;
