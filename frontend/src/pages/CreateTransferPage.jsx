import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { formatThousands } from '../lib/util';
import axios from 'axios';

const CreateTransferPage = () => {
    const [loading, setLoading] = useState(false);
    const [wallets, setWallets] = useState([]);

    const numericFields = ["amount", "transferFee"];


    const navigate = useNavigate()

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const res = await axios.get("/wallets");
                setWallets(res.data.data);
            } catch (error) {
                console.log("Failed to fetch wallets", error)
                toast.error("Failed to fetch wallets")
            }
        };
        fetchWallets();
    }, []);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["sourceWalletId", "destinationWalletId", "amount", "date"];
        for (const field of requiredFields) {
            const value = form[field]
            if (value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                toast.error(`Vui lòng điền đầy đủ trường thông tin ${field}`);
                return; // Dừng submit nếu có trường trống
            }
        }
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const newTransfer = {
                sourceWalletId: formData.get("sourceWalletId"),
                destinationWalletId: formData.get("destinationWalletId"),
                transferFee: form.transferFee,
                amount: form.amount,
                note: formData.get("note"),
                date: formData.get("date"),
            };
            await axios.post("/transfers/create", newTransfer)
            toast.success("Transfer created successfully!");
            navigate("/transfers")
        } catch (error) {
            console.log("Error creating transaction", error)
            toast.error("Falied to create transaction")
        } finally {
            setLoading(false)
        }
    }

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
        <div className=' grow'>
            <div className='container mx-auto px-4 py-4'>
                <div className='max-w-2xl mx-auto'>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>Create New Transfer</h2>
                            <form onSubmit={handleSubmit}>
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
                                        <div className='mt-2 text-sm text-white font-bold px-2 '>
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
                                        <div className='mt-2 text-sm text-white font-bold px-2 '>
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
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? "Creating..." : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTransferPage