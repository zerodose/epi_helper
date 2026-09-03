import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { colors, spacing, typography } from '@/theme';

function UserHomeScreen({ navigation }) {
  const handleDailyCoverage = () => {
    navigation.navigate('DailyCoverage');
  };

  const handleIndent = () => {
    navigation.navigate('Indent');
  };

  const handleViewIndents = () => {
    navigation.navigate('MonthlyIndentList');
  };

  const handleDiscardVaccine = () => {
    navigation.navigate('DiscardVaccine');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>

        <Text style={styles.subtitle}>Welcome to EPI Helper</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={handleDailyCoverage}
          >
            <View style={styles.iconContainer}>
              <Lucide
                name="clipboard-check"
                size={24}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>Add Daily Coverage</Text>

              <Text style={styles.actionSubtitle}>
                Record today's vaccination coverage
              </Text>
            </View>

            <Lucide
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={handleIndent}
          >
            <View style={styles.iconContainer}>
              <Lucide name="file-plus-2" size={24} color={colors.primaryDark} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>Add Indent</Text>

              <Text style={styles.actionSubtitle}>
                Create a new vaccine indent
              </Text>
            </View>

            <Lucide
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={handleViewIndents}
          >
            <View style={styles.iconContainer}>
              <Lucide
                name="clipboard-list"
                size={24}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>View Indents</Text>

              <Text style={styles.actionSubtitle}>
                View all submitted vaccine indents
              </Text>
            </View>

            <Lucide
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={handleDiscardVaccine}
          >
            <View style={styles.iconContainer}>
              <Lucide name="syringe" size={24} color={colors.primaryDark} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>Add Discard Vaccine</Text>

              <Text style={styles.actionSubtitle}>
                Record discarded vaccine doses
              </Text>
            </View>

            <Lucide
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  content: {
    width: '100%',
    padding: spacing.xl,
  },

  title: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },

  actions: {
    width: '100%',
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },

  actionButton: {
    width: '100%',
    minHeight: 76,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.cardRadius,

    elevation: 2,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  iconContainer: {
    width: 46,
    height: 46,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primaryLight,

    borderRadius: 12,
  },

  textContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },

  actionTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  actionSubtitle: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
});

export default UserHomeScreen;
