import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing, typography } from '@/theme';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPI Helper</Text>
      <Text style={styles.subtitle}>Welcome</Text>
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

  title: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.primaryDark,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.size.lg,
    color: colors.textSecondary,
  },
});

export default SplashScreen;