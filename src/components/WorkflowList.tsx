import React from 'react';
import CsvToTable from './CSVToTable';

const WorkflowList = ({ workflows }) => {
    return (
        <div className='mt-4'>
            <h2>Data Table</h2>
            <CsvToTable />
        </div>
    );
};

export default WorkflowList;
