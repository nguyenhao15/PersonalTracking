import React, { useEffect, useState } from 'react'
import { groupTransactionsByDate } from '../../lib/util';
import { Plus } from 'lucide-react';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpensesOverview = ({ transactions, onExpensesIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = groupTransactionsByDate(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className=' text-lg'>Expenses Overview</h5>
                </div>
                <button className='add-btn add-btn-fill' onClick={onExpensesIncome}>
                    <Plus className='' /> Add Expenses
                </button>
            </div>

            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpensesOverview