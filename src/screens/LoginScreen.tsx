import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { drivers } from '../data/users'; // Impor data driver

type LoginScreenProps = {
  navigation: any;
};

type DetectedInputType = 'email' | 'phone' | 'unknown';

// Regex untuk validasi sederhana
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^0\d{8,14}$/; // Diawali 0, total 9-15 digit angka

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [credential, setCredential] = useState(''); // Input pertama (bisa email/HP)
  const [secret, setSecret] = useState(''); // Input kedua (bisa password/PIN)
  const [isSecretVisible, setIsSecretVisible] = useState(false); // State untuk toggle

  // Deteksi tipe input secara otomatis saat pengguna mengetik
  const detectedInputType: DetectedInputType = useMemo(() => {
    if (EMAIL_REGEX.test(credential)) {
      return 'email';
    }
    if (PHONE_REGEX.test(credential)) {
      return 'phone';
    }
    return 'unknown';
  }, [credential]);

  const handleLogin = () => {
    let userIsValid = false;

    if (detectedInputType === 'email') {
      userIsValid = !!drivers.find(
        driver => driver.email.toLowerCase() === credential.toLowerCase() && driver.password_hash === secret
      );
    } else if (detectedInputType === 'phone') {
      userIsValid = !!drivers.find(
        driver => driver.phone_number === credential && driver.pin_hash === secret
      );
    } else {
        Alert.alert('Input Tidak Valid', 'Masukkan Email atau Nomor HP yang valid.');
        return;
    }

    if (userIsValid) {
      navigation.replace('Main');
    } else {
      Alert.alert('Login Gagal', 'Kredensial yang Anda masukkan salah.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Driver App</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email atau Nomor HP"
            value={credential}
            onChangeText={setCredential}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputInner}
              placeholder={detectedInputType === 'phone' ? 'PIN' : 'Password'}
              value={secret}
              onChangeText={setSecret}
              secureTextEntry={!isSecretVisible} // Kontrol visibilitas
              autoCapitalize="none"
              keyboardType={detectedInputType === 'phone' ? 'number-pad' : 'default'}
              maxLength={detectedInputType === 'phone' ? 6 : undefined}
            />
            <Pressable onPress={() => setIsSecretVisible(!isSecretVisible)} style={styles.toggleButton}>
              <Text style={styles.toggleText}>{isSecretVisible ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
          
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInner: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  toggleButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  toggleText: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
