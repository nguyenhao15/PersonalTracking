import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router';
import axios from '../../lib/axios';
import InfoCard from '../../components/Cards/InfoCard';
import { BanknoteArrowDown, BanknoteArrowUp, Coins, WalletMinimal } from 'lucide-react';
import { formatThousands, sortByDate } from '../../lib/util';
import ExpensesOverview from '../../components/Dashboard/ExpensesOverview';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import ThisMonthExpenses from '../../components/Dashboard/ThisMonthExpenses';
import ThisMonthIncome from '../../components/Dashboard/ThisMonthIncome';
import Last60DaysIncome from '../../components/Dashboard/Last60DaysIncome';
import WalletOverview from '../../components/Dashboard/WalletOverview';
import useWalletStore from '../../stores/useWalletStore';
import toast from 'react-hot-toast';
import Modal from '../../components/layout/Modal';
import DeleteAlert from '../../components/layout/DeleteAlert';


const Home = () => {
    const navigate = useNavigate();
    const [dashboarData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { wallets, fetchWallets } = useWalletStore();
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })


    const deleteExpenses = async (id) => {
        try {
            const res = await axios.delete(`transactions/${id}`);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success(res.data.message);
            fetchDashboardData();
        } catch (error) {
            console.error(
                "Error deleting expenses:",
                error.response?.data?.message || error.message
            );
        }
    };

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get("/dashboard");
            if (response.data) {
                setDashboardData(response.data)
            }
        } catch (error) {
            console.log("Something went wrong. Please try again", error)
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    console.log(wallets);

    useEffect(() => {
        fetchDashboardData();
        return () => { }
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard" >
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-5'>
                    <InfoCard
                        icon={<WalletMinimal />}
                        label="Total Balance"
                        value={formatThousands(dashboarData?.totalBalance || 0)}
                        color="bg-blue-500"
                    />
                    <InfoCard
                        icon={<BanknoteArrowDown />}
                        label="Total Expenses"
                        value={formatThousands(dashboarData?.totalExpenses || 0)}
                        color="bg-red-500"
                    />
                    <InfoCard
                        icon={<BanknoteArrowUp />}
                        label="Total Income"
                        value={formatThousands(dashboarData?.totalIncome || 0)}
                        color="bg-green-500"
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

                <WalletOverview
                    walletData={wallets}
                    onSeeMore={() => navigate("/wallets")}
                />
                <ThisMonthExpenses
                    transactions={sortByDate(dashboarData?.thisMonthExpenses || [], false)}
                    onSeeMore={() => navigate("/expenses")}
                />

                <RecentTransactions
                    transactions={sortByDate(dashboarData?.lastThirtyDaysExpenses || [], false)}
                    onSeeMore={() => navigate("/expenses")}
                />
                <ThisMonthIncome
                    transactions={sortByDate(dashboarData?.thisMonthIncome || [], false)}
                    onSeeMore={() => navigate("/income")}
                />
                <ExpensesOverview
                    topfiveCategories={dashboarData?.topFiveCategory}
                />

                <Last30DaysExpenses
                    data={dashboarData?.thisMonthExpenses || []}
                />
            </div>
            {/* <Modal
                isOpen={openAddExpensesModal}
                onClose={() => setOpenAddExpensesModal(false)}
                title="Add Expense"
            >
                <CreatePage onAddTransaction={handleExpenses} type={false} />
            </Modal> */}

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
        </DashboardLayout >
    );
};

export default Home