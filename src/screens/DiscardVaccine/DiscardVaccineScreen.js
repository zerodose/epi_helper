import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthHeader from '@/components/common/AuthHeader';

import { colors, spacing, typography } from '@/theme';

function DiscardVaccineScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AuthHeader
        title="Add Discard Vaccine"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Add discarded vaccine details.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  content: {
    padding: spacing.xl,
  },

  subtitle: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
});

export default DiscardVaccineScreen;