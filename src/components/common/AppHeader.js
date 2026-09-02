import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../assets/images/ehelper-icon-512.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.title}>EPI Helper</Text>
          <Text style={styles.subtitle}>Immunization Assistant</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dce3e8',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 44,
    height: 44,
    marginRight: 12,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2088e8',
  },

  subtitle: {
    fontSize: 11,
    color: '#687076',
    marginTop: 2,
  },
});

export default AppHeader;