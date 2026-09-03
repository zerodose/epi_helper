// import React, { useState } from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import KeyboardScreen from '@/components/common/KeyboardScreen';

// import TextInputField from '@/components/common/TextInputField';
// import PrimaryButton from '@/components/common/PrimaryButton';
// import EmailVerificationModal from '@/components/common/EmailVerificationModal';

// import { colors, spacing, typography } from '@/theme';
// import AuthHeader from '@/components/common/AuthHeader';

// function SignupScreen({ navigation }) {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [errors, setErrors] = useState({
//     fullName: '',
//     email: '',
//     mobileNumber: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [verificationModalVisible, setVerificationModalVisible] =
//     useState(false);

//   const validateForm = () => {
//     const newErrors = {
//       fullName: '',
//       email: '',
//       mobileNumber: '',
//       password: '',
//       confirmPassword: '',
//     };

//     const trimmedFullName = fullName.trim();
//     const trimmedEmail = email.trim();
//     const trimmedMobileNumber = mobileNumber.trim();

//     // Full Name
//     if (!trimmedFullName) {
//       newErrors.fullName = 'Full name is required.';
//     } else if (trimmedFullName.length < 3) {
//       newErrors.fullName = 'Full name must be at least 3 characters.';
//     }

//     // Email
//     if (!trimmedEmail) {
//       newErrors.email = 'Email address is required.';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
//       newErrors.email = 'Enter a valid email address.';
//     }

//     // Mobile Number
//     if (!trimmedMobileNumber) {
//       newErrors.mobileNumber = 'Mobile number is required.';
//     } else if (!/^03\d{9}$/.test(trimmedMobileNumber)) {
//       newErrors.mobileNumber =
//         'Enter a valid 11-digit mobile number starting with 03.';
//     }

//     // Password
//     if (!password) {
//       newErrors.password = 'Password is required.';
//     } else if (password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters.';
//     }

//     // Confirm Password
//     if (!confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password.';
//     } else if (confirmPassword !== password) {
//       newErrors.confirmPassword = 'Passwords do not match.';
//     }

//     setErrors(newErrors);

//     return Object.values(newErrors).every(error => !error);
//   };

//   const handleSignup = () => {
//     const isValid = validateForm();

//     if (!isValid) {
//       return;
//     }

//     // Signup API yahan add karenge.
//     // Successful signup ke baad email verification modal.
//     setVerificationModalVisible(true);
//   };

//   const handleFullNameChange = value => {
//     setFullName(value);

//     if (errors.fullName) {
//       setErrors(previous => ({
//         ...previous,
//         fullName: '',
//       }));
//     }
//   };

//   const handleEmailChange = value => {
//     setEmail(value);

//     if (errors.email) {
//       setErrors(previous => ({
//         ...previous,
//         email: '',
//       }));
//     }
//   };

//   const handleMobileChange = value => {
//     // Sirf numbers allow karna
//     const numericValue = value.replace(/\D/g, '');

//     setMobileNumber(numericValue);

//     if (errors.mobileNumber) {
//       setErrors(previous => ({
//         ...previous,
//         mobileNumber: '',
//       }));
//     }
//   };

//   const handlePasswordChange = value => {
//     setPassword(value);

//     if (errors.password || errors.confirmPassword) {
//       setErrors(previous => ({
//         ...previous,
//         password: '',
//         confirmPassword: '',
//       }));
//     }
//   };

//   const handleConfirmPasswordChange = value => {
//     setConfirmPassword(value);

//     if (errors.confirmPassword) {
//       setErrors(previous => ({
//         ...previous,
//         confirmPassword: '',
//       }));
//     }
//   };

//   const handleVerifyEmail = code => {
//     // Email verification API yahan add karenge.

//     console.log('Verification Code:', code);

//     setVerificationModalVisible(false);

//     navigation.goBack();
//   };

//   const handleResendCode = () => {
//     // Resend verification email API yahan add karenge.

//     console.log('Verification code resent');
//   };

//   const handleCloseVerification = () => {
//     setVerificationModalVisible(false);
//   };

//   return (
//     <>
//       <AuthHeader title="Create Account" onBack={() => navigation.goBack()} />
//       <KeyboardScreen>
//         <View style={styles.container}>
//           <Image
//             source={require('@/assets/images/ehelper-icon-512.png')}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <View style={styles.formContainer}>
//             <Text style={styles.title}>Create Account</Text>

//             <Text style={styles.subtitle}>Create your EPI Helper account</Text>

