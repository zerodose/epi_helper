import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { colors, spacing, typography } from '@/theme';

function TextInputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  editable = true,
  maxLength,
  isPassword = false,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const shouldHidePassword = isPassword ? !passwordVisible : secureTextEntry;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={shouldHidePassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          maxLength={maxLength}
          style={[styles.input, isPassword && styles.passwordInput]}
        />

        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Lucide
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  inputContainer: {
    position: 'relative',
    width: '100%',
  },

  input: {
    width: '100%',
    height: spacing.inputHeight,

    paddingHorizontal: spacing.lg,

    backgroundColor: colors.inputBackground,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.inputRadius,

    fontSize: typography.size.md,
    color: colors.text,
  },

  passwordInput: {
    paddingRight: 52,
  },

  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 0,

    width: 48,
    height: spacing.inputHeight,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextInputField;
