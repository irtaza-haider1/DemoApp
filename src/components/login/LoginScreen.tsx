import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard,Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined; 
  SignUp: undefined; 
};

const LoginScreen: React.FC = () => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={keyboardVisible} 
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://www.colorhexa.com/eaf2ff.png' }}
              style={styles.logo}
            />
          </View>
  
          <View style={styles.formContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome!</Text>
            </View>
  
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
  
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
              />
  
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
  
              <View style={styles.registerContainer}>
  <Text style={styles.registerText}>Not a member?</Text>
  <TouchableOpacity
    onPress={() => navigation.navigate('SignUp')}
  >
    <Text style={styles.registerLinkText}>Register now</Text>
  </TouchableOpacity>
</View>
            </View>
  
            <View style={styles.separator} />
  
            <View style={styles.socialIconsContainer}>
              <Text style={styles.continueWithText}>Or continue with</Text>
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/social.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/apple.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/facebook.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
  },
  logo: {
    width: 380,
    height: 312,
  },
  welcomeContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  forgotPasswordText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
    color: '#006FFD',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    textAlign: 'left',
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#8F9098',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 5,
  },
  registerLinkText: {
    color: '#006FFD',
    fontSize: 12,
    fontWeight: '600'
  },
  continueWithText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F9098',
    marginTop: 15,
    marginBottom: 13,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  },
  socialIconsContainer: {
    alignItems: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    width: '60%',
    gap: 10,
    justifyContent: 'center'
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});

export default LoginScreen;
