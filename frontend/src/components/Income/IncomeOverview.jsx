import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../lib/util';
import { Plus } from 'lucide-react';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg font-bold'>Income Overview</h5>
                    <p className='text-xs font-bold text-gray-400 mt-0.5'>Track your income</p>
                </div>

                <button className='add-btn add-btn-fill' onClick={onAddIncome}>
                    <Plus className='text-lg ' />
                    Add your income
                </button>
            </div>

            <div className='mt-10'>
                <CustomBarChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview