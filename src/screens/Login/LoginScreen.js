import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import KeyboardScreen from '@/components/common/KeyboardScreen';
import TextInputField from '@/components/common/TextInputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography } from '@/theme';
import Loader from '@/components/common/Loader';
import { loginUser } from '@/api/authApi';

const DEMO_CREDENTIALS = {
  user: {
    mobileNumber: '03122255770',
    password: '12345678',
    role: 'user',
  },

  admin: {
    mobileNumber: '03007654321',
    password: 'Admin@123',
    role: 'admin',
  },
};

function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      setErrors({
        mobileNumber: '',
        password: '',
      });

      const response = await loginUser({
        mobileNumber: mobileNumber.trim(),
        password,
      });

      if (!response?.success) {
        setErrors({
          mobileNumber: response?.message || 'Login failed.',
          password: '',
        });

        return;
      }

      const { token, user } = response.data;

      await AsyncStorage.setItem('authToken', token);

      await AsyncStorage.setItem('authUser', JSON.stringify(user));

      navigation.replace('UserMain', {
        role: user.role,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to login. Please try again.';

      setErrors({
        mobileNumber: message,
        password: '',
      });
    } finally {
      setLoading(false);
    }
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

    if (errors.mobileNumber) {
      setErrors(previous => ({
        ...previous,
        mobileNumber: '',
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
      <Loader visible={loading} message="Logging in..." />
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/ehelper-icon-512.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
              disabled={
                loading || password.length < 8 || mobileNumber.length < 11
              }
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
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
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
  logo: {
    width: 100,
    height: 100,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryDark,
    opacity: 0.8,
  },
});

export default LoginScreen;
