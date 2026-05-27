import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-gifted-charts';
import { formatPrice, toArray } from '@/utils/formatValue';

interface CategoryBreakdownProps {
  transactions: any[];
}

export const CategoryBreakdownCard = ({
  transactions,
}: CategoryBreakdownProps) => {
  const [typeFilter, setTypeFilter] = useState<'expense' | 'income'>('expense');

  // 1. Tính toán cơ cấu chi tiêu / thu nhập theo danh mục
  const categoryData = useMemo(() => {
    const list = toArray<any>(transactions);
    const filtered = list.filter((tx) => tx.transactionType === typeFilter);

    const categoriesMap: Record<
      string,
      { name: string; amount: number; color?: string }
    > = {};
    let totalValue = 0;

    filtered.forEach((tx) => {
      const categoryName = tx.category?.name || 'Uncategorized';
      const categoryColor = tx.category?.color || '#588157';
      const amount = Number(tx.originalAmount || tx.baseAmount || 0);

      totalValue += amount;
      if (categoriesMap[categoryName]) {
        categoriesMap[categoryName].amount += amount;
      } else {
        categoriesMap[categoryName] = {
          name: categoryName,
          amount,
          color: categoryColor,
        };
      }
    });

    const sortedList = Object.values(categoriesMap).sort(
      (a, b) => b.amount - a.amount,
    );

    return {
      list: sortedList.map((item) => ({
        ...item,
        percentage:
          totalValue > 0 ? Math.round((item.amount / totalValue) * 100) : 0,
      })),
      totalValue,
    };
  }, [transactions, typeFilter]);

  // 2. Định dạng dữ liệu cho Pie Chart (Gifted Charts)
  const pieData = useMemo(() => {
    return categoryData.list.map((item) => ({
      value: item.amount,
      color: item.color || '#588157',
      text: item.percentage > 5 ? `${item.percentage}%` : '',
    }));
  }, [categoryData]);

  // 3. Component nhãn ở giữa Donut Chart
  const renderCenterLabel = () => {
    const total = categoryData.totalValue;
    const formattedTotal = total >= 1000000 
      ? `${(total / 1000000).toFixed(1)}M` 
      : total >= 1000 
      ? `${Math.round(total / 1000)}k` 
      : String(total);

    return (
      <View className='items-center justify-center'>
        <Text className='text-white text-xs font-bold'>{formattedTotal}</Text>
        <Text className='text-[#888] text-[7px] font-bold uppercase tracking-widest mt-0.5'>Total</Text>
      </View>
    );
  };

  return (
    <View className='bg-surface border border-white/5 rounded-2xl p-4 shadow-sm mb-5'>
      <View className='flex-row justify-between items-center mb-1'>
        <Text className='text-text-primary text-base font-bold'>
          Category Breakdown
        </Text>

        {/* Tab switch */}
        <View className='flex-row bg-background-light/40 border border-white/5 rounded-full p-0.5'>
          <TouchableOpacity
            onPress={() => setTypeFilter('expense')}
            className={`px-3 py-1 rounded-full ${
              typeFilter === 'expense' ? 'bg-[#a73b21]' : ''
            }`}
          >
            <Text className='text-white text-[10px] font-bold uppercase'>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeFilter('income')}
            className={`px-3 py-1 rounded-full ${
              typeFilter === 'income' ? 'bg-primary' : ''
            }`}
          >
            <Text className='text-white text-[10px] font-bold uppercase'>
              Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className='text-text-secondary text-xs mb-5'>
        Visual allocation of daily flow by transaction category
      </Text>

      {categoryData.list.length === 0 ? (
        <View className='bg-background-light/30 border border-white/5 rounded-xl p-6 items-center justify-center'>
          <Ionicons name='pie-chart-outline' size={32} color='#888' />
          <Text className='text-text-secondary text-xs mt-2 italic'>
            No transactions found for this type.
          </Text>
        </View>
      ) : (
        <View>
          {/* Pie/Donut Chart visual render */}
          <View className='items-center justify-center py-4 mb-4'>
            <PieChart
              donut
              radius={65}
              innerRadius={45}
              data={pieData}
              showText
              textColor='#ffffff'
              textSize={8}
              fontWeight='bold'
              centerLabelComponent={renderCenterLabel}
            />
          </View>

          {/* List of Category Allocations */}
          <View className='gap-3'>
            {categoryData.list.map((item, index) => (
              <View
                key={`row-${index}`}
                className='flex-row justify-between items-center'
              >
                <View className='flex-row items-center gap-2.5 flex-1 pr-3'>
                  <View
                    className='w-3.5 h-3.5 rounded-full border border-white/10'
                    style={{ backgroundColor: item.color || '#588157' }}
                  />
                  <Text className='text-text-primary text-sm font-semibold flex-1'>
                    {item.name}
                  </Text>
                  <Text className='text-text-secondary text-xs font-semibold'>
                    {item.percentage}%
                  </Text>
                </View>
                <Text className='text-text-primary text-sm font-bold'>
                  {formatPrice(item.amount)}
                </Text>
              </View>
            ))}
          </View>

          {/* Total aggregate display */}
          <View className='border-t border-background-light mt-5 pt-4 flex-row justify-between items-center'>
            <Text className='text-text-secondary text-xs font-bold uppercase tracking-wider'>
              Total {typeFilter === 'expense' ? 'Expenses' : 'Income'}
            </Text>
            <Text
              className={`text-lg font-black ${
                typeFilter === 'expense' ? 'text-[#a73b21]' : 'text-primary'
              }`}
            >
              {formatPrice(categoryData.totalValue)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CategoryBreakdownCard;
