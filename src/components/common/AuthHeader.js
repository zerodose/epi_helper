import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { colors, spacing, typography } from '@/theme';

function AuthHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backButton}
        onPress={onBack}
      >
        <Lucide name="arrow-left" size={22} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 56,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.screenHorizontal,

    backgroundColor: colors.background,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
  },

  title: {
    flex: 1,

    marginLeft: spacing.sm,

    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,

    color: colors.text,
  },

  rightSpace: {
    width: 40,
  },
});

export default AuthHeader;
