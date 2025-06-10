import { useEffect, useState } from 'react'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/util';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import TransactionNotFound from '../components/TransactionNotFound';
import axios from 'axios';


const TransferPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [walletRes, transRes] = await Promise.all([
                    axios.get("/wallets"),
                    axios.get("/transfers")
                ]);
                setWallets(walletRes.data.data)
                setTransfers(transRes.data.data)
            } catch (error) {
                console.log("Error fetching data", error);
                toast.error("Falied to load data")
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [])

    const getWalletName = (walletId) => {
        const wallet = wallets.find(w => w.walletId === walletId);
        return wallet ? wallet.name : "Missing wallet";
    }

    const handleDelete = async (e, id) => {
        if (!window.confirm("Are you sure to delete this transaction")) return;
        try {
            setLoading(true)
            await api.delete(`/transfers/${id}`)
            setTransfers((prev) => prev.filter(transfers => transfers._id !== id))
            toast.success("Transaction deleted successfully!")
            setLoading(false)
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Faild to delete transaction");
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='w-full grow'>
            {loading && <div className='text-center text-primary py-10'>Loading transfers...</div>}
            {transfers.length === 0 && !loading && <TransactionNotFound />}
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {transfers.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table ">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Source Wallet</th>
                                    <th>Amount</th>
                                    <th>Fee</th>
                                    <th>Destination Wallet</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {transfers.map((t, index) => (
                                    <tr key={t._id} className='text-sm'>
                                        <th>{index + 1}</th>
                                        <td>{getWalletName(t.sourceWalletId)}</td>
                                        <td>{t.amount.toLocaleString()}</td>
                                        <td>{t.transferFee.toLocaleString()}</td>
                                        <td>{getWalletName(t.destinationWalletId)}</td>
                                        <td>{(t.amount + t.transferFee).toLocaleString()}</td>
                                        <td>{formatDate(t.date)}</td>
                                        <td>
                                            <div className='flex items-center gap-1'>
                                                <Link to={`/transfers/${t._id}`}>
                                                    <PenSquareIcon className="size-5" />
                                                </Link>
                                                <button className='btn btn-ghost btn-xs text-error'>
                                                    <Trash2Icon className='size-4' onClick={(e) => handleDelete(e, t._id)} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

    )
}
export default TransferPage