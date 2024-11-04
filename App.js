import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Button, TextInput, Alert, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [registered, setRegistered] = useState(false);
  const [userData, setUserData] = useState(null);

  const validateAndSubmit = () => {
    setRegistered(false);

    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name.');
      return;
    }

    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailPattern.test(email)) {
      Alert.alert('Error', 'Please provide a valid email address.');
      return;
    }

    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty.');
      return;
    }

    if (password.length < 5) {
      Alert.alert('Error', 'Password should be at least 4 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!address.trim()) {
      Alert.alert('Error', 'Please provide your address.');
      return;
    }

    if (!dob.trim()) {
      Alert.alert('Error', 'Date of birth is required.');
      return;
    }

    setUserData({
      fullName,
      email,
      username,
      address,
      dob
    });

    setRegistered(true);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!registered ? (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={dob}
              onChangeText={setDob}
            />

            <Button title="Submit" onPress={validateAndSubmit} />
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>Registration successful!</Text>
            <Text>Full Name: {userData?.fullName}</Text>
            <Text>Email: {userData?.email}</Text>
            <Text>Username: {userData?.username}</Text>
            <Text>Address: {userData?.address}</Text>
            <Text>Date of Birth: {userData?.dob}</Text>
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#00796b',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successMessage: {
    fontSize: 22,
    color: 'green',
    marginBottom: 15,
  },
});
