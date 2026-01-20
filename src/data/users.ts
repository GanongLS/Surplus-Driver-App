// src/data/users.ts

export type Driver = {
  id: string;
  name: string;
  email: string;
  password_hash: string; // Di dunia nyata, jangan pernah simpan password plain text
  phone_number: string;
  pin_hash: string; // PIN juga harus di-hash
};

// Mockup data driver. 
// Di aplikasi production, ini akan datang dari API dan password/PIN sudah di-hash.
// Untuk simulasi ini, kita anggap string ini adalah hash-nya.
export const drivers: Driver[] = [
  {
    id: 'DRV-01',
    name: 'Luki Subandi',
    email: 'luki@surplus.com',
    password_hash: 'password123',
    phone_number: '081234567890',
    pin_hash: '123456',
  },
  {
    id: 'DRV-02',
    name: 'Budi Driver',
    email: 'budi@surplus.com',
    password_hash: 'password123',
    phone_number: '081213141516',
    pin_hash: '111111',
  },
  {
    id: 'DRV-03',
    name: 'Siti Driver',
    email: 'siti@surplus.com',
    password_hash: 'password123',
    phone_number: '082122232425',
    pin_hash: '222222',
  },
];
