import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axios from '../../lib/axios'
import Modal from '../../components/layout/Modal';
import CreatePage from '../CreatePage';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/layout/DeleteAlert';
import TransactionList from '../../components/layout/TransactionList';

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Get All Income Details
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const res = await axios.get("/transactions/income");
            if (res.data) {
                setIncomeData(res.data.data);
            }
        } catch (error) {
            console.log("Something went wrong in fetching income. Please try again ", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const { expensesName, walletId, amount, category, date } = income;

        const requiredFields = ["expensesName", "walletId", "amount", "category", "date"];
        for (const field of requiredFields) {
            const value = income[field]
            if (value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                toast.error(`Vui lòng điền đầy đủ thông tin`);
                return; // Dừng submit nếu có trường trống
            }
        }
        setLoading(true);
        try {
            const updateAmount = parseFloat(amount);
            const newTransaction = {
                expensesName: expensesName,
                walletId: walletId,
                type: true,
                amount: updateAmount,
                category: category,
                date: date,
            };
            await axios.post("/transactions/create", newTransaction);
            toast.success("Transaction created successfully!");
            setOpenAddIncomeModal(false);
            fetchIncomeDetails();
        } catch (error) {
            console.log("Error creating transaction", error.message)
            toast.error("Falied to create transaction")
        } finally {
            setLoading(false)
        }

    };

    const deleteIncome = async (id) => {
        try {
            const res = await axios.delete(`transactions/${id}`);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success(res.data.message);
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchIncomeDetails();

        return () => { };
    }, [])

    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <TransactionList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                    />

                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <div>
                        <CreatePage onAddTransaction={handleAddIncome} type={true} />
                    </div>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income ?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Income