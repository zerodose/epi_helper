import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, spacing, typography } from '@/theme';

function PrimaryButton({ title, onPress, disabled = false, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: spacing.buttonHeight,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primaryDark,

    borderRadius: spacing.buttonRadius,
  },

  buttonText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textOnPrimary,
  },

  disabledButton: {
    backgroundColor: colors.disabled,
  },

  disabledText: {
    color: colors.disabledText,
  },
});

export default PrimaryButton;
