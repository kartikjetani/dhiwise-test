import { useSelector } from 'react-redux';

const CsvToTable = () => {


    const outputData = useSelector((state) => state?.workflow?.outputData);
    const tableColumns = Object.keys(outputData?.at(0) ?? {})

    return (
        <div>
            {outputData?.length > 0 ? (
                <table className='w-full text-sm text-left rtl:text-right text-gray-700 '>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50  '>
                        <tr>
                            {tableColumns?.map((column) => (
                                <th key={column} className='px-6 py-3 border  border-gray-400'>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='overflow-y-scroll h-96' >
                        {outputData?.map((row, index) => (
                            <tr key={index} className='odd:bg-white even:bg-gray-50 '>
                                {tableColumns?.map((column) => (
                                    <td key={column} className='px-6 py-4 border  border-gray-300'>{row[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>No data</p>}
        </div>
    );
};

export default CsvToTable;