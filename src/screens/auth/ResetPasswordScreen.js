import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import KeyboardScreen from '@/components/common/KeyboardScreen';
import TextInputField from '@/components/common/TextInputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import AuthHeader from '@/components/common/AuthHeader';
import Loader from '@/components/common/Loader';

import { colors, spacing, typography } from '@/theme';

import { resetPassword } from '@/api/authApi';

function ResetPasswordScreen({ navigation, route }) {
    const { resetToken } = route.params || {};

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
        general: '',
    });

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            password: '',
            confirmPassword: '',
            general: '',
        };

        if (!password) {
            newErrors.password = 'New password is required.';
        } else if (password.length < 8) {
            newErrors.password =
                'Password must be at least 8 characters.';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword =
                'Please confirm your password.';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword =
                'Passwords do not match.';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(error => !error);
    };

    const handleResetPassword = async () => {
        if (!validateForm()) {
            return;
        }

        if (!resetToken) {
            setErrors(previous => ({
                ...previous,
                general:
                    'Reset session is invalid. Please request a new password reset code.',
            }));

            return;
        }

        try {
            setLoading(true);

            setErrors({
                password: '',
                confirmPassword: '',
                general: '',
            });

            console.log('RESET TOKEN:', resetToken);

            const response = await resetPassword({
                resetToken,
                newPassword: password,
                confirmPassword,
            });

            console.log('RESET PASSWORD RESPONSE:', response);

            if (!response?.success) {
                setErrors(previous => ({
                    ...previous,
                    general:
                        response?.message ||
                        'Unable to reset password.',
                }));

                return;
            }

            navigation.replace('Login');
        } catch (error) {
            console.log('Reset Password Error:', error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Unable to reset password. Please try again.';

            setErrors(previous => ({
                ...previous,
                general: message,
            }));
        } finally {
            setLoading(false);
        }
    };
    const handlePasswordChange = value => {
        setPassword(value);

        if (
            errors.password ||
            errors.confirmPassword ||
            errors.general
        ) {
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

    return (
        <>
            <AuthHeader
                title="Reset Password"
                onBack={() => navigation.goBack()}
            />

            <KeyboardScreen>
                <Loader
                    visible={loading}
                    message="Resetting password..."
                />

                <View style={styles.container}>
                    <Image
                        source={require('@/assets/images/ehelper-icon-512.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <View style={styles.formContainer}>
                        <Text style={styles.title}>
                            Reset Password
                        </Text>

                        <Text style={styles.subtitle}>
                            Create a new password for your account.
                        </Text>

                        <View style={styles.form}>
                            <TextInputField
                                label="New Password"
                                value={password}
                                onChangeText={handlePasswordChange}
                                placeholder="Create a new password"
                                isPassword
                                editable={!loading}
                            />

                            {errors.password ? (
                                <Text style={styles.errorText}>
                                    {errors.password}
                                </Text>
                            ) : null}

                            <TextInputField
                                label="Confirm New Password"
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                placeholder="Confirm your new password"
                                isPassword
                                editable={!loading}
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
                                title={
                                    loading
                                        ? 'Resetting Password...'
                                        : 'Reset Password'
                                }
                                onPress={handleResetPassword}
                                disabled={
                                    loading ||
                                    password.length < 8 ||
                                    confirmPassword.length < 8
                                }
                            />

                            <View style={styles.loginRow}>
                                <Text style={styles.loginLabel}>
                                    Remember your password?
                                </Text>

                                <Text
                                    style={styles.loginLink}
                                    onPress={() =>
                                        navigation.replace('Login')
                                    }
                                >
                                    Sign In
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardScreen>
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
        lineHeight: 22,
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

export default ResetPasswordScreen;