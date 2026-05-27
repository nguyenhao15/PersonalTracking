import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCancelDebt, useMarkDebtAsPaid } from '@/hooks/useDebt';
import { formatPrice, formatDate } from '@/utils/formatValue';
import { handleShowToast } from '../ToastComponent';
import { LoanTransactionLogs } from './LoanTransactionLogs';

interface LoanItemCardProps {
  debt: any;
}

export const LoanItemCard = ({ debt }: LoanItemCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { mutateAsync: cancelDebt, isPending: isCancelling } = useCancelDebt();
  const { mutateAsync: markAsPaid, isPending: isMarking } = useMarkDebtAsPaid();

  const isBorrow = debt.type === 'borrow';
  const totalPaid = (debt.transactions || []).reduce(
    (sum: number, tx: any) => sum + tx.amount,
    0,
  );
  const remaining = Math.max(0, debt.amount - totalPaid);
  const percent = Math.min(100, Math.round((totalPaid / debt.amount) * 100));

  const handleMarkAsPaid = async () => {
    try {
      await markAsPaid(debt.id);
      handleShowToast('Debt marked as paid', 'success');
    } catch (err: any) {
      handleShowToast(err?.message || 'Failed to mark as paid', 'error');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelDebt(debt.id);
      handleShowToast('Debt cancelled successfully', 'success');
    } catch (err: any) {
      handleShowToast(err?.message || 'Failed to cancel', 'error');
    }
  };

  const statusConfig = {
    paid: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'Paid' },
    cancelled: {
      bg: 'bg-gray-500/10',
      text: 'text-gray-500',
      label: 'Cancelled',
    },
    pending: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      label: 'Pending',
    },
  }[(debt.status as 'paid' | 'cancelled' | 'pending') || 'pending'];

  return (
    <View className='bg-surface border border-white/5 rounded-2xl p-4 mb-3.5 shadow-sm overflow-hidden'>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        className='flex-row justify-between items-start'
      >
        <View className='flex-1 pr-3'>
          <View className='flex-row items-center gap-2 mb-1.5 flex-wrap'>
            <View
              className={`px-2 py-0.5 rounded-full ${
                isBorrow ? 'bg-[#a73b21]/10' : 'bg-[#588157]/10'
              }`}
            >
              <Text
                className={`text-[9px] font-bold uppercase tracking-wider ${
                  isBorrow ? 'text-[#a73b21]' : 'text-primary'
                }`}
              >
                {isBorrow ? 'Payable (Vay)' : 'Receivable (Cho vay)'}
              </Text>
            </View>
            <View className={`px-2 py-0.5 rounded-full ${statusConfig.bg}`}>
              <Text
                className={`text-[9px] font-bold uppercase tracking-wider ${statusConfig.text}`}
              >
                {statusConfig.label}
              </Text>
            </View>
          </View>

          <Text className='text-text-primary text-base font-bold mb-1'>
            {debt.description}
          </Text>

          <View className='flex-row items-center gap-2'>
            <Ionicons name='wallet-outline' size={11} color='#888' />
            <Text className='text-text-secondary text-xs mr-2'>
              {debt.wallet?.walletName || 'Default Wallet'}
            </Text>
            <Ionicons name='calendar-outline' size={11} color='#888' />
            <Text className='text-text-secondary text-xs'>
              {formatDate(debt.transactionDate || '')}
            </Text>
          </View>
        </View>

        <View className='items-end'>
          <Text
            className={`text-base font-extrabold ${
              isBorrow ? 'text-[#a73b21]' : 'text-primary'
            }`}
          >
            {isBorrow ? '-' : '+'}
            {formatPrice(remaining)}
          </Text>
          {totalPaid > 0 && (
            <Text className='text-text-secondary text-[10px] mt-0.5 font-medium'>
              Remaining (Original: {formatPrice(debt.amount)})
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {debt.status !== 'cancelled' && (
        <View className='mt-4'>
          <View className='flex-row justify-between text-[10px] text-text-secondary font-semibold mb-1'>
            <Text className='text-text-secondary text-[10px] font-semibold'>
              Paid Progress: {percent}%
            </Text>
            <Text className='text-text-secondary text-[10px] font-semibold'>
              {formatPrice(totalPaid)} / {formatPrice(debt.amount)}
            </Text>
          </View>
          <View className='h-1.5 w-full bg-background-light rounded-full overflow-hidden'>
            <View
              className={`h-full rounded-full ${
                isBorrow ? 'bg-[#a73b21]' : 'bg-primary'
              }`}
              style={{ width: `${percent}%` }}
            />
          </View>
        </View>
      )}

      {expanded && (
        <View className='mt-4 pt-4 border-t border-background-light gap-4'>
          <LoanTransactionLogs
            transactions={debt.transactions || []}
            isBorrow={isBorrow}
          />

          {debt.status === 'pending' && (
            <View className='flex-row gap-3 mt-1'>
              <TouchableOpacity
                onPress={handleMarkAsPaid}
                disabled={isMarking || isCancelling}
                className='flex-1 flex-row bg-primary/10 border border-primary/20 py-2.5 rounded-full items-center justify-center gap-1.5 active:bg-primary/20'
                activeOpacity={0.8}
              >
                {isMarking ? (
                  <ActivityIndicator size='small' color='#588157' />
                ) : (
                  <>
                    <Ionicons name='checkmark-done' size={14} color='#588157' />
                    <Text className='text-primary text-xs font-bold'>
                      MARK PAID
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCancel}
                disabled={isMarking || isCancelling}
                className='flex-1 flex-row bg-red-500/10 border border-red-500/20 py-2.5 rounded-full items-center justify-center gap-1.5 active:bg-red-500/20'
                activeOpacity={0.8}
              >
                {isCancelling ? (
                  <ActivityIndicator size='small' color='#ef4444' />
                ) : (
                  <>
                    <Ionicons name='close-circle' size={14} color='#ef4444' />
                    <Text className='text-red-500 text-xs font-bold'>
                      CANCEL DEBT
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default LoanItemCard;
