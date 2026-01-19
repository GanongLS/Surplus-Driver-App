export type OrderStatus =
  | 'Menunggu'
  | 'Dibuat'
  | 'Dalam Perjalanan'
  | 'Diterima'
  | 'Selesai';

export type Order = {
  id: string;
  customerName: string;
  address: string;
  juiceType: string;
  qty: number;
  time: string;
  status: OrderStatus;
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Budi',
    address: 'Jl. Merdeka No 10',
    juiceType: 'Alpukat',
    qty: 2,
    time: '2026-01-19 10:30',
    status: 'Menunggu',
  },
  {
    id: 'ORD-002',
    customerName: 'Siti',
    address: 'Jl. Sudirman No 21',
    juiceType: 'Mangga',
    qty: 1,
    time: '2026-01-19 10:45',
    status: 'Menunggu',
  },
];
