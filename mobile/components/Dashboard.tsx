import { DashboardQuery } from '@/api/dashboard.api';
import { useGetDashboardData } from '@/hooks/useDashboard';
import React from 'react';
import { Text, View } from 'react-native';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const Dashboard = ({ query }: { query: DashboardQuery }) => {
  const { data, isLoading, error } = useGetDashboardData(query);

  if (isLoading) {
    return <LoadingPage message='Loading dashboard data...' />;
  }

  if (error) {
    return <ErrorPage error={error?.response?.data.message} />;
  }

  return (
    <View>
      <Text>Dashboard</Text>
      <Text className='text-white font-bold'>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Dashboard;
