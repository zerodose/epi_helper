
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import KeyboardScreen from '@/components/common/KeyboardScreen';
import TextInputField from '@/components/common/TextInputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import AuthHeader from '@/components/common/AuthHeader';
import Loader from '@/components/common/Loader';
import EmailVerificationModal from '@/components/common/EmailVerificationModal';

import { colors, spacing, typography } from '@/theme';

import {
    forgotPassword,
    verifyResetCode,
    resendPasswordResetCode,
} from '@/api/authApi';

function ForgotPasswordScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const [verificationModalVisible, setVerificationModalVisible] =
        useState(false);

    const [verificationError, setVerificationError] = useState('');

    const handleMobileChange = value => {
        const numericValue = value.replace(/\D/g, '');

        setMobileNumber(numericValue);

        if (error) {
            setError('');
        }
    };

    const validateMobileNumber = () => {
        const trimmedMobileNumber = mobileNumber.trim();

        if (!trimmedMobileNumber) {
            setError('Mobile number is required.');
            return false;
        }

        if (!/^03\d{9}$/.test(trimmedMobileNumber)) {
            setError(
                'Enter a valid 11-digit mobile number starting with 03.',
            );
            return false;
        }

        setError('');

        return true;
    };

    const handleSendOTP = async () => {
        if (!validateMobileNumber()) {
            return;
        }

        try {
            setLoading(true);
            setError('');
            setVerificationError('');

            const response = await forgotPassword({
                mobileNumber: mobileNumber.trim(),
            });

            if (!response?.success) {
                setError(
                    response?.message ||
                    'Unable to send verification code.',
                );

                return;
            }

            /*
             * Backend should return the registered email.
             *
             * Example:
             * response.data.email
             *
             * If your API returns it somewhere else,
             * adjust this line according to the actual response.
             */
            const registeredEmail =
                response?.data?.email ||
                response?.email ||
                '';

            setEmail(registeredEmail);

            setVerificationModalVisible(true);
        } catch (error) {
            console.log('Forgot Password Error:', error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Unable to send verification code. Please try again.';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

 const handleVerifyEmail = async code => {
    try {
        setLoading(true);
        setVerificationError('');

        const response = await verifyResetCode({
            mobileNumber: mobileNumber.trim(),
            code,
        });

        if (response?.success) {
            const resetToken = response?.data?.resetToken;

            if (!resetToken) {
                setVerificationError(
                    'Reset session could not be created. Please try again.',
                );
                return;
            }

            setVerificationModalVisible(false);
            setVerificationError('');

            navigation.navigate('ResetPassword', {
                resetToken,
            });
        } else {
            setVerificationError(
                response?.message ||
                'Invalid verification code. Please try again.',
            );
        }
    } catch (error) {
        console.log('Verify Password Reset Code Error:', error);

        const message =
            error?.response?.data?.message ||
            error?.message ||
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

            const response = await resendPasswordResetCode({
                mobileNumber: mobileNumber.trim(),
            });

            if (!response?.success) {
                setVerificationError(
                    response?.message ||
                    'Unable to resend verification code.',
                );
            }
        } catch (error) {
            console.log('Resend Password Reset Code Error:', error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Unable to resend verification code.';

            setVerificationError(message);
        } finally {
            setLoading(false);
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
                title="Forgot Password"
                onBack={() => navigation.goBack()}
            />

            <KeyboardScreen>
                <Loader
                    visible={loading}
                    message="Sending OTP..."
                />

                <View style={styles.container}>
                    <Image
                        source={require('@/assets/images/ehelper-icon-512.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Forgot Password?</Text>

                        <Text style={styles.subtitle}>
                            Enter your registered mobile number to receive a
                            verification code.
                        </Text>

                        <View style={styles.form}>
                            <TextInputField
                                label="Mobile Number"
                                value={mobileNumber}
                                onChangeText={handleMobileChange}
                                placeholder="03XXXXXXXXX"
                                keyboardType="phone-pad"
                                maxLength={11}
                                editable={!loading}
                            />

                            {error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}

                            <PrimaryButton
                                title={loading ? 'Sending OTP...' : 'Send OTP'}
                                onPress={handleSendOTP}
                                disabled={
                                    loading ||
                                    mobileNumber.length !== 11
                                }
                            />
                        </View>

                        <View style={styles.loginRow}>
                            <Text style={styles.loginLabel}>
                                Remember your password?
                            </Text>

                            <Text
                                style={styles.loginLink}
                                onPress={() => navigation.goBack()}
                            >
                                Sign In
                            </Text>
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

export default ForgotPasswordScreen;