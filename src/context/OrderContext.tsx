import React, { createContext, useState, useContext, useMemo } from 'react';
import { orders as initialOrders, Order, OrderStatus } from '../data/orders';

// 1. Tipe untuk nilai yang akan disediakan oleh Context
type OrderContextType = {
  isLoading: boolean;
  getAvailableOrders: () => Order[];
  getHistory: () => Order[];
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (
    id: string,
    status: OrderStatus,
    rejectionReason?: string,
  ) => void;
};

// 2. Membuat Context dengan nilai awal undefined
export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

// 3. Membuat Provider Component
export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(false); // Nanti berguna untuk API call

  // Fungsi untuk mengubah status order
  const updateOrderStatus = (
    id: string,
    status: OrderStatus,
    rejectionReason?: string,
  ) => {
    // Simulasi loading
    setIsLoading(true);
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? {
              ...order,
              status,
              ...(status === 'Ditolak' && { rejectionReason }),
            }
          : order,
      ),
    );
    // Matikan loading setelah "proses" selesai
    setTimeout(() => setIsLoading(false), 300);
  };
  
  // Fungsi untuk mendapatkan order berdasarkan ID
  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  // Memoize hasil agar tidak dihitung ulang pada setiap render
  const getAvailableOrders = useMemo(() => () => {
    return orders.filter(
      order => order.status !== 'Selesai' && order.status !== 'Ditolak',
    );
  }, [orders]);
  
  const getHistory = useMemo(() => () => {
    return orders.filter(order => order.status === 'Selesai' || order.status === 'Ditolak');
  }, [orders]);


  const value = {
    isLoading,
    getAvailableOrders,
    getHistory,
    getOrderById,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

// 4. Custom Hook untuk mempermudah penggunaan Context
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};