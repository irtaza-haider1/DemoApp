// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/login/LoginScreen';
import SignUpScreen from './src/components/login/SignUpScreen';
import ConfirmationScreen from './src/components/login/ConfirmationPage';
import OnboardingScreen from './src/components/OnboardingScreen';
import { RootStackParamList } from './src/types/navigation'; 
import { useFonts } from 'expo-font';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  let [fontsLoaded] = useFonts({
    'Inter-Regular': require('./src/assets/fonts/static/Inter_24pt-Regular.ttf'),
    'Inter-Bold': require('./src/assets/fonts/static/Inter_18pt-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />
          <Stack.Screen
            name="Confirmation"
            component={ConfirmationScreen}
            options={{ title: 'Confirmation Code' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
