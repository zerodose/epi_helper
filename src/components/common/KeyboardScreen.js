// import React from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';

// import { colors } from '@/theme';

// function KeyboardScreen({
//   children,
//   contentContainerStyle,
//   style,
//   keyboardVerticalOffset = 0,
//   showsVerticalScrollIndicator = false,
// }) {
//   return (
//     <KeyboardAvoidingView
//       style={[styles.keyboardView, style]}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={keyboardVerticalOffset}
//     >
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
//         keyboardShouldPersistTaps="handled"
//         keyboardDismissMode="none"
//         showsVerticalScrollIndicator={showsVerticalScrollIndicator}
//         automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
//       >
//         <View style={styles.content}>{children}</View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   keyboardView: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   scrollView: {
//     flex: 1,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },

//   content: {
//     width: '100%',
//   },
// });

// export default KeyboardScreen;

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { colors, spacing } from '@/theme';

function KeyboardScreen({
  children,
  contentContainerStyle,
  style,
  keyboardVerticalOffset = 0,
  showsVerticalScrollIndicator = false,
}) {
  return (
    <KeyboardAvoidingView
      style={[styles.keyboardView, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        <View style={styles.content}>{children}</View>

        {/* Always keep space after the last content */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },

  content: {
    width: '100%',
  },

  bottomSpacing: {
    height: spacing.xxxl,
  },
});

export default KeyboardScreen;
