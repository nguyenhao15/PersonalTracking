import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { formatThousands } from '../lib/util';
import axios from 'axios';

const TransferDetails = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const numericFields = ["amount", "transferFee"];
    const [transfer, setTransfer] = useState({
        sourceWalletId: "",
        destinationWalletId: "",
        amount: 0,
        transferFee: 0,
        date: "",
        note: ""
    })

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [walletRes, transfer] = await Promise.all([
                    axios.get("/wallets"),
                    axios.get(`transfers/${id}`)
                ]);

                setWallets(walletRes.data.data)

                const data = transfer.data.data;
                setTransfer({
                    sourceWalletId: data.sourceWalletId || "",
                    destinationWalletId: data.destinationWalletId || "",
                    transferFee: data.transferFee,
                    amount: data.amount || "",
                    note: data.note || "",
                    date: data.date?.slice(0, 10) || "",
                })
            } catch (error) {
                console.log("Error in fetching transaction", error)
                toast.error("Failed to fetch the transaction")
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (transfer.sourceWalletId === transfer.destinationWalletId) {
            setTransfer((prev) => ({
                ...prev,
                destinationWalletId: "",
            }));
        }
    }, [transfer.sourceWalletId, transfer.destinationWalletId])

    const handleSave = async () => {
        const requiredFields = ["sourceWalletId", "destinationWalletId", "amount", "date"];
        for (const field of requiredFields) {
            const value = transfer[field]
            if (value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                toast.error(`Vui lòng điền đầy đủ trường thông tin ${field}`);
                return; // Dừng submit nếu có trường trống
            }
        }
        setSaving(true);
        try {
            const updateTransfer = {
                sourceWalletId: transfer.sourceWalletId || "",
                destinationWalletId: transfer.destinationWalletId || "",
                transferFee: transfer.transferFee,
                amount: transfer.amount || "",
                note: transfer.note || "",
                date: transfer.date?.slice(0, 10) || "",
            };
            await api.patch(`/transfers/${id}`, updateTransfer)
            toast.success("Update transfer successfully!");
            navigate("/transfers")
        } catch (error) {
            console.log("Error update transfer", error)
            toast.error("Falied to update transfer")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure to delete this transaction")) return;
        try {
            await api.delete(`/transfers/${id}`)
            navigate("/transfers")
            toast.success("Transfer deleted successfully!")
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Faild to delete transfer");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let processedValue = value;

        if (numericFields.includes(name)) {
            const raw = value.replace(/\./g, "");
            if (!/^\d*$/.test(raw)) return;
            processedValue = raw === "" ? "" : Number(raw);
        }

        setTransfer((prev) => ({ ...prev, [name]: processedValue }));
    }

    const displayBalance = (walletIdValue) => {
        return wallets.find(w => w.walletId.toString() === walletIdValue)
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center grow'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        )
    }

    return (
        <div className='min-h-screen w-full'>
            <div className="container mx-auto px-4 py-8">
                <div className='max-w-2xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <Link to="/transfers" className='btn btn-ghost' >
                            <ArrowLeftIcon className='h-5 w-5' />
                            Back to Transfer
                        </Link>
                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='h-5 w-5' />
                            Delete Transaction
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">

                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className='label-text'>Transfer Note</span>
                                </label>
                                <input
                                    type="text"
                                    name='note'
                                    placeholder='Transfer note'
                                    className='input input-bordered'
                                    value={transfer.note}
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
                                    value={transfer.sourceWalletId}
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
                                {displayBalance(transfer.sourceWalletId) && (
                                    <div className='mt-2 text-sm text-white font-bold px-2 '>
                                        Balance: {displayBalance(transfer.sourceWalletId).balance.toLocaleString('vi-VN')} VND
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
                                    value={formatThousands(transfer.amount)}
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
                                    value={formatThousands(transfer.transferFee)}
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
                                    value={transfer.destinationWalletId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" >-- Select Wallet --</option>
                                    {wallets
                                        .filter((wallet) => wallet.walletId !== transfer.sourceWalletId)
                                        .map((wallet) => (
                                            <option
                                                key={wallet.walletId}
                                                value={wallet.walletId}
                                            >
                                                {wallet.name}
                                            </option>
                                        ))}
                                </select>
                                {transfer.destinationWalletId != "" && displayBalance(transfer.destinationWalletId) && (
                                    <div className='mt-2 text-sm text-white font-bold px-2 '>
                                        Balance: {displayBalance(transfer.destinationWalletId).balance.toLocaleString('vi-VN')} VND
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
                                    value={transfer.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='card-actions justify-end'>
                                <button type='submit' className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferDetails