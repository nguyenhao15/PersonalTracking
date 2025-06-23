import { ArrowBigLeftIcon, ArrowBigRightIcon, ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { formatDate, formatThousands } from '../../lib/util'

const RecentTransactions = ({ transactions, onSeeMore, onDelete }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 days</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <ArrowRightIcon className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expenses) => (
                    <TransactionInfoCard
                        key={expenses._id}
                        expensesName={expenses.expensesName}
                        category={expenses.category}
                        date={formatDate(expenses.date || "Missing date")}
                        amount={formatThousands(expenses?.amount || 0)}
                        onDelete={() => onDelete(expenses._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions