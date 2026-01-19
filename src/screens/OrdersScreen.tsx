import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Text, FlatList, StyleSheet, Pressable } from 'react-native';
import {  Order } from '../data/orders';

export default function OrdersScreen({ navigation }: any) {
  const { orders} = useContext(OrderContext);

  const renderItem = ({ item }: { item: Order }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DetailOrder', { orderId: item.id })}
    >
      <Text style={styles.customerName}>{item.customerName}</Text>

      <Text style={styles.text}>{item.address}</Text>
      <Text style={styles.text}>
        {item.juiceType} x {item.qty}
      </Text>
      <Text style={styles.text}>{item.time}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>Belum ada order</Text>}
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
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
