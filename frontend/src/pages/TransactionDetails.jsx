import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { formatThousands } from '../lib/util';

const TransactionDetails = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [transaction, setTransaction] = useState({
        expensesName: "",
        walletId: "",
        type: "",
        amount: "",
        category: "",
        importance: "",
        date: "",
    })

    const navigate = useNavigate()

    const { id } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [walletRes, transRes] = await Promise.all([
                    api.get("/wallets"),
                    api.get(`transactions/${id}`)
                ]);

                setWallets(walletRes.data.data)

                const data = transRes.data.data;
                setTransaction({
                    expensesName: data.expensesName || "",
                    walletId: data.walletId || "",
                    type: data.type,
                    amount: data.amount || "",
                    category: data.category || "",
                    importance: data.importance || "",
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = async () => {
        const requiredFields = ["expensesName", "walletId", "type", "amount", "category", "importance", "date"];
        for (const field of requiredFields) {
            const value = transaction[field]
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
            let rawAmount = transaction.amount || "";
            const amount = parseFloat(rawAmount);
            const updateTransaction = {
                expensesName: transaction.expensesName,
                walletId: transaction.walletId,
                type: transaction.type,
                amount: amount,
                category: transaction.category,
                importance: transaction.importance,
                date: transaction.date,
            }
            await api.patch(`/transactions/${id}`, updateTransaction)
            toast.success("Update transaction successfully!");
            navigate("/transactions")
        } catch (error) {
            console.log("Error update transaction", error)
            toast.error("Falied to update transaction")
        } finally {
            setSaving(false)
        }
    }

    const selectedWallet = wallets.find(w => w.walletId.toString() === transaction.walletId);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure to delete this transaction")) return;
        try {
            await api.delete(`/transactions/${id}`)
            navigate("/transactions")
            toast.success("Transaction deleted successfully!")
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Faild to delete transaction");
        }
    };

    const handleAmountChange = (e) => {
        const input = e.target.value;
        const raw = input.replace(/\./g, "");
        if (!/^\d*$/.test(raw)) return;
        setTransaction((prev) => ({ ...prev, amount: raw }));
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center grow'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        )
    }

    return (
        <div className='min-h-screen grow'>
            <div className="container mx-auto px-4 py-8">
                <div className='max-w-2xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <Link to="/transactions" className='btn btn-ghost' >
                            <ArrowLeftIcon className='h-5 w-5' />
                            Back to Transactions
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
                                    <span className='label-text'>Expenses Name</span>
                                </label>
                                <input
                                    type="text"
                                    name='expensesName'
                                    placeholder='Expenses Name'
                                    className='input input-bordered'
                                    value={transaction.expensesName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-control mb-4'>
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
                                    <div className='mt-2 text-sm text-white font-bold px-2 '>
                                        Balance: {selectedWallet.balance.toLocaleString('vi-VN')} VND
                                    </div>
                                )}
                            </div>

                            <div className='form-control mb-4'>
                                <label className="label">Số tiền</label>
                                <input
                                    type="text"
                                    name='amount'
                                    className='input input-bordered'
                                    value={formatThousands(transaction.amount)}
                                    onChange={handleAmountChange}
                                    required
                                />
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
                                    value={transaction.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className='label-text'>Transaction Type</span>
                                </label>
                                <div className='flex gap-4'>
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="true"
                                            checked={transaction.type === true}
                                            onChange={() => setTransaction(prev => ({ ...prev, type: true }))}
                                            className="radio radio-success"
                                        />
                                        <span className="label-text ml-2">Thu nhập</span>
                                    </label>

                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="false"
                                            checked={transaction.type === false}
                                            onChange={() => setTransaction(prev => ({ ...prev, type: false }))}
                                            className="radio radio-error"
                                        />
                                        <span className="label-text ml-2">Chi tiêu</span>
                                    </label>
                                </div>
                            </div>

                            <div className='form-control mb-4'>
                                <label className="label">Phân loại</label>
                                <input
                                    type="text"
                                    name='category'
                                    className='input input-bordered'
                                    value={transaction.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className='label-text'>Importance</span>
                                </label>
                                <div className='flex gap-4'>
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="importance"
                                            checked={transaction.importance === "Neccessary"}
                                            value="Neccessary"
                                            onChange={handleChange}
                                            className="radio radio-success"
                                        />
                                        <span className="label-text ml-2">Cần thiết</span>
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="importance"
                                            checked={transaction.importance === "Nice to have"}
                                            value="Nice to have"
                                            onChange={handleChange}
                                            className="radio radio-secondary"
                                        />
                                        <span className="label-text ml-2">Nice to have</span>
                                    </label>
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="importance"
                                            checked={transaction.importance === "No neccessary"}
                                            value="No neccessary"
                                            onChange={handleChange}
                                            className="radio radio-error"
                                        />
                                        <span className="label-text ml-2">Không cần thiết</span>
                                    </label>
                                </div>
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

export default TransactionDetails