import SafeScreen from '@/components/SafeScreen';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useGetDashboardData } from '@/hooks/useDashboard';
import { useGetTransactions } from '@/hooks/useTransaction';
import { GroupBy } from '@/api/dashboard.api';
import { toArray } from '@/utils/formatValue';
import { CombinedBarLineChart } from '@/components/Report/CombinedBarLineChart';
import { CategoryBreakdownCard } from '@/components/Report/CategoryBreakdownCard';
import { ReportHeader } from '@/components/Report/ReportHeader';
import { ReportSummaryCard } from '@/components/Report/ReportSummaryCard';
import { ReportLoadingState } from '@/components/Report/ReportLoadingState';
import { ReportErrorState } from '@/components/Report/ReportErrorState';

const ReportScreen = () => {
  // 1. Date range: last 7 days
  const { sevenDaysAgo, today } = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    return { sevenDaysAgo: d, today: new Date() };
  }, []);

  // 2. Fetch data via React Query
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useGetDashboardData({
    groupBy: GroupBy.DAY,
    startDate: sevenDaysAgo,
    endDate: today,
  });

  const {
    data: transactions,
    isLoading: txLoading,
    error: txError,
  } = useGetTransactions();

  // 3. Normalize 7 days (fill empty days with 0)
  const normalizedStats = useMemo(() => {
    const list: { label: string; expense: number; income: number }[] = [];
    const rawList = toArray<any>(stats);

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - i);
      const targetDateStr = targetDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
      });

      const match = rawList.find((item: any) => {
        const itemDate = new Date(item.timeGroup);
        return itemDate.toDateString() === targetDate.toDateString();
      });

      list.push({
        label: targetDateStr,
        expense: match ? Number(match.totalExpense || 0) : 0,
        income: match ? Number(match.totalIncome || 0) : 0,
      });
    }
    return list;
  }, [stats]);

  // 4. Aggregate totals
  const { totalIncome, totalExpense, netCashFlow } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    normalizedStats.forEach((item) => {
      inc += item.income;
      exp += item.expense;
    });
    return { totalIncome: inc, totalExpense: exp, netCashFlow: inc - exp };
  }, [normalizedStats]);

  const isLoading = statsLoading || txLoading;
  const isError = statsError || txError;

  if (isLoading) {
    return <ReportLoadingState />;
  }

  if (isError) {
    return (
      <ReportErrorState
        message={
          statsError?.message ||
          txError?.message ||
          'An unknown network error occurred.'
        }
      />
    );
  }

  return (
    <SafeScreen>
      <ScrollView
        className='flex-1 bg-[#f8faf3]'
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportHeader />

        <ReportSummaryCard
          netCashFlow={netCashFlow}
          totalIncome={totalIncome}
          totalExpenses={totalExpense}
        />

        <View className='px-4'>
          <CombinedBarLineChart stats={normalizedStats} />
          <CategoryBreakdownCard transactions={toArray<any>(transactions)} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default ReportScreen;
