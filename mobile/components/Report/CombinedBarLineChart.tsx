import React, { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

interface CombinedChartProps {
  stats: { label: string; expense: number; income: number }[];
}

// ====================================================
// Helper: format large numbers for chart labels
// ====================================================
const formatChartValue = (val: number): string => {
  if (val === 0) return '0';
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `${Math.round(val / 1_000)}k`;
  return String(val);
};

export const CombinedBarLineChart = ({ stats }: CombinedChartProps) => {
  // Calculate chart width: screen - page padding (16*2) - card padding (20*2) - yAxis space
  const chartWidth = screenWidth - 32 - 40 - 40;
  const barCount = stats.length || 7;
  const barWidth = Math.min(Math.floor((chartWidth - barCount * 8) / barCount), 28);
  const spacing = Math.floor((chartWidth - barWidth * barCount) / barCount);

  // ── Expense bar data ──
  const barData = useMemo(
    () =>
      stats.map((item) => ({
        value: item.expense,
        label: item.label,
        frontColor: '#a73b21',
        gradientColor: '#fd795a',
        topLabelComponent: () =>
          item.expense === 0 ? null : (
            <Text
              style={{
                fontSize: 7,
                color: '#a73b21',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 2,
              }}
            >
              {formatChartValue(item.expense)}
            </Text>
          ),
      })),
    [stats],
  );

  // ── Income line data ──
  const lineData = useMemo(
    () =>
      stats.map((item) => ({
        value: item.income,
        label: item.label,
        dataPointText: item.income > 0 ? formatChartValue(item.income) : '',
      })),
    [stats],
  );

  // ── Common axis style ──
  const axisLabelStyle = { color: '#5a6157', fontSize: 9, fontWeight: '600' as const };
  const yAxisStyle = { color: '#adb4a8', fontSize: 8 };

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
      <Text
        style={{ fontFamily: 'Manrope' }}
        className='text-[#2d342c] text-base font-extrabold mb-0.5'
      >
        Weekly Trend
      </Text>
      <Text className='text-[#5a6157] text-xs mb-5'>
        Daily income vs. expenses over the past 7 days
      </Text>

      {/* ── Expense Bar Chart ── */}
      <View className='mb-5'>
        <View className='flex-row items-center mb-3'>
          <View className='w-3 h-3 rounded bg-[#a73b21]' />
          <Text className='text-[#2d342c] text-[13px] font-bold ml-2'>
            Expenses
          </Text>
        </View>
        <BarChart
          data={barData}
          width={chartWidth}
          height={110}
          barWidth={barWidth}
          spacing={spacing}
          barBorderRadius={6}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor='#eaf0e5'
          rulesColor='#eaf0e5'
          rulesType='dashed'
          dashGap={6}
          dashWidth={3}
          yAxisTextStyle={yAxisStyle}
          xAxisLabelTextStyle={axisLabelStyle}
          initialSpacing={8}
          endSpacing={4}
          disablePress
          isAnimated
          animationDuration={600}
        />
      </View>

      {/* ── Divider ── */}
      <View className='h-px bg-[#eaf0e5] mb-5' />

      {/* ── Income Area Chart ── */}
      <View>
        <View className='flex-row items-center mb-3'>
          <View className='w-4 h-1.5 rounded-full bg-[#406841]' />
          <Text className='text-[#2d342c] text-[13px] font-bold ml-2'>
            Income
          </Text>
        </View>
        <LineChart
          data={lineData}
          width={chartWidth}
          height={110}
          color='#406841'
          thickness={2.5}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor='#eaf0e5'
          rulesColor='#eaf0e5'
          rulesType='dashed'
          dashGap={6}
          dashWidth={3}
          yAxisTextStyle={yAxisStyle}
          xAxisLabelTextStyle={axisLabelStyle}
          initialSpacing={8}
          endSpacing={4}
          dataPointsColor='#406841'
          dataPointsRadius={4}
          areaChart
          startFillColor='rgba(64, 104, 65, 0.20)'
          endFillColor='rgba(64, 104, 65, 0.01)'
          startOpacity={0.2}
          endOpacity={0.01}
          textColor='#406841'
          textFontSize={8}
          textShiftY={-10}
          textShiftX={-5}
          curved
          curvature={0.2}
          isAnimated
          animationDuration={800}
        />
      </View>
    </View>
  );
};

export default CombinedBarLineChart;
