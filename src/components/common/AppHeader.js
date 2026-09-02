import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { colors, spacing, typography } from '@/theme';

function AppHeader({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleProfile = () => {
    setMenuVisible(false);

    // Profile screen baad mein add karenge
  };

  const handleChangePassword = () => {
    setMenuVisible(false);

    // Change Password screen baad mein add karenge
  };

  const handleLogout = () => {
    setMenuVisible(false);

    navigation.replace('Login');
  };

  return (
      <View style={styles.header}>
        {/* LEFT */}
        <View style={styles.leftSection}>
          <Image
            source={require('@/assets/images/ehelper-icon-512.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View>
            <Text style={styles.title}>EPI Helper</Text>
            <Text style={styles.subtitle}>Immunization Assistant</Text>
          </View>
        </View>

        {/* RIGHT MENU */}
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuButton}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Lucide
              name="ellipsis-vertical"
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleProfile}
              >
                <Lucide name="user" size={19} color={colors.textSecondary} />

                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleChangePassword}
              >
                <Lucide
                  name="lock-keyhole"
                  size={19}
                  color={colors.textSecondary}
                />

                <Text style={styles.menuText}>Change Password</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <Lucide name="log-out" size={19} color={colors.danger} />

                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    zIndex: 1000,
  },

  header: {
    height: 64,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.screenHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    zIndex: 1000,
    elevation: 5,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: spacing.md - 2,
  },

  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.primaryDark,
  },

  subtitle: {
    fontSize: typography.size.xs + 1,
    color: colors.textSecondary,
    marginTop: 1,
  },

  menuWrapper: {
    position: 'relative',
    zIndex: 2000,
    elevation: 30,
  },

  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.inputRadius,
  },

  menu: {
    position: 'absolute',
    top: 44,
    right: 0,

    width: 190,

    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.cardRadius,

    paddingVertical: 6,

    elevation: 30,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    zIndex: 3000,
  },

  menuItem: {
    height: 44,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',

    zIndex: 3001,
  },

  menuText: {
    marginLeft: spacing.md,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  menuDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.xs,
  },

  logoutText: {
    marginLeft: spacing.md,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.danger,
  },
});

export default AppHeader;
