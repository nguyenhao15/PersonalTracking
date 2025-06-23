import { ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { formatDate, formatThousands } from '../../lib/util'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ThisMonthIncome = ({ transactions, onSeeMore, onDelete }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>This Month Income</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <ArrowRightIcon className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        expensesName={item.expensesName}
                        date={formatDate(item.date)}
                        type={item.type}
                        amount={formatThousands(item.amount)}
                        category={item.category}
                        onDelete={() => onDelete(item._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ThisMonthIncome