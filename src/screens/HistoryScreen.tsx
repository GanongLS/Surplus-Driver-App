import React from 'react';
import { useOrders } from '../context/OrderContext';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { Order } from '../data/orders';

export default function HistoryScreen() {
  const { getHistory } = useOrders();
  const historyOrders = getHistory();

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.text}>{item.address}</Text>
      <Text style={styles.text}>
        {item.juiceType} x {item.qty}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text
        style={[
          styles.status,
          item.status === 'Ditolak'
            ? styles.statusDitolak
            : styles.statusSelesai,
        ]}>
        Status: {item.status}
      </Text>
      {item.status === 'Ditolak' && item.rejectionReason && (
        <Text style={styles.rejectionReason}>
          Alasan: {item.rejectionReason}
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={historyOrders}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>Belum ada riwayat order</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  statusSelesai: {
    color: 'green',
  },
  statusDitolak: {
    color: 'red',
  },
  rejectionReason: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});