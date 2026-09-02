import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

function ScreenContainer({ children, style }) {
  return (
      <View style={[styles.container, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
  },
});

export default ScreenContainer;
