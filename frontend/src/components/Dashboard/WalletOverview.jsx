import { ArrowRightIcon, ExpandIcon } from 'lucide-react';
import WalletCard from '../Cards/WalletCard';

const WalletOverview = ({ walletData, onSeeMore }) => {

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Wallets</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <ExpandIcon className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {walletData?.slice(0, 5)?.map((wallet) => (
                    <WalletCard
                        key={wallet._id}
                        walletName={wallet.name}
                        type={wallet.type}
                        balance={wallet.balance}
                        isActive={wallet.isActive}
                    />
                ))}
            </div>
        </div>
    )
}

export default WalletOverview