
// import React, { useState } from 'react';
// import {
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Lucide } from '@react-native-vector-icons/lucide/static';

// import PrimaryButton from '@/components/common/PrimaryButton';

// import { colors, spacing, typography } from '@/theme';

// function EmailVerificationModal({
//   visible,
//   email,
//   onVerify,
//   onResend,
//   onClose,
// }) {
//   const [code, setCode] = useState('');
//   const [error, setError] = useState('');

//   const validateCode = () => {
//     if (!code.trim()) {
//       setError('Verification code is required.');
//       return false;
//     }

//     if (!/^\d{6}$/.test(code.trim())) {
//       setError('Enter a valid 6-digit verification code.');
//       return false;
//     }

//     setError('');

//     return true;
//   };

//   const handleCodeChange = value => {
//     const numericValue = value.replace(/\D/g, '');

//     setCode(numericValue);

//     if (error) {
//       setError('');
//     }
//   };

//   const handleVerify = () => {
//     const isValid = validateCode();

//     if (!isValid) {
//       return;
//     }

//     onVerify(code);
//   };

//   const handleResend = () => {
//     setCode('');
//     setError('');

//     onResend();
//   };

//   const handleClose = () => {
//     setCode('');
//     setError('');

//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       onRequestClose={handleClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.modal}>
//           <View style={styles.iconContainer}>
//             <Lucide name="mail-check" size={28} color={colors.primaryDark} />
//           </View>

//           <Text style={styles.title}>Verify Your Email</Text>

//           <Text style={styles.description}>
//             We have sent a verification code to:
//           </Text>

//           <Text style={styles.email}>{email}</Text>

//           <Text style={styles.instruction}>
//             Enter the 6-digit verification code below to continue.
//           </Text>

//           <TextInput
//             value={code}
//             onChangeText={handleCodeChange}
//             placeholder="Enter verification code"
//             placeholderTextColor={colors.inputPlaceholder}
//             keyboardType="number-pad"
//             maxLength={6}
//             style={[styles.codeInput, error && styles.codeInputError]}
//           />

//           {error ? <Text style={styles.errorText}>{error}</Text> : null}

//           <PrimaryButton
//             title="Verify Email"
//             onPress={handleVerify}
//             disabled={code.length < 6}
//           />

//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.resendButton}
//             onPress={handleResend}
//           >
//             <Text style={styles.resendText}>Resend Code</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.closeButton}
//             onPress={handleClose}
//           >
//             <Text style={styles.closeText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,

//     alignItems: 'center',
//     justifyContent: 'center',

//     padding: spacing.xxl,

//     backgroundColor: 'rgba(0, 0, 0, 0.45)',
//   },

//   modal: {
//     width: '100%',
//     maxWidth: 420,

//     padding: spacing.xxl,

//     backgroundColor: colors.background,

//     borderRadius: spacing.cardRadius,
//   },

//   iconContainer: {
//     width: 56,
//     height: 56,

//     alignSelf: 'center',

//     alignItems: 'center',
//     justifyContent: 'center',

//     marginBottom: spacing.lg,

//     backgroundColor: colors.primaryLight,

//     borderRadius: 28,
//   },

//   title: {
//     textAlign: 'center',

//     fontSize: typography.size.xxl,
//     fontWeight: typography.weight.bold,

//     color: colors.text,
//   },

//   description: {
//     marginTop: spacing.md,

//     textAlign: 'center',

//     fontSize: typography.size.md,
//     color: colors.textSecondary,
//   },

//   email: {
//     marginTop: spacing.xs,

//     textAlign: 'center',

//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,

//     color: colors.primaryDark,
//   },

//   instruction: {
//     marginTop: spacing.lg,
//     marginBottom: spacing.md,

//     textAlign: 'center',

//     fontSize: typography.size.sm,
//     color: colors.textSecondary,
//   },

//   codeInput: {
//     width: '100%',
//     height: spacing.inputHeight,

//     marginBottom: spacing.lg,

//     paddingHorizontal: spacing.lg,

//     textAlign: 'center',

//     backgroundColor: colors.inputBackground,

//     borderWidth: 1,
//     borderColor: colors.border,

//     borderRadius: spacing.inputRadius,

//     fontSize: typography.size.lg,
//     fontWeight: typography.weight.semibold,

//     letterSpacing: 4,

//     color: colors.text,
//   },

//   codeInputError: {
//     borderColor: colors.danger,
//   },

//   errorText: {
//     marginTop: -spacing.md,
//     marginBottom: spacing.lg,
//     marginLeft: spacing.xs,

//     fontSize: typography.size.sm,

//     color: colors.danger,
//   },

//   resendButton: {
//     alignItems: 'center',

//     marginTop: spacing.lg,
//   },

//   resendText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,

//     color: colors.primaryDark,
//   },

//   closeButton: {
//     alignItems: 'center',

//     marginTop: spacing.md,
//   },

//   closeText: {
//     fontSize: typography.size.md,

//     color: colors.textSecondary,
//   },
// });

// export default EmailVerificationModal;

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Lucide} from '@react-native-vector-icons/lucide/static';
import {colors, spacing, typography} from '@/theme';

function EmailVerificationModal({
  visible,
  email,
  onVerify,
  onResend,
  onClose,
  loading = false,
  error = '',
}) {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  useEffect(() => {
    if (visible) {
      setCode('');
      setCodeError('');
    }
  }, [visible]);

  const handleCodeChange = value => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);

    setCode(numericValue);

    if (codeError) {
      setCodeError('');
    }
  };

  const handleVerify = () => {
    if (!code) {
      setCodeError('Verification code is required.');
      return;
    }

    if (code.length !== 6) {
      setCodeError('Enter the 6-digit verification code.');
      return;
    }

    onVerify(code);
  };

  const handleResend = () => {
    setCode('');
    setCodeError('');
    onResend();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <Lucide
              name="mail-check"
              size={28}
              color={colors.primaryDark}
            />
          </View>

          <Text style={styles.title}>Verify Your Email</Text>

          <Text style={styles.description}>
            We have sent a 6-digit verification code to:
          </Text>

          <Text style={styles.email}>{email}</Text>

          <TextInput
            value={code}
            onChangeText={handleCodeChange}
            placeholder="Enter 6-digit code"
            placeholderTextColor={colors.textSecondary}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
            style={styles.input}
          />

          {codeError ? (
            <Text style={styles.errorText}>{codeError}</Text>
          ) : null}

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.verifyButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleVerify}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify Email</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleResend}
            disabled={loading}
            style={styles.resendButton}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            disabled={loading}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },

  modal: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text,
    textAlign: 'center',
  },

  description: {
    marginTop: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  email: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    height: 52,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    textAlign: 'center',
    fontSize: typography.size.lg,
    letterSpacing: 3,
    color: colors.text,
  },

  errorText: {
    width: '100%',
    marginTop: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.danger,
    textAlign: 'center',
  },

  verifyButton: {
    width: '100%',
    height: 48,
    marginTop: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.7,
  },

  verifyButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: '#ffffff',
  },

  resendButton: {
    marginTop: spacing.lg,
  },

  resendText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },

  cancelText: {
    marginTop: spacing.md,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
});

export default EmailVerificationModal;