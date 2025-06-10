import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import axios from '../../lib/axios';
import toast from 'react-hot-toast';
import ExpensesOverview from '../../components/Expenses/ExpensesOverview';
import Modal from '../../components/layout/Modal';
import CreatePage from '../CreatePage';
import TransactionList from '../../components/layout/TransactionList';
import DeleteAlert from '../../components/layout/DeleteAlert';

const Expenses = () => {
    const [expensesData, setExpensesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);

    const fetchExpensesDetails = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await axios.get("/transactions/expenses");
            if (res.data) {
                setExpensesData(res.data.data);
            }
        } catch (error) {
            console.log("Something went wrong in fetching income. Please try again ", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExpenses = async (transaction) => {
        const { expensesName, walletId, amount, category, date, importance } = transaction;

        const requiredFields = ["expensesName", "walletId", "amount", "category", "date", "importance"];
        for (const field of requiredFields) {
            const value = transaction[field]
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
                type: false,
                amount: updateAmount,
                importance: importance,
                category: category,
                date: date,
            };
            await axios.post("/transactions/create", newTransaction);
            toast.success("Transaction created successfully!");
            setOpenAddExpensesModal(false);
            fetchExpensesDetails();
        } catch (error) {
            console.log("Error creating transaction", error.message)
            toast.error("Falied to create transaction")
        } finally {
            setLoading(false)
        }

    };

    const deleteExpenses = async (id) => {
        try {
            const res = await axios.delete(`transactions/${id}`);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success(res.data.message);
            fetchExpensesDetails();
        } catch (error) {
            console.error(
                "Error deleting expenses:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchExpensesDetails();

        return () => { };
    }, []);


    const todayValue = new Date();
    const currentMonth = todayValue.getMonth();
    const currentYear = todayValue.getFullYear();

    const expensesThisMonth = expensesData.filter(item => {
        const itemDate = new Date(item.date);
        return (
            itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
        );
    })

    return (
        <DashboardLayout activeMenu="Expenses">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <ExpensesOverview
                            transactions={expensesThisMonth}
                            onExpensesIncome={() => setOpenAddExpensesModal(true)}
                        />
                    </div>
                    <TransactionList
                        transactions={expensesData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                    />

                </div>

                <Modal
                    isOpen={openAddExpensesModal}
                    onClose={() => setOpenAddExpensesModal(false)}
                    title="Add Expense"
                >
                    <CreatePage onAddTransaction={handleExpenses} type={false} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expenses"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expenses ?"
                        onDelete={() => deleteExpenses(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expenses