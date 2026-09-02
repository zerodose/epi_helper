import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

function WastageReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wastage Report</Text>

      <Text style={styles.subtitle}>Wastage report will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  title: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    color: colors.primaryDark,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
});

export default WastageReportScreen;
