import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { OrderContext } from '../context/OrderContext';
import { Order } from '../data/orders';

export default function DetailOrderScreen({ route }: any) {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  const getNextStatus = (status: Order['status']) => {
    switch (status) {
      case 'Menunggu':
        return 'Dibuat';
      case 'Dibuat':
        return 'Dalam Perjalanan';
      case 'Dalam Perjalanan':
        return 'Diterima';
      case 'Diterima':
        return 'Selesai';
      default:
        return null;
    }
  };

  const { orderId } = route.params;
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order tidak ditemukan</Text>
      </View>
    );
  }

  const nextStatus = getNextStatus(order.status);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Order</Text>

      <Text style={styles.label}>Customer</Text>
      <Text style={styles.value}>{order.customerName}</Text>

      <Text style={styles.label}>Alamat</Text>
      <Text style={styles.value}>{order.address}</Text>

      <Text style={styles.label}>Pesanan</Text>
      <Text style={styles.value}>
        {order.juiceType} x {order.qty}
      </Text>

      <Text style={styles.label}>Waktu</Text>
      <Text style={styles.value}>{order.time}</Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>{order.status}</Text>
      {nextStatus && (
        <Pressable
          style={styles.button}
          onPress={() => updateOrderStatus(order.id, nextStatus)}
        >
          <Text style={styles.buttonText}>Ubah ke "{nextStatus}"</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#2e86de',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
