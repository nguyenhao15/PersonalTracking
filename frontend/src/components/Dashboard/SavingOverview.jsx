import { ExpandIcon } from 'lucide-react'
import React from 'react'
import SavingCard from '../Cards/SavingCard'

const SavingOverview = ({
    savingData,
    onSeeMore
}) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Saving</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <ExpandIcon className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {savingData?.slice(0, 5)?.map((saving) => (
                    <SavingCard
                        key={saving._id}
                        walletName={saving.title}
                        type={saving.type}
                        balance={saving.totalAmount}
                        isActive={saving.active}
                        hideEditBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default SavingOverview