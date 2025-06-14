
import DashboardLayout from '../../components/layout/DashboardLayout';
import WalletGallery from '../../components/Wallet/WalletGallery';

const Wallet = () => {


    return (
        <DashboardLayout activeMenu="Wallets">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className='gap-3 mx-2 my-2 h-14'>
                        <WalletGallery />
                    </div>


                </div>
            </div>

        </DashboardLayout>
    )
}

export default Wallet