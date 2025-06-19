import React, { useEffect, useState } from 'react'
import { formatThousands } from '../../lib/util'
import useWalletStore from '../../stores/useWalletStore'
import useCategoriesStore from '../../stores/useCategoriesStore'

const CreatePage = ({ onAddTransaction, type }) => {
    const [transaction, setTransaction] = useState({
        expensesName: "",
        walletId: "",
        type: "",
        amount: "",
        category: "",
        importance: "",
        date: "",
    });

    const {
        categories,
        fetchCategories
    } = useCategoriesStore();
    const {
        wallets,
        fetchWallets
    } = useWalletStore();

    useEffect(() => {
        fetchCategories();
        fetchWallets();
    }, [fetchCategories, fetchWallets]);

    const numericFields = ["amount"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (numericFields.includes(name)) {
            const raw = value.replace(/\./g, "");
            if (!/^\d*$/.test(raw)) return;
            processedValue = raw === "" ? "" : Number(raw);
        }
        setTransaction((prev) => ({ ...prev, [name]: processedValue }));
    }


    const selectedWallet = wallets.find(w => w.walletId.toString() === transaction.walletId);

    return (
        <div className='flex flex-col'>
            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Expenses Name</span>
                </label>
                <input
                    type="text"
                    name='expensesName'
                    placeholder='Expenses Name'
                    className='input input-bordered'
                    value={transaction.expensesName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Category</span>
                </label>
                <select
                    name="category"
                    className='select select-bordered'
                    value={transaction.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" >-- Select Category --</option>
                    {categories
                        .filter(c => c.categoryType === type)
                        .map((c) => (
                            <option
                                key={c._id}
                                value={c._id}
                            >
                                {c.categoryName}
                            </option>
                        ))}
                </select>
            </div>

            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Wallet</span>
                </label>
                <select
                    name="walletId"
                    className='select select-bordered'
                    value={transaction.walletId}
                    onChange={handleChange}
                    required
                >
                    <option value="" >-- Select Wallet --</option>
                    {wallets.map((wallet) => (
                        <option
                            key={wallet.walletId}
                            value={wallet.walletId}
                        >
                            {wallet.name}
                        </option>
                    ))}
                </select>
                {selectedWallet && (
                    <div className='mt-2 text-sm text-gray font-bold px-2 '>
                        Balance: {selectedWallet.balance.toLocaleString('vi-VN')} VND
                    </div>
                )}
            </div>

            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Amount</span>
                </label>
                <input
                    type="text"
                    placeholder='Amount'
                    name='amount'
                    className='input input-bordered'
                    value={formatThousands(transaction.amount)}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>

            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Date</span>
                </label>
                <input
                    type="date"
                    placeholder='Date'
                    name='date'
                    className='input input-bordered cursor-pointer'
                    value={transaction.date}
                    onChange={handleChange}
                    required
                />
            </div>
            {!type &&
                <div className='mb-4 form-control'>
                    <label className="label">
                        <span className='label-text'>Importance</span>
                    </label>
                    <div className="flex gap-4">
                        {[
                            { label: "Cần thiết", value: "Neccessary", style: "radio-success" },
                            { label: "Nice to have", value: "Nice to have", style: "radio-secondary" },
                            { label: "Không cần thiết", value: "No neccessary", style: "radio-error" },
                        ].map((item) => (
                            <label key={item.value} className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="importance"
                                    value={item.value}
                                    checked={transaction.importance === item.value}
                                    onChange={(e) =>
                                        setTransaction((prev) => ({ ...prev, importance: e.target.value }))
                                    }
                                    className={`radio ${item.style}`}
                                />
                                <span className="label-text ml-2">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>}

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddTransaction(transaction)}
                >
                    {type ? "Add Income" : "Add Expense"}
                </button>
            </div>
        </div>
    )
}

export default CreatePage