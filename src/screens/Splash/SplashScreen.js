import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import { colors } from '@/theme';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/ehelper-icon-512.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  logo: {
    width: 180,
    height: 180,
  },
});

export default SplashScreen;