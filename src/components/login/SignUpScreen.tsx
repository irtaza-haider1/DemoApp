import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation'; 

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const navigation = useNavigation<SignUpScreenNavigationProp>(); // Use typed navigation

  const handleSignUp = () => {
    if (termsAccepted && password === confirmPassword) {
      navigation.navigate('Confirmation'); // Navigate to the ConfirmationScreen
    } else {
      console.log('Passwords do not match or terms are not accepted.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Create an account to get started</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, nameFocused && styles.inputFocused]}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, emailFocused && styles.inputFocused]}
            placeholder="name@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordFocused && styles.inputFocused]}
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />

          <TextInput
            style={[styles.input, confirmPasswordFocused && styles.inputFocused]}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
            <Text style={styles.checkboxText}>
              I've read and agree with the{' '}
              <Text style={styles.link}>Terms and Conditions</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, !termsAccepted && styles.disabledButton]}
            disabled={!termsAccepted}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6c757d',
    marginTop: 5,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    marginTop: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#6c757d',
  },
  link: {
    color: '#007BFF',
  },
  signUpButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  inputFocused: {
    borderColor: '#006FFD',
    borderWidth: 2,
  },
});

export default SignUpScreen;
