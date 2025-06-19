import { Plus } from "lucide-react"
import TransferInfoCard from "../Cards/TransferInfoCard"
import useWalletStore from "../../stores/useWalletStore";


const TransferList = ({
    transfer,
    onAddTransfer,
    onDelete
}) => {
    const {
        getWalletName
    } = useWalletStore();


    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg font-bold'>Transfer Overview</h5>
                </div>
                <button className='add-btn add-btn-fill' onClick={onAddTransfer}>
                    <Plus className='text-lg ' />
                    Add transfer
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transfer?.map((t) => (
                    <TransferInfoCard
                        key={t._id}
                        amount={t.amount}
                        fee={t.transferFee}
                        sourceWalletId={getWalletName(t.sourceWalletId)}
                        destinationWalletId={getWalletName(t.destinationWalletId)}
                        date={t.date}
                        onDelete={() => onDelete(t._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransferList