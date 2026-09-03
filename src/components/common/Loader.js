import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

const Loader = ({ visible = false, message = 'Loading...' }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color={colors.primaryDark} />

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  loaderCard: {
    minWidth: 140,

    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,

    backgroundColor: colors.background,

    borderRadius: spacing.cardRadius,

    elevation: 6,
  },

  message: {
    marginTop: spacing.md,

    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,

    color: colors.text,
  },
});

export default Loader;
