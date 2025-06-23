import WalletCard from './WalletCard'
import { ArrowBigLeft, LeafIcon, PlusCircleIcon } from 'lucide-react'
import { formatThousands } from '../../lib/util'
import { useState } from 'react'
import CreateWalletPage from '../Create/CreateWalletPage'
import toast from 'react-hot-toast'
import api from '../../lib/axios'
import useWalletStore from '../../stores/useWalletStore'

const WalletList = ({
    totalBalance
}) => {
    const { addWallet, updateWallet, wallets } = useWalletStore();
    const [editWallet, setEditWallet] = useState({ data: null, show: false, type: null });


    const handleSubmit = async (wallet) => {
        const requiredFields = ["name", "walletId", "type", "walletIcon"]
        for (const field of requiredFields) {
            const value = wallet[field]
            if (value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                toast.error("Vui lòng điền đầy đủ thông tin")
                return;
            }
        }
        try {
            const newWallet = {
                name: wallet.name,
                walletId: wallet.walletId,
                initial: parseFloat(wallet.initial),
                balance: parseFloat(wallet.balance),
                currency: wallet.currency,
                type: wallet.type,
                isActive: true,
                walletIcon: wallet.walletIcon,
            };
            const res = await (
                editWallet.type === "create" ?
                    api.post("/wallets/create", newWallet) :
                    api.patch(`/wallets/${editWallet.data._id}`, newWallet)
            );
            console.log("Response is here: ", res);
            editWallet.type === "create" ? addWallet(res.data) : updateWallet(res.data.data);
            toast.success(`Wallet ${editWallet.type}ed  successfully!`)
            setEditWallet({ data: null, show: false, type: null });
        } catch (error) {
            console.log("Error creating wallet", error)
            toast.error(error.message)
        }
    }

    const handleActive = async (wallet) => {
        try {
            const res = await (
                api.patch(`/wallets/${wallet._id}`, { isActive: !wallet.isActive })
            )
            updateWallet(res.data.data);
            toast.success("Update status succssfully!")
        } catch (error) {
            console.log("Error creating wallet", error)
            toast.error(error.message)
        }
    }

    const activeWallets = wallets?.filter(w => w.isActive) || [];
    const inactiveWallets = wallets?.filter(w => !w.isActive) || [];

    return (
        <div className='mt-1 '>
            {!editWallet.show ?
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <h5 className='text-lg font-semibold text-blue-800'>Total Balance:  {formatThousands(totalBalance)} </h5>
                        <button className='card-btn ' onClick={() => setEditWallet({ data: null, show: true, type: "create" })}>
                            Add new <PlusCircleIcon className='text-base' />
                        </button>
                    </div>

                    <div className='flex flex-col gap-2 my-2'>

                        <div className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-50 text-green-500'>
                            <h6 className='text-xs font-medium' >
                                Active wallet
                            </h6>
                        </div>
                        {activeWallets.map(wallet => (
                            <WalletCard
                                key={wallet._id}
                                walletName={wallet.name}
                                type={wallet.type}
                                balance={wallet.balance}
                                isActive={wallet.isActive}
                                editWallet={() => setEditWallet({ data: wallet, show: true, type: "edit" })}
                                updateActive={() => handleActive(wallet)}
                            />
                        ))}

                        {inactiveWallets.length > 0 && <div className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-50 text-red-500'>
                            <h6 className='text-xs font-medium' >
                                UnActive Wallet
                            </h6>
                        </div>}

                        {inactiveWallets.map(wallet => (
                            <WalletCard
                                key={wallet._id}
                                walletName={wallet.name}
                                type={wallet.type}
                                balance={wallet.balance}
                                isActive={wallet.isActive}
                                editWallet={() => setEditWallet({ data: wallet, show: true, type: "edit" })}
                                updateActive={() => handleActive(wallet)}
                            />
                        ))}
                    </div>
                </div>
                :
                <div className='flex flex-col gap-2'>
                    <div className='items-center'>
                        <button className='card-btn ' onClick={() => setEditWallet({ data: null, type: null, show: false })}>
                            <ArrowBigLeft className='text-base' /> Back
                        </button>
                    </div>
                    <div className='mt-5'>
                        <CreateWalletPage
                            onAddWallet={handleSubmit}
                            editItem={editWallet}
                        />
                    </div>
                </div>
            }
        </div >
    )
}

export default WalletList