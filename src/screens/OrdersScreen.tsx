import React, { useLayoutEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import {
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import { Order } from '../data/orders';

export default function OrdersScreen({ navigation }: any) {
  const { getAvailableOrders, isLoading } = useOrders();
  const availableOrders = getAvailableOrders();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Daftar Pesanan',
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: Order }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DetailOrder', { orderId: item.id })}>
      <View style={styles.row}>
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>{item.customerName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Alamat</Text>
        <Text style={styles.value}>{item.address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pesanan</Text>
        <Text style={styles.value}>{item.juiceType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah</Text>
        <Text style={styles.value}>{item.qty} gelas</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Waktu</Text>
        <Text style={styles.value}>{item.time}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={availableOrders}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Belum ada order tersedia</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    width: '30%',
  },
  value: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    width: '70%',
  },
  statusContainer: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#e7f3ff',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006de0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