//             <View style={styles.form}>
//               {/* Full Name */}
//               <TextInputField
//                 label="Full Name"
//                 value={fullName}
//                 onChangeText={handleFullNameChange}
//                 placeholder="Enter your full name"
//                 autoCapitalize="words"
//               />

//               {errors.fullName ? (
//                 <Text style={styles.errorText}>{errors.fullName}</Text>
//               ) : null}

//               {/* Email */}
//               <TextInputField
//                 label="Email Address"
//                 value={email}
//                 onChangeText={handleEmailChange}
//                 placeholder="Enter your email address"
//                 keyboardType="email-address"
//               />

//               {errors.email ? (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               ) : null}

//               {/* Mobile Number */}
//               <TextInputField
//                 label="Mobile Number"
//                 value={mobileNumber}
//                 onChangeText={handleMobileChange}
//                 placeholder="03XXXXXXXXX"
//                 keyboardType="phone-pad"
//                 maxLength={11}
//               />

//               {errors.mobileNumber ? (
//                 <Text style={styles.errorText}>{errors.mobileNumber}</Text>
//               ) : null}

//               {/* Password */}
//               <TextInputField
//                 label="Password"
//                 value={password}
//                 onChangeText={handlePasswordChange}
//                 placeholder="Create a password"
//                 isPassword
//               />

//               {errors.password ? (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               ) : null}

//               {/* Confirm Password */}
//               <TextInputField
//                 label="Confirm Password"
//                 value={confirmPassword}
//                 onChangeText={handleConfirmPasswordChange}
//                 placeholder="Confirm your password"
//                 isPassword
//               />

//               {errors.confirmPassword ? (
//                 <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//               ) : null}

//               <PrimaryButton
//                 title="Create Account"
//                 onPress={handleSignup}
//                 disabled={password.length < 8 || confirmPassword.length < 8}
//               />

//               <View style={styles.loginRow}>
//                 <Text style={styles.loginLabel}>Already have an account?</Text>

//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() => navigation.goBack()}
//                 >
//                   <Text style={styles.loginLink}>Sign In</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </KeyboardScreen>

//       <EmailVerificationModal
//         visible={verificationModalVisible}
//         email={email}
//         onVerify={handleVerifyEmail}
//         onResend={handleResendCode}
//         onClose={handleCloseVerification}
//       />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   keyboardView: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   scrollContent: {
//     flexGrow: 1,
//   },

//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: spacing.xxl,
//     paddingVertical: spacing.md,
//     backgroundColor: colors.background,
//   },

//   formContainer: {
//     width: '100%',
//     maxWidth: 500,
//   },

//   title: {
//     textAlign: 'center',
//     fontSize: typography.size.xxxl,
//     fontWeight: typography.weight.bold,
//     color: colors.text,
//   },

//   subtitle: {
//     marginTop: spacing.sm,
//     marginBottom: spacing.xxxl,
//     textAlign: 'center',
//     fontSize: typography.size.md,
//     color: colors.textSecondary,
//   },

//   form: {
//     width: '100%',
//   },

//   errorText: {
//     marginTop: -spacing.md,
//     marginBottom: spacing.lg,
//     marginLeft: spacing.xs,
//     fontSize: typography.size.sm,
//     color: colors.danger,
//   },

//   loginRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: spacing.xl,
//   },

//   loginLabel: {
//     fontSize: typography.size.md,
//     color: colors.textSecondary,
//   },

//   loginLink: {
//     marginLeft: spacing.xs,
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.primaryDark,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
// });

// export default SignupScreen;

import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import KeyboardScreen from '@/components/common/KeyboardScreen';
import TextInputField from '@/components/common/TextInputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import EmailVerificationModal from '@/components/common/EmailVerificationModal';
import AuthHeader from '@/components/common/AuthHeader';

import {colors, spacing, typography} from '@/theme';

import {
  signupUser,
  verifyEmail,
  resendVerificationCode,
} from '@/services/authApi';

function SignupScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);

  const [verificationError, setVerificationError] = useState('');

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      general: '',
    };

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMobileNumber = mobileNumber.trim();

    if (!trimmedFullName) {
      newErrors.fullName = 'Full name is required.';
    } else if (trimmedFullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!trimmedMobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^03\d{9}$/.test(trimmedMobileNumber)) {
      newErrors.mobileNumber =
        'Enter a valid 11-digit mobile number starting with 03.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => !error);
  };

  const handleSignup = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      setVerificationError('');

      const response = await signupUser({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        password,
        confirmPassword,
      });

      if (response?.success) {
        setVerificationModalVisible(true);
      } else {
        setErrors(previous => ({
          ...previous,
          general:
            response?.message || 'Unable to create account.',
        }));
      }
    } catch (error) {
      console.log('Signup Error:', error);

      const message =
        error?.response?.data?.message ||
        'Unable to create account. Please try again.';

      setErrors(previous => ({
        ...previous,
        general: message,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async code => {
    try {
      setLoading(true);
      setVerificationError('');

      const response = await verifyEmail({
        email: email.trim().toLowerCase(),
        code,
      });

      if (response?.success) {
        setVerificationModalVisible(false);

        navigation.goBack();
      } else {
        setVerificationError(
          response?.message || 'Email verification failed.',
        );
      }
    } catch (error) {
      console.log('Verify Email Error:', error);

      const message =
        error?.response?.data?.message ||
        'Invalid verification code. Please try again.';

      setVerificationError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      setVerificationError('');

      const response = await resendVerificationCode({
        email: email.trim().toLowerCase(),
      });

      if (!response?.success) {
        setVerificationError(
          response?.message || 'Unable to resend verification code.',
        );
      }
    } catch (error) {
      console.log('Resend Code Error:', error);

      const message =
        error?.response?.data?.message ||
        'Unable to resend verification code.';

      setVerificationError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullNameChange = value => {
    setFullName(value);

    if (errors.fullName || errors.general) {
      setErrors(previous => ({
        ...previous,
        fullName: '',
        general: '',
      }));
    }
  };

  const handleEmailChange = value => {
    setEmail(value);

    if (errors.email || errors.general) {
      setErrors(previous => ({
        ...previous,
        email: '',
        general: '',
      }));
    }
  };

  const handleMobileChange = value => {
    const numericValue = value.replace(/\D/g, '');

    setMobileNumber(numericValue);

    if (errors.mobileNumber || errors.general) {
      setErrors(previous => ({
        ...previous,
        mobileNumber: '',
        general: '',
      }));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);

    if (errors.password || errors.confirmPassword || errors.general) {
      setErrors(previous => ({
        ...previous,
        password: '',
        confirmPassword: '',
        general: '',
      }));
    }
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);

    if (errors.confirmPassword || errors.general) {
      setErrors(previous => ({
        ...previous,
        confirmPassword: '',
        general: '',
      }));
    }
  };

  const handleCloseVerification = () => {
    if (!loading) {
      setVerificationModalVisible(false);
      setVerificationError('');
    }
  };

  return (
    <>
      <AuthHeader
        title="Create Account"
        onBack={() => navigation.goBack()}
      />

      <KeyboardScreen>
        <View style={styles.container}>
          <Image
            source={require('@/assets/images/ehelper-icon-512.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
              Create your EPI Helper account
            </Text>

            <View style={styles.form}>
              <TextInputField
                label="Full Name"
                value={fullName}
                onChangeText={handleFullNameChange}
                placeholder="Enter your full name"
                autoCapitalize="words"
              />

              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}

              <TextInputField
                label="Email Address"
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <TextInputField
                label="Mobile Number"
                value={mobileNumber}
                onChangeText={handleMobileChange}
                placeholder="03XXXXXXXXX"
                keyboardType="phone-pad"
                maxLength={11}
              />

              {errors.mobileNumber ? (
                <Text style={styles.errorText}>
                  {errors.mobileNumber}
                </Text>
              ) : null}

              <TextInputField
                label="Password"
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Create a password"
                isPassword
              />

              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TextInputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                isPassword
              />

              {errors.confirmPassword ? (
                <Text style={styles.errorText}>
                  {errors.confirmPassword}
                </Text>
              ) : null}

              {errors.general ? (
                <Text style={styles.generalErrorText}>
                  {errors.general}
                </Text>
              ) : null}

              <PrimaryButton
                title={loading ? 'Creating Account...' : 'Create Account'}
                onPress={handleSignup}
                disabled={
                  loading ||
                  password.length < 8 ||
                  confirmPassword.length < 8
                }
              />

              <View style={styles.loginRow}>
                <Text style={styles.loginLabel}>
                  Already have an account?
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.goBack()}
                  disabled={loading}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardScreen>

      <EmailVerificationModal
        visible={verificationModalVisible}
        email={email}
        loading={loading}
        error={verificationError}
        onVerify={handleVerifyEmail}
        onResend={handleResendCode}
        onClose={handleCloseVerification}
      />
    </>
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
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
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

  generalErrorText: {
    marginBottom: spacing.md,
    fontSize: typography.size.sm,
    color: colors.danger,
    textAlign: 'center',
  },

  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },

  loginLabel: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },

  loginLink: {
    marginLeft: spacing.xs,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },

  logo: {
    width: 100,
    height: 100,
  },
});

export default SignupScreen;