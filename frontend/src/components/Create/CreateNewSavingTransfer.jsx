import React, { useState } from 'react'
import useWalletStore from '../../stores/useWalletStore';
import useSavingInvestStore from '../../stores/useSavingInvestStore';
import { formatThousands } from '../../lib/util';

const CreateNewSavingTransfer = ({ onAddTransaction }) => {
    const [transaction, setTransaction] = useState({
        parentId: "",
        date: "",
        walletId: "",
        type: true,
        amount: 0,
        fee: 0,
    });
    const {
        savingAndInvest
    } = useSavingInvestStore();
    const {
        wallets
    } = useWalletStore();

    const numericFields = ["amount", "fee"];
    console.log("Transactions : ", transaction)

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
                    <span className='label-text'>Saving Title</span>
                </label>
                <select
                    name="parentId"
                    className='select select-bordered'
                    value={transaction.parentId}
                    onChange={handleChange}
                    required
                >
                    <option value="" >-- Select Saving --</option>
                    {savingAndInvest
                        .filter(c => c.active === "active")
                        .map((c) => (
                            <option
                                key={c._id}
                                value={c._id}
                            >
                                {c.title}
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
                    <span className='label-text'>Fee</span>
                </label>
                <input
                    type="text"
                    placeholder='Fee'
                    name='fee'
                    className='input input-bordered'
                    value={formatThousands(transaction.fee)}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>
            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Transfer type</span>
                </label>
                <div className="flex gap-4">
                    {[
                        { label: "Gửi vào", value: true, style: "radio-success" },
                        { label: "Rút ra", value: false, style: "radio-error" },
                    ].map((item) => (
                        <label key={item.value} className="label cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value={item.value}
                                checked={transaction.type === item.value}
                                onChange={(e) =>
                                    setTransaction((prev) => ({ ...prev, type: e.target.value === "true" }))}
                                className={`radio ${item.style}`}
                            />
                            <span className="label-text ml-2">{item.label}</span>
                        </label>
                    ))}
                </div>
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

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddTransaction(transaction)}
                >
                    Add new
                </button>
            </div>
        </div>
    )
}

export default CreateNewSavingTransfer