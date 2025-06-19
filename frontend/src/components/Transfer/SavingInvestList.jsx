import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import SavingInvestInfoCard from '../Cards/SavingInvestInfoCard'
import useWalletStore from '../../stores/useWalletStore';
import useSavingInvestStore from '../../stores/useSavingInvestStore';

const SavingInvestList = ({
    data,
    onAddSavingInvest,
    onDelete
}) => {

    const {
        getWalletName
    } = useWalletStore();

    const {
        fetchData,
        getName,
    } = useSavingInvestStore();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg font-bold'>Saving and Investment Transactions</h5>
                </div>
                <button className='add-btn add-btn-fill' onClick={onAddSavingInvest}>
                    <Plus className='text-lg ' />
                    Add new saving
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {data?.map((t) => (
                    <SavingInvestInfoCard
                        key={t._id}
                        amount={t.amount}
                        savingTitle={getName(t.parentId)}
                        fee={t.fee}
                        walletName={getWalletName(t.walletId)}
                        type={t.type}
                        date={t.date}
                        onDelete={() => onDelete(t._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SavingInvestList