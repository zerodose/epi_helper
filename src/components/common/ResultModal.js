import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { colors, spacing, typography } from '@/theme';

const ResultModal = ({
  visible,
  type = 'success',
  title,
  message,
  buttonText = 'OK',
  onPress,
}) => {
  const isSuccess = type === 'success';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onPress}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View
            style={[
              styles.iconContainer,
              isSuccess
                ? styles.successIconContainer
                : styles.errorIconContainer,
            ]}
          >
            <Lucide
              name={isSuccess ? 'check' : 'x'}
              size={32}
              color={isSuccess ? '#16a34a' : '#dc2626'}
              strokeWidth={2.5}
            />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              isSuccess ? styles.successButton : styles.errorButton,
            ]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modalCard: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background,
    borderRadius: 20,
  },

  iconContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    marginBottom: spacing.lg,
  },

  successIconContainer: {
    backgroundColor: '#dcfce7',
  },

  errorIconContainer: {
    backgroundColor: '#fee2e2',
  },

  title: {
    marginBottom: spacing.sm,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text,
    textAlign: 'center',
  },

  message: {
    marginBottom: spacing.xl,
    fontSize: typography.size.md,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  successButton: {
    backgroundColor: colors.primary,
  },

  errorButton: {
    backgroundColor: '#dc2626',
  },

  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: '#ffffff',
  },
});

export default ResultModal;
