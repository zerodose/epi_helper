import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/ehelper-icon-1024.png')}
          style={styles.logo}
          resizeMode="contain"
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2088e8',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#687076',
    textAlign: 'center',
  },
});

export default HomeScreen;