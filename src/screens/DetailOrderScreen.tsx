import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useOrders } from '../context/OrderContext';
import { OrderStatus } from '../data/orders';

export default function DetailOrderScreen({ route, navigation }: any) {
  const { getOrderById, updateOrderStatus, isLoading } = useOrders();

  const { orderId } = route.params;
  const order = getOrderById(orderId);

  const getNextStatus = (status: OrderStatus | undefined): OrderStatus | null => {
    switch (status) {
      case 'Menunggu':
        return 'Diterima';
      case 'Diterima':
        return 'Dalam Perjalanan';
      case 'Dalam Perjalanan':
        return 'Selesai';
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" />
        </View>
    )
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order tidak ditemukan</Text>
      </View>
    );
  }

  const nextStatus = getNextStatus(order.status);

  const handleUpdateStatus = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
      if (nextStatus === 'Selesai') {
        navigation.goBack();
      }
    }
  };

  const handleAcceptOrder = () => {
    updateOrderStatus(order.id, 'Diterima');
  };

  const handleDeclineOrder = () => {
    updateOrderStatus(order.id, 'Ditolak');
    navigation.goBack();
  };

  const renderButtons = () => {
    if (order.status === 'Menunggu') {
      return (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={handleAcceptOrder}
            disabled={isLoading}>
            <Text style={styles.buttonText}>Terima Order</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonDecline]}
            onPress={handleDeclineOrder}
            disabled={isLoading}>
            <Text style={styles.buttonText}>Tolak Order</Text>
          </Pressable>
        </View>
      );
    }

    if (nextStatus) {
      return (
        <Pressable
          style={styles.button}
          onPress={handleUpdateStatus}
          disabled={isLoading}>
          <Text style={styles.buttonText}>Ubah ke "{nextStatus}"</Text>
        </Pressable>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detail Order</Text>

        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>{order.customerName}</Text>

        <Text style={styles.label}>Alamat</Text>
        <Text style={styles.value}>{order.address}</Text>

        <Text style={styles.label}>Pesanan</Text>
        <Text style={styles.value}>{order.juiceType}</Text>

        <Text style={styles.label}>Jumlah</Text>
        <Text style={styles.value}>{order.qty} gelas</Text>

        <Text style={styles.label}>Waktu</Text>
        <Text style={styles.value}>{order.time}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, styles.status]}>{order.status}</Text>
      </View>

      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  status: {
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    padding: 16,
    backgroundColor: '#2e86de',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDecline: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
