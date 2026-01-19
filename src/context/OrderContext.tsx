import React, { createContext, useState } from 'react';
import { orders as initialOrders, Order } from '../data/orders';

type OrderContextType = {
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
};

export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType,
);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrderStatus = (id: string, status: Order[ 'status' ]) => {
    
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}
