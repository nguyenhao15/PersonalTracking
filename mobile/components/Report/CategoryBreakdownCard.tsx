import React, { useMemo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-gifted-charts';
import { formatPrice, toArray } from '@/utils/formatValue';

const screenWidth = Dimensions.get('window').width;

// ====================================================
// Default color palette – used when categories lack a color
// ====================================================
const PALETTE = [
  '#406841',
  '#a73b21',
  '#5e632e',
  '#536450',
  '#355c36',
  '#646833',
  '#475745',
  '#791903',
  '#525623',
  '#4f604d',
];

interface CategoryBreakdownProps {
  transactions: any[];
}

export const CategoryBreakdownCard = ({
  transactions,
}: CategoryBreakdownProps) => {
  const [typeFilter, setTypeFilter] = useState<'expense' | 'income'>(
    'expense',
  );

  // ── Aggregate by category ──
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
      const categoryColor = tx.category?.color;
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
      list: sortedList.map((item, index) => ({
        ...item,
        color: item.color || PALETTE[index % PALETTE.length],
        percentage:
          totalValue > 0 ? Math.round((item.amount / totalValue) * 100) : 0,
      })),
      totalValue,
    };
  }, [transactions, typeFilter]);

  // ── PieChart data ──
  const pieData = useMemo(() => {
    if (categoryData.list.length === 0) {
      return [{ value: 1, color: '#eaf0e5', text: '' }];
    }
    return categoryData.list.map((item) => ({
      value: item.amount,
      color: item.color,
      text: item.percentage > 8 ? `${item.percentage}%` : '',
    }));
  }, [categoryData]);

  // ── Donut center label ──
  const pieRadius = Math.min((screenWidth - 32 - 40) / 2 - 16, 80);
  const innerRadius = pieRadius * 0.62;

  const renderCenterLabel = () => {
    const total = categoryData.totalValue;
    const formatted = formatPrice(total);

    return (
      <View className='items-center justify-center'>
        <Text className='text-[#5a6157] text-[8px] font-bold uppercase tracking-widest mb-0.5'>
          Total
        </Text>
        <Text
          style={{ fontFamily: 'Manrope', fontSize: innerRadius * 0.28 }}
          className='text-[#2d342c] font-black'
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatted}
        </Text>
      </View>
    );
  };

  // ── Active tab style helpers ──
  const isExpense = typeFilter === 'expense';

  return (
    <View
      className='bg-white rounded-3xl p-5 mb-4'
      style={{
        shadowColor: '#2d342c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
      }}
    >
      {/* Header + Tab */}
      <View className='flex-row justify-between items-center mb-1'>
        <Text
          style={{ fontFamily: 'Manrope' }}
          className='text-[#2d342c] text-base font-extrabold'
        >
          Category Breakdown
        </Text>

        <View className='flex-row bg-[#eaf0e5] rounded-xl p-0.5'>
          <TouchableOpacity
            onPress={() => setTypeFilter('expense')}
            className={`px-3 py-1.5 rounded-[10px] ${
              isExpense ? 'bg-[#a73b21]' : ''
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-[10px] font-bold uppercase ${
                isExpense ? 'text-white' : 'text-[#5a6157]'
              }`}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeFilter('income')}
            className={`px-3 py-1.5 rounded-[10px] ${
              !isExpense ? 'bg-[#406841]' : ''
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-[10px] font-bold uppercase ${
                !isExpense ? 'text-white' : 'text-[#5a6157]'
              }`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className='text-[#5a6157] text-xs mb-5'>
        Allocation by category
      </Text>

      {categoryData.list.length === 0 ? (
        /* ── Empty state ── */
        <View className='bg-[#f1f5ec] rounded-2xl py-10 items-center justify-center'>
          <Ionicons name='pie-chart-outline' size={36} color='#adb4a8' />
          <Text className='text-[#5a6157] text-xs mt-3'>
            No transactions found for this period.
          </Text>
        </View>
      ) : (
        <View>
          {/* ── Donut Chart ── */}
          <View className='items-center justify-center py-3 mb-4'>
            <PieChart
              donut
              radius={pieRadius}
              innerRadius={innerRadius}
              data={pieData}
              showText
              textColor='#ffffff'
              textSize={9}
              fontWeight='bold'
              centerLabelComponent={renderCenterLabel}
              focusOnPress
              sectionAutoFocus
              isAnimated
            />
          </View>

          {/* ── Category Legend ── */}
          <View className='gap-2.5'>
            {categoryData.list.map((item, index) => (
              <View
                key={`cat-${index}`}
                className='flex-row items-center justify-between'
              >
                {/* Left: indicator + name + % */}
                <View className='flex-row items-center flex-1 mr-3'>
                  <View
                    className='w-3 h-3 rounded-full mr-2.5'
                    style={{ backgroundColor: item.color }}
                  />
                  <Text
                    className='text-[#2d342c] text-[13px] font-semibold flex-1'
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <View className='bg-[#f1f5ec] rounded-md px-1.5 py-0.5 ml-2'>
                    <Text className='text-[#5a6157] text-[10px] font-bold'>
                      {item.percentage}%
                    </Text>
                  </View>
                </View>

                {/* Right: amount */}
                <Text className='text-[#2d342c] text-[13px] font-bold'>
                  {formatPrice(item.amount)}
                </Text>
              </View>
            ))}
          </View>

          {/* ── Total Row ── */}
          <View className='mt-5 pt-4 flex-row justify-between items-center' style={{ borderTopWidth: 1, borderTopColor: '#eaf0e5' }}>
            <Text className='text-[#5a6157] text-[11px] font-bold uppercase tracking-wider'>
              Total {isExpense ? 'Expenses' : 'Income'}
            </Text>
            <Text
              style={{ fontFamily: 'Manrope' }}
              className={`text-lg font-black ${
                isExpense ? 'text-[#a73b21]' : 'text-[#406841]'
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
