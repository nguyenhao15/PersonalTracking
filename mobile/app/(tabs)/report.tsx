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
import { ReportLoadingState } from '@/components/Report/ReportLoadingState';
import { ReportErrorState } from '@/components/Report/ReportErrorState';

// ====================================================
// Primary Component: ReportScreen
// Fetches daily stats & category details, displays dashboard
// ====================================================
const ReportScreen = () => {
  // 1. Chuẩn bị khoảng thời gian: 7 ngày gần nhất
  const { sevenDaysAgo, today } = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    return { sevenDaysAgo: d, today: new Date() };
  }, []);

  // 2. Fetch dữ liệu từ React Query
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

  // 3. Chuẩn hoá dữ liệu 7 ngày gần nhất (đảm bảo hiển thị đầy đủ kể cả ngày không có record)
  const normalizedStats = useMemo(() => {
    const list = [];
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
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportHeader />

        <View className='px-2'>
          <CombinedBarLineChart stats={normalizedStats} />
          <CategoryBreakdownCard transactions={toArray<any>(transactions)} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default ReportScreen;
