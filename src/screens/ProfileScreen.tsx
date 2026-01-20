import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { drivers, Driver } from '../data/users';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    // For now, we'll just use the first user from our dummy data
    setDriver(drivers[0]);
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (!driver) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Driver</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>{driver.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nomor HP:</Text>
        <Text style={styles.value}>{driver.phone_number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{driver.email}</Text>
      </View>
      <Pressable
        style={[styles.button, styles.buttonLogout]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    fontSize: 16,
  },
  button: {
    padding: 16,
    backgroundColor: '#2e86de',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonLogout: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
