import { BanknoteArrowDown, BanknoteArrowUp, Trash2 } from 'lucide-react'
import SvgHandle from '../SvgHandle';
import { formatThousands } from '../../lib/util';
import HandleBankingIcon from '../HandleBankingIcon';

const WalletCard = (
    {
        walletName,
        balance,
        isActive,
        type
    }
) => {


    const getTextStyle = () =>
        isActive ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"

    const getActive = () =>
        isActive ? "Active" : "UnActive"

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/5'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                <SvgHandle name={type} className='w-6 h-6' color='text-gray-600' />
            </div>
            <div className='flex-1  flex items-center justify-between'>
                <div>
                    <p className='text-sm text-gray-700 font-medium'>{walletName}</p>
                    <p className='text-sx text-gray-800 font-bold mt-1'>{formatThousands(balance)}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getTextStyle()}`}>
                    <h6 className='text-xs font-medium'>
                        {getActive()}
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default WalletCard