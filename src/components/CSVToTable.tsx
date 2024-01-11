import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { setOutputData, setTableColumns, setTableData } from '../store/reducers/workflowReducer';
import { useOnSelectionChange } from 'reactflow';
// import CSVData from '../csv/country-data.csv';

const CsvToTable = () => {



    const outputData = useSelector((state) => state?.workflow?.outputData);
    const tableColumns = Object.keys(outputData?.at(0) ?? {})

    return (
        <div>
            {outputData?.length > 0 && (
                <table className='w-full text-sm text-left rtl:text-right text-gray-700 '>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50  '>
                        <tr>
                            {tableColumns?.map((column) => (
                                <th key={column} className='px-6 py-3'>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='overflow-y-scroll h-96' >
                        {outputData?.map((row, index) => (
                            <tr key={index} className='odd:bg-white even:bg-gray-50 border-t-2 border-gray-200'>
                                {tableColumns?.map((column) => (
                                    <td key={column} className='px-6 py-4'>{row[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CsvToTable;