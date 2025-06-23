import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { formatDate, formatThousands } from '../../lib/util';


const TransactionList = ({ transactions, onDelete }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-start'>
                <h5 className='text-lg font-bold'>Expenses</h5>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((transaction) => (
                    <TransactionInfoCard
                        key={transaction._id}
                        expensesName={transaction.expensesName}
                        date={formatDate(transaction.date)}
                        type={transaction.type}
                        amount={formatThousands(transaction.amount)}
                        category={transaction.category}
                        onDelete={() => onDelete(transaction._id)}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default TransactionList