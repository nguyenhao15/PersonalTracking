import React, { useState } from 'react'
import { formatThousands } from '../../lib/util';

const CreateWalletPage = ({
    editItem,
    onAddWallet
}) => {
    const numericFields = ["initial", "balance"];
    const editData = editItem?.data;

    const [wallet, setWallet] = useState({
        name: editData?.name,
        walletId: editData?.walletId,
        initial: editData?.initial || 0,
        balance: editData?.balance || 0,
        currency: editData?.currency || "VND",
        type: editData?.type,
        walletIcon: editData?.walletIcon || "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (numericFields.includes(name)) {
            const raw = value.replace(/\./g, "");
            if (!/^\d*$/.test(raw)) return;
            processedValue = raw === "" ? "" : Number(raw);
        }
        setWallet((prev) => ({ ...prev, [name]: processedValue }));
    }

    return (
        <div className='flex flex-col'>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Wallet name</span>
                </label>
                <input
                    type="text"
                    name='name'
                    placeholder='Wallet name'
                    className='input input-bordered'
                    value={wallet.name}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Wallet Id</span>
                </label>
                <input
                    type="text"
                    name='walletId'
                    placeholder='Wallet Id'
                    className='input input-bordered'
                    value={wallet.walletId}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Initial</span>
                </label>
                <input
                    type="text"
                    name='initial'
                    placeholder='Initial'
                    className='input input-bordered'
                    value={formatThousands(wallet.initial)}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Balance</span>
                </label>
                <input
                    type="text"
                    name='balance'
                    placeholder='Balance'
                    className='input input-bordered'
                    value={formatThousands(wallet.balance)}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Currency</span>
                </label>
                <input
                    type="text"
                    name='currency'
                    placeholder='Currency'
                    className='input input-bordered'
                    value={wallet.currency}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Type</span>
                </label>
                <input
                    type="text"
                    name='type'
                    placeholder='Bank | Cash | Digital Wallet'
                    className='input input-bordered'
                    value={wallet.type}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Wallet Icon</span>
                </label>
                <input
                    type="text"
                    name='walletIcon'
                    placeholder='Wallet Icon'
                    className='input input-bordered'
                    value={wallet.walletIcon}
                    onChange={handleChange}
                />
            </div>
            <div className='card-actions justify-end'>
                <button
                    type='button'
                    className='add-btn add-btn-fill uppercase'
                    onClick={() => onAddWallet(wallet)}
                >
                    {editItem.type}
                </button>
            </div>
        </div>
    )
}

export default CreateWalletPage