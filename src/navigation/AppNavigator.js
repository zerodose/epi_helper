// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SplashScreen from '@/screens/Splash/SplashScreen';
// import LoginScreen from '@/screens/Login/LoginScreen';
// import SignupScreen from '@/screens/Signup/SignupScreen';
// import MainTabs from '@/navigation/MainTabs';

// const Stack = createNativeStackNavigator();

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />

//         <Stack.Screen name="Login" component={LoginScreen} />

//         <Stack.Screen name="Signup" component={SignupScreen} />

//         <Stack.Screen name="MainTabs" component={MainTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '@/screens/Splash/SplashScreen';
import LoginScreen from '@/screens/Login/LoginScreen';
import SignupScreen from '@/screens/Signup/SignupScreen';

import MainTabs from '@/navigation/MainTabs';

import DailyCoverageScreen from '@/screens/DailyCoverage/DailyCoverageScreen';
import IndentScreen from '@/screens/Indent/IndentScreen';
import DiscardVaccineScreen from '@/screens/DiscardVaccine/DiscardVaccineScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Public Routes */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />

        {/* User Routes */}
        <Stack.Screen
          name="UserMain"
          component={MainTabs}
        />

        <Stack.Screen
          name="DailyCoverage"
          component={DailyCoverageScreen}
        />

        <Stack.Screen
          name="Indent"
          component={IndentScreen}
        />

        <Stack.Screen
          name="DiscardVaccine"
          component={DiscardVaccineScreen}
        />

        {/* Admin Routes */}
        {/* Admin screens yahan baad mein add karenge */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;