import React, { useEffect, useState } from 'react'

import { formatThousands } from '../../lib/util';

import useWalletStore from '../../stores/useWalletStore';

const CreateTransferPage = ({ onAddTransaction }) => {

    const numericFields = ["amount", "transferFee"];
    const {
        wallets,
        fetchWallets
    } = useWalletStore();

    const [form, setForm] = useState({
        sourceWalletId: "",
        destinationWalletId: "",
        amount: 0,
        transferFee: 0,
        date: "",
        note: ""
    })

    useEffect(() => {
        if (form.sourceWalletId === form.destinationWalletId) {
            setForm((prev) => ({
                ...prev,
                destinationWalletId: "",
            }));
        }
    }, [form.sourceWalletId, form.destinationWalletId])

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (numericFields.includes(name)) {
            const raw = value.replace(/\./g, "");
            if (!/^\d*$/.test(raw)) return;
            processedValue = raw === "" ? "" : Number(raw);
        }
        setForm((prev) => ({ ...prev, [name]: processedValue }));
    }

    const displayBalance = (walletIdValue) => {
        return wallets.find(w => w.walletId.toString() === walletIdValue)
    }

    return (

        <div className='flex flex-col'>
            {/* Note */}
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Transfer Note</span>
                </label>
                <input
                    type="text"
                    name='note'
                    placeholder='Transfer note'
                    className='input input-bordered'
                    value={form.note}
                    onChange={handleChange}
                />
            </div>

            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Source Wallet</span>
                </label>
                <select
                    name="sourceWalletId"
                    className='select select-bordered'
                    value={form.sourceWalletId}
                    onChange={handleChange}
                    required
                >
                    <option value="" >-- Select Wallet --</option>
                    {wallets
                        .map((wallet) => (
                            <option
                                key={wallet.walletId}
                                value={wallet.walletId}
                            >
                                {wallet.name}
                            </option>
                        ))}
                </select>
                {displayBalance(form.sourceWalletId) && (
                    <div className='mt-2 text-sm text-black font-bold px-2 '>
                        Balance: {displayBalance(form.sourceWalletId).balance.toLocaleString('vi-VN')} VND
                    </div>
                )}
            </div>

            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Amount</span>
                </label>
                <input
                    type="text"
                    placeholder='Amount'
                    name='amount'
                    className='input input-bordered'
                    value={formatThousands(form.amount)}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>

            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Transfer fee</span>
                </label>
                <input
                    type="text"
                    placeholder='Transfer Fee'
                    name='transferFee'
                    className='input input-bordered'
                    value={formatThousands(form.transferFee)}
                    onChange={handleChange}
                    min="1"
                />
            </div>

            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Destination Wallet</span>
                </label>
                <select
                    name="destinationWalletId"
                    className='select select-bordered'
                    value={form.destinationWalletId}
                    onChange={handleChange}
                    required
                >
                    <option value="" >-- Select Wallet --</option>
                    {wallets
                        .filter((wallet) => wallet.walletId !== form.sourceWalletId)
                        .map((wallet) => (
                            <option
                                key={wallet.walletId}
                                value={wallet.walletId}
                            >
                                {wallet.name}
                            </option>
                        ))}
                </select>
                {form.destinationWalletId != "" && displayBalance(form.destinationWalletId) && (
                    <div className='mt-2 text-sm text-black font-bold px-2 '>
                        Balance: {displayBalance(form.destinationWalletId).balance.toLocaleString('vi-VN')} VND
                    </div>
                )}
            </div>

            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Date</span>
                </label>
                <input
                    type="date"
                    placeholder='Date'
                    name='date'
                    className='input input-bordered cursor-pointer'
                    value={form.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='card-actions justify-end'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'

                    setLoading={true}
                    onClick={() => onAddTransaction(form)}
                >
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateTransferPage