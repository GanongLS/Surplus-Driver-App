export type OrderStatus =
  | 'Menunggu'
  | 'Diterima'
  | 'Dalam Perjalanan'
  | 'Selesai'
  | 'Ditolak';

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
    status: 'Selesai',
  },
  {
    id: 'ORD-002',
    customerName: 'Siti',
    address: 'Jl. Sudirman No 21',
    juiceType: 'Mangga',
    qty: 1,
    time: '2026-01-19 10:45',
    status: 'Selesai',
  },
  {
    id: 'ORD-003',
    customerName: 'Ahmad',
    address: 'Jl. Gatot Subroto No 15',
    juiceType: 'Jeruk',
    qty: 3,
    time: '2026-01-19 11:00',
    status: 'Dalam Perjalanan',
  },
  {
    id: 'ORD-004',
    customerName: 'Dewi',
    address: 'Jl. Pahlawan No 5',
    juiceType: 'Jambu',
    qty: 1,
    time: '2026-01-19 11:15',
    status: 'Diterima',
  },
  {
    id: 'ORD-005',
    customerName: 'Eko',
    address: 'Jl. Diponegoro No 30',
    juiceType: 'Apel',
    qty: 2,
    time: '2026-01-19 11:30',
    status: 'Menunggu',
  },
  {
    id: 'ORD-006',
    customerName: 'Fitri',
    address: 'Jl. Kartini No 8',
    juiceType: 'Alpukat',
    qty: 1,
    time: '2026-01-19 11:45',
    status: 'Menunggu',
  },
  {
    id: 'ORD-007',
    customerName: 'Gunawan',
    address: 'Jl. Imam Bonjol No 12',
    juiceType: 'Mangga',
    qty: 2,
    time: '2026-01-19 12:00',
    status: 'Menunggu',
  },
  {
    id: 'ORD-008',
    customerName: 'Hasan',
    address: 'Jl. Teuku Umar No 25',
    juiceType: 'Jeruk',
    qty: 1,
    time: '2026-01-19 12:15',
    status: 'Menunggu',
  },
  {
    id: 'ORD-009',
    customerName: 'Indah',
    address: 'Jl. WR Supratman No 3',
    juiceType: 'Jambu',
    qty: 3,
    time: '2026-01-19 12:30',
    status: 'Menunggu',
  },
  {
    id: 'ORD-010',
    customerName: 'Joko',
    address: 'Jl. Pattimura No 18',
    juiceType: 'Apel',
    qty: 1,
    time: '2026-01-19 12:45',
    status: 'Menunggu',
  },
  {
    id: 'ORD-011',
    customerName: 'Kartika',
    address: 'Jl. Gajah Mada No 9',
    juiceType: 'Alpukat',
    qty: 2,
    time: '2026-01-19 13:00',
    status: 'Menunggu',
  },
  {
    id: 'ORD-012',
    customerName: 'Lestari',
    address: 'Jl. Hayam Wuruk No 22',
    juiceType: 'Mangga',
    qty: 1,
    time: '2026-01-19 13:15',
    status: 'Menunggu',
  },
  {
    id: 'ORD-013',
    customerName: 'Mega',
    address: 'Jl. MH Thamrin No 7',
    juiceType: 'Jeruk',
    qty: 2,
    time: '2026-01-19 13:30',
    status: 'Menunggu',
  },
  {
    id: 'ORD-014',
    customerName: 'Nusantara',
    address: 'Jl. Asia Afrika No 11',
    juiceType: 'Jambu',
    qty: 1,
    time: '2026-01-19 13:45',
    status: 'Menunggu',
  },
  {
    id: 'ORD-015',
    customerName: 'Putra',
    address: 'Jl. Braga No 45',
    juiceType: 'Apel',
    qty: 3,
    time: '2026-01-19 14:00',
    status: 'Menunggu',
  },
  {
    id: 'ORD-016',
    customerName: 'Rina',
    address: 'Jl. Cihampelas No 50',
    juiceType: 'Alpukat',
    qty: 1,
    time: '2026-01-19 14:15',
    status: 'Menunggu',
  },
  {
    id: 'ORD-017',
    customerName: 'Santoso',
    address: 'Jl. Dago No 33',
    juiceType: 'Mangga',
    qty: 2,
    time: '2026-01-19 14:30',
    status: 'Menunggu',
  },
  {
    id: 'ORD-018',
    customerName: 'Tina',
    address: 'Jl. Setiabudi No 61',
    juiceType: 'Jeruk',
    qty: 1,
    time: '2026-01-19 14:45',
    status: 'Diterima',
  },
  {
    id: 'ORD-019',
    customerName: 'Utami',
    address: 'Jl. Pasteur No 28',
    juiceType: 'Jambu',
    qty: 2,
    time: '2026-01-19 15:00',
    status: 'Dalam Perjalanan',
  },
  {
    id: 'ORD-020',
    customerName: 'Wahyu',
    address: 'Jl. Surya Sumantri No 19',
    juiceType: 'Apel',
    qty: 1,
    time: '2026-01-19 15:15',
    status: 'Selesai',
  },
];