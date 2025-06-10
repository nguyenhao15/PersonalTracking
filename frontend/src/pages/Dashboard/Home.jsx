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


const Home = () => {
    const navigate = useNavigate();
    const [dashboarData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

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
                <ThisMonthExpenses
                    transactions={sortByDate(dashboarData?.thisMonthExpenses || [], false)}
                    onSeeMore={() => navigate("/expenses")}
                />
                <ExpensesOverview
                    topfiveCategories={dashboarData?.topFiveCategory}
                />

                <RecentTransactions
                    transactions={sortByDate(dashboarData?.lastThirtyDaysExpenses || [], false)}
                    onSeeMore={() => navigate("/expenses")}
                />

                <Last30DaysExpenses
                    data={dashboarData?.thisMonthExpenses || []}
                />
                <ThisMonthIncome
                    transactions={sortByDate(dashboarData?.thisMonthIncome || [], false)}
                    onSeeMore={() => navigate("/income")}
                />
                {/* lastSixtyDaysIncome */}
                <Last60DaysIncome
                    transactions={sortByDate(dashboarData?.lastSixtyDaysIncome || [], false)}
                    onSeeMore={() => navigate("/income")}
                />
            </div>


        </DashboardLayout >
    );
};

export default Home