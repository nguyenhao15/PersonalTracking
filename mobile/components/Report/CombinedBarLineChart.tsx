import React, { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

interface CombinedChartProps {
  stats: any[];
}

export const CombinedBarLineChart = ({ stats }: CombinedChartProps) => {
  const padding = 16;
  const cardPadding = 16;
  const usableWidth = screenWidth - padding * 2 - cardPadding * 2 - 20;

  // 1. Chuẩn bị dữ liệu cho Bar Chart (Expenses - Chi tiêu)
  const barData = useMemo(() => {
    return stats.map((item) => ({
      value: item.expense,
      label: item.label,
      frontColor: '#a73b21',
      topLabelComponent: () => {
        if (item.expense === 0) return null;
        return (
          <Text className='text-[8px] text-[#a73b21] font-bold text-center mb-1'>
            {item.expense >= 1000000
              ? `${(item.expense / 1000000).toFixed(1)}M`
              : item.expense >= 1000
                ? `${Math.round(item.expense / 1000)}k`
                : item.expense}
          </Text>
        );
      },
    }));
  }, [stats]);

  // 2. Chuẩn bị dữ liệu cho Line Chart (Income - Thu nhập)
  const lineData = useMemo(() => {
    return stats.map((item) => ({
      value: item.income,
      label: item.label,
      dataPointText:
        item.income > 0
          ? item.income >= 1000000
            ? `${(item.income / 1000000).toFixed(1)}M`
            : item.income >= 1000
              ? `${Math.round(item.income / 1000)}k`
              : String(item.income)
          : '',
    }));
  }, [stats]);

  return (
    <View className='bg-surface border border-white/5 rounded-2xl p-4 shadow-sm mb-5'>
      <Text className='text-text-primary text-base font-bold mb-1'>
        Weekly Statistics
      </Text>
      <Text className='text-text-secondary text-xs mb-6'>
        Independently scaled analysis of your daily transactions
      </Text>

      {/* 1. Bar Chart - Weekly Expenses */}
      <View className='mb-6'>
        <View className='flex-row items-center gap-2 mb-3'>
          <View className='w-3 h-3 rounded bg-[#a73b21]' />
          <Text className='text-text-primary text-sm font-bold'>
            Expenses (Chi)
          </Text>
        </View>

        <View className='items-center justify-center' style={{ width: '100%' }}>
          <BarChart
            data={barData}
            width={usableWidth}
            height={90}
            barWidth={16}
            spacing={16}
            barBorderRadius={4}
            noOfSections={3}
            yAxisThickness={0}
            xAxisThickness={0}
            rulesColor='rgba(255, 255, 255, 0.05)'
            rulesType='dashed'
            yAxisTextStyle={{ color: '#888', fontSize: 9 }}
            xAxisLabelTextStyle={{
              color: '#888',
              fontSize: 9,
              fontWeight: 'bold',
            }}
            initialSpacing={10}
          />
        </View>
      </View>

      <View className='h-px bg-background-light/50 my-2' />

      {/* 2. Line Area Chart - Weekly Income */}
      <View className='mt-3'>
        <View className='flex-row items-center gap-2 mb-3'>
          <View className='w-3.5 h-1 rounded bg-[#588157]' />
          <Text className='text-text-primary text-sm font-bold'>
            Income (Thu)
          </Text>
        </View>

        <View className='items-center justify-center' style={{ width: '100%' }}>
          <LineChart
            data={lineData}
            width={usableWidth}
            height={90}
            color='#588157'
            thickness={2.5}
            noOfSections={3}
            yAxisThickness={0}
            xAxisThickness={0}
            rulesColor='rgba(255, 255, 255, 0.05)'
            rulesType='dashed'
            yAxisTextStyle={{ color: '#888', fontSize: 9 }}
            xAxisLabelTextStyle={{
              color: '#888',
              fontSize: 9,
              fontWeight: 'bold',
            }}
            initialSpacing={10}
            dataPointsColor='#588157'
            dataPointsRadius={3}
            areaChart
            startFillColor='rgba(88, 129, 87, 0.25)'
            endFillColor='rgba(88, 129, 87, 0.01)'
            textColor='#588157'
            textFontSize={8}
            textShiftY={-8}
            textShiftX={-3}
          />
        </View>
      </View>
    </View>
  );
};

export default CombinedBarLineChart;
