import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import TransferOverview from '../../components/Transfer/TransferList'
import axios from '../../lib/axios'
import toast from 'react-hot-toast';
import SavingInvestList from '../../components/Transfer/SavingInvestList';
import Modal from '../../components/layout/Modal';
import DeleteAlert from '../../components/layout/DeleteAlert';
import CreateTransferPage from '../../components/Create/CreateTransferPage';
import CreateNewSavingTransfer from '../../components/Create/CreateNewSavingTransfer';

const Transfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [savingInvest, setSavingInvest] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        deleteType: null,
        data: null,
    });
    const [onAddNew, setOnAddNew] = useState({ show: false, content: null });


    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const [transferRes, savingInvestRes] = await Promise.all(
                [
                    axios.get("/transfers"),
                    axios.get("/sni/update")
                ]
            );
            setTransfers(transferRes.data.data || []);
            setSavingInvest(savingInvestRes.data.data || [])
        } catch (error) {
            toast.error(error.data.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteItem = async (id) => {
        const typeCheck = openDeleteAlert.deleteType;
        try {
            let res;
            if (typeCheck === "transfer") {
                res = await axios.delete(`transfers/${id}`)
            } else {
                res = await axios.delete(`sni/update/${id}`)
            }
            setOpenDeleteAlert({ show: false, data: res.data.message, deleteType: null });
            toast.success(res.data.message);
            fetchData();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error?.data?.message || error.message
            );
        }
    };

    const handleSubmit = async (transfer) => {
        const { sourceWalletId, destinationWalletId, amount, date, transferFee, note } = transfer;
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
        setLoading(true);
        try {
            const newTransfer = {
                sourceWalletId: sourceWalletId,
                destinationWalletId: destinationWalletId,
                transferFee: parseFloat(transferFee),
                amount: parseFloat(amount),
                note: note,
                date: date,
            };
            await axios.post("/transfers/create", newTransfer);
            fetchData();
            setOnAddNew({ show: false, content: null });
            toast.success("Transfer created successfully!");
        } catch (error) {
            console.log("Error creating transaction", error)
            toast.error("Falied to create transaction")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitSaving = async (saving) => {
        const { parentId, date, amount, walletId, type, fee } = saving;
        const requiredFields = ["parentId", "date", "amount", "amount", "walletId", "type"];
        for (const field of requiredFields) {
            const value = saving[field]
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
            const newSaving = {
                parentId: parentId,
                walletId: walletId,
                fee: parseFloat(fee),
                amount: parseFloat(amount),
                type: type,
                date: date,
            };

            await axios.post("/sni/update/create", newSaving);
            setOnAddNew({ show: false, content: null });
            fetchData();
            toast.success("Transfer created successfully!");
        } catch (error) {
            console.log("Error creating transaction", error)
            toast.error("Falied to create transaction")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
        return () => { };
    }, [])

    return (
        <DashboardLayout activeMenu={"Transfer"}>
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <TransferOverview
                        transfer={transfers}
                        onAddTransfer={() => setOnAddNew({ show: true, content: "transfer" })}
                        onDelete={(id) => {
                            setOpenDeleteAlert({
                                show: true,
                                deleteType: "transfer",
                                data: id
                            })
                        }}
                    />
                    <SavingInvestList
                        data={savingInvest}
                        onAddSavingInvest={() => setOnAddNew({ show: true, content: "saving" })}
                        onDelete={(id) => {
                            setOpenDeleteAlert({
                                show: true,
                                deleteType: "saving",
                                data: id
                            })
                        }}
                    />
                </div>
                <Modal
                    isOpen={onAddNew.show}
                    onClose={() => setOnAddNew({ show: false })}
                    title={"Add new " + onAddNew.content}
                >

                    {onAddNew.content === "transfer" ?
                        <CreateTransferPage
                            onAddTransaction={handleSubmit}
                            type={onAddNew.content}
                        /> :
                        <CreateNewSavingTransfer
                            onAddTransaction={handleSubmitSaving}
                            type={onAddNew.content}
                        />}

                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete"
                >
                    <DeleteAlert
                        content={"Are you sure you want to delete this " + openDeleteAlert.deleteType + " ?"}
                        onDelete={() => deleteItem(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout >
    )
}

export default Transfers