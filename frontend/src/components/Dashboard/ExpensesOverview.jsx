import React, { useEffect } from 'react'
import CustomePieChart from '../Charts/CustomPieChart'
import useCategoriesStore from '../../stores/useCategoriesStore'

const COLORS = ["#264653", "#2a9D8f", "#e9c46a", "#f4a261", "#e76f51"]

const ExpensesOverview = ({ topfiveCategories = [] }) => {
    const {
        loading,
        fetchCategories,
        getCategoryName,
        error
    } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) return <div>Đang tải danh mục...</div>;
    if (error) return <div>Lỗi: {error}</div>;


    const formatedData = topfiveCategories.map(item => ({
        name: getCategoryName(item.categoryId) || "",
        value: item.totalValue || 0
    }));

    const totalExpenses = formatedData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className='card'>
            <div className='felx items-center justify-between'>
                <h5 className='text-xl font-semibold mb-4'>Hạng mục chi tiêu</h5>
            </div>
            <CustomePieChart
                data={formatedData}
                label="Total Expenses"
                totalAmount={totalExpenses}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default ExpensesOverview