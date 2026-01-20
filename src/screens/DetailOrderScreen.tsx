import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {useOrders} from '../context/OrderContext';
import {OrderStatus} from '../data/orders';

export default function DetailOrderScreen({route, navigation}: any) {
  const {getOrderById, updateOrderStatus, isLoading} = useOrders();

  const {orderId} = route.params;
  const order = getOrderById(orderId);

  const [modalVisible, setModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const getNextStatus = (
    status: OrderStatus | undefined,
  ): OrderStatus | null => {
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
    );
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
    if (rejectionReason.trim().length === 0) {
      // a simple validation
      Alert.alert('Alasan penolakan harus diisi');
      return;
    }
    updateOrderStatus(order.id, 'Ditolak', rejectionReason);
    setModalVisible(false);
    setRejectionReason('');
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
            onPress={() => setModalVisible(true)}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Alasan Penolakan</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRejectionReason}
              value={rejectionReason}
              placeholder="Masukkan alasan penolakan"
              multiline
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSubmit]}
                onPress={handleDeclineOrder}>
                <Text style={styles.textStyle}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#e74c3c',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonSubmit: {
    backgroundColor: '#2e86de',
    flex: 1,
    marginHorizontal: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
