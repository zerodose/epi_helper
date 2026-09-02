import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import {  Pressable, StyleSheet, View } from 'react-native';
import AppHeader from '@/components/common/AppHeader';
import HomeScreen from '@/screens/Home/HomeScreen';
import MonthlyReportScreen from '@/screens/MonthlyReport/MonthlyReportScreen';
import WastageReportScreen from '@/screens/WastageReport/WastageReportScreen';

import { colors, spacing, typography } from '@/theme';

const Tab = createBottomTabNavigator();

function TabScreen({ children, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <AppHeader navigation={navigation} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

function TabIcon({ name, focused, color }) {
  return (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <Lucide
        name={name}
        size={23}
        color={focused ? colors.textOnPrimary : color}
      />
    </View>
  );
}

function MainTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarLabelPosition: 'below-icon',

        tabBarStyle: [
          styles.tabBar,
          {
            paddingTop: 10,
            height: 80,
            paddingBottom: spacing.xs,
          },
        ],

        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,

        tabBarButton: props => (
          <Pressable
            {...props}
            android_ripple={{
              color: colors.border,
              radius: 24,
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="layout-dashboard" focused={focused} color={color} />
          ),
        }}
      >
        {props => (
          <TabScreen navigation={props.navigation}>
            <HomeScreen {...props} />
          </TabScreen>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="MonthlyReport"
        options={{
          title: 'Monthly Report',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="file-text" focused={focused} color={color} />
          ),
        }}
      >
        {props => (
          <TabScreen navigation={props.navigation}>
            <MonthlyReportScreen {...props} />
          </TabScreen>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="WastageReport"
        options={{
          title: 'Wastage Report',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="trash-2" focused={focused} color={color} />
          ),
        }}
      >
        {props => (
          <TabScreen navigation={props.navigation}>
            <WastageReportScreen {...props} />
          </TabScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  headerWrapper: {
    position: 'relative',
    zIndex: 1000,
    elevation: 20,
  },

  content: {
    flex: 1,
    zIndex: 1,
    elevation: 1,
  },

  tabBar: {
    height: 80,

    backgroundColor: colors.background,

    borderTopWidth: 1,
    borderTopColor: colors.border,

    elevation: 8,

    shadowOpacity: 0.08,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  tabBarIcon: {
    marginTop: spacing.xs,
    marginBottom: 0,
  },

  tabBarLabel: {
    ...typography.tabLabel,
    marginTop: 10,
    marginBottom: spacing.xs,
  },

  iconContainer: {
    width: 38,
    height: 34,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
  },

  activeIconContainer: {
    width: 42,
    height: 38,

    borderRadius: 11,

    backgroundColor: colors.primaryDark,
  },
});

export default MainTabs;
