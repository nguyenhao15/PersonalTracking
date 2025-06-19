import { BanknoteArrowDown, BanknoteArrowUp, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import useCategoriesStore from '../../stores/useCategoriesStore';
import SvgHandle from '../SvgHandle';

const TransactionInfoCard = ({
    expensesName,
    date,
    type,
    amount,
    category,
    hideDeleteBtn,
    onDelete
}) => {
    const {
        loading,
        fetchCategories,
        getCategoryName,
        getCategoryIcon,
        error
    } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) return <div>Đang tải danh mục...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    const getAmountStyles = () =>
        type ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/5'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                <SvgHandle name={getCategoryIcon(category)} className='w-6 h-6' color='text-gray-600' />
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className='text-sm text-gray-700 font-medium'>{expensesName} | {getCategoryName(category)}</p>
                    <p className='text-sx text-gray-400 mt-1'>{date}</p>
                </div>

                <div className='flex items-center gap-2'>
                    {!hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            onClick={onDelete}
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium'>
                            {type ? "+" : "-"} {amount}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard