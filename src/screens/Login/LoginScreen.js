import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import KeyboardScreen from '@/components/common/KeyboardScreen';
import TextInputField from '@/components/common/TextInputField';
import PrimaryButton from '@/components/common/PrimaryButton';

import { colors, spacing, typography } from '@/theme';

const DEMO_CREDENTIALS = {
  user: {
    mobileNumber: '03001234567',
    password: 'User@123',
  },

  admin: {
    mobileNumber: '03007654321',
    password: 'Admin@123',
  },
};

function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    mobileNumber: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      mobileNumber: '',
      password: '',
    };

    const trimmedMobile = mobileNumber.trim();

    // Mobile Number validation
    if (!trimmedMobile) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^03\d{9}$/.test(trimmedMobile)) {
      newErrors.mobileNumber =
        'Enter a valid 11-digit mobile number starting with 03.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    return !newErrors.mobileNumber && !newErrors.password;
  };

  const handleLogin = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Real login/API logic yahan add karenge.
    navigation.replace('MainTabs');
  };

  const handleMobileChange = value => {
    setMobileNumber(value);

    if (errors.mobileNumber) {
      setErrors(previous => ({
        ...previous,
        mobileNumber: '',
      }));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);

    if (errors.password) {
      setErrors(previous => ({
        ...previous,
        password: '',
      }));
    }
  };

  const handleDemoLogin = type => {
    const credentials = DEMO_CREDENTIALS[type];

    setMobileNumber(credentials.mobileNumber);
    setPassword(credentials.password);

    setErrors({
      mobileNumber: '',
      password: '',
    });
  };

  const handleForgotPassword = () => {
    // Forgot Password screen/navigation yahan add karenge.
  };

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign In</Text>

          <Text style={styles.subtitle}>
            Sign in to your EPI Helper account
          </Text>

          <View style={styles.form}>
            <TextInputField
              label="Mobile Number"
              value={mobileNumber}
              onChangeText={handleMobileChange}
              placeholder="03XXXXXXXXX"
              keyboardType="phone-pad"
              maxLength={11}
            />

            {errors.mobileNumber ? (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            ) : null}

            <TextInputField
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter your password"
              isPassword
            />

            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.forgotButton}
              activeOpacity={0.7}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryButton
              title="Sign In"
              onPress={handleLogin}
              disabled={password.length < 8 || mobileNumber.length < 11}
            />

            <View style={styles.signupRow}>
              <Text style={styles.signupLabel}>Don't have an account?</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Quick Login</Text>

            <Text style={styles.demoSubtitle}>
              Select an account to automatically fill credentials
            </Text>

            <View style={styles.demoButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.demoButton}
                onPress={() => handleDemoLogin('user')}
              >
                <Text style={styles.demoButtonText}>User</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.demoButton}
                onPress={() => handleDemoLogin('admin')}
              >
                <Text style={styles.demoButtonText}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
    backgroundColor: colors.background,
  },

  formContainer: {
    width: '100%',
    maxWidth: 500,
  },

  title: {
    textAlign: 'center',
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxxl,
    textAlign: 'center',
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },

  form: {
    width: '100%',
  },

  errorText: {
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
    marginLeft: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.danger,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },

  forgotText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.primaryDark,
  },

  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },

  signupLabel: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },

  signupLink: {
    marginLeft: spacing.xs,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },

  demoSection: {
    width: '100%',
    marginTop: spacing.xxxl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  demoTitle: {
    textAlign: 'center',
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  demoSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  demoButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  demoButton: {
    flex: 1,
    height: spacing.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.buttonRadius,
  },

  demoButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },
});

export default LoginScreen;
