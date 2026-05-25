import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Dữ liệu được coi là "tươi" vô hạn
      retry: 1, // Thử lại 1 lần nếu API lỗi
      refetchOnWindowFocus: false, // Tránh load lại khi user chuyển Tab (tối ưu tài nguyên)
      refetchOnMount: false, // Không tự động refetch khi component mount (sử dụng cache nếu có)
      refetchOnReconnect: false, // Không tự động refetch khi kết nối mạng được khôi phục
    },
  },
});
