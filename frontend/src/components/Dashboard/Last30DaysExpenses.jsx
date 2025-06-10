import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData, groupTransactionsByDate } from '../../lib/util';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => { };
    }, [data]);

    const groupedData = groupTransactionsByDate(chartData, "day")

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>
            <CustomBarChart data={groupedData} />
        </div>
    )
}

export default Last30DaysExpenses