import React, { useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import AuthHeader from '@/components/common/AuthHeader';
import KeyboardScreen from '@/components/common/KeyboardScreen';

import { colors, spacing, typography } from '@/theme';

function DailyCoverageScreen({ navigation }) {
  const [coverage, setCoverage] = useState({
    bcg: '',
    hep: '',
    penta1: '',
    penta2: '',
    penta3: '',
    measles1: '',
    measles2: '',
    td: '',
    hpv: '',
  });
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const inputRefs = useRef({});
  const [focusedField, setFocusedField] = useState(null);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const vaccineFields = [
    { label: 'BCG', field: 'bcg' },
    { label: 'Hep', field: 'hep' },
    { label: 'Penta 1', field: 'penta1' },
    { label: 'Penta 2', field: 'penta2' },
    { label: 'Penta 3', field: 'penta3' },
    { label: 'Measles 1', field: 'measles1' },
    { label: 'Measles 2', field: 'measles2' },
    { label: 'TD', field: 'td' },
    { label: 'HPV', field: 'hpv' },
  ];

  const handleChange = (field, value) => {
    const numericValue = value.replace(/\D/g, '');

    setCoverage(previous => ({
      ...previous,
      [field]: numericValue,
    }));
  };

  const handleNext = index => {
    const nextField = vaccineFields[index + 1];

    if (nextField) {
      inputRefs.current[nextField.field]?.focus();
    }
  };

  const handleSave = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmSave = () => {
    setConfirmationVisible(false);

    // API submit yahan add karenge.
    console.log('Daily Coverage Saved:', {
      coverageDate: currentDate,
      coverage,
    });
    navigation.goBack();
  };

  const handleCancelConfirmation = () => {
    setConfirmationVisible(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Add Daily Coverage"
        onBack={() => navigation.goBack()}
      />

      <KeyboardScreen contentContainerStyle={styles.scrollContent}>
        {/* Coverage Date */}
        <View style={styles.dateCard}>
          <View style={styles.dateIcon}>
            <Lucide name="calendar-days" size={20} color={colors.primaryDark} />
          </View>

          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>Coverage Date</Text>

            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
        </View>

        {/* Vaccine Coverage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccine Coverage</Text>

          <Text style={styles.sectionSubtitle}>
            Enter the number of doses given.
          </Text>

          <View style={styles.formCard}>
            {vaccineFields.map((item, index) => (
              <View
                key={item.field}
                style={[
                  styles.vaccineRow,
                  focusedField === item.field && styles.focusedVaccineRow,
                  index === vaccineFields.length - 1 && styles.lastVaccineRow,
                ]}
              >
                <Text style={styles.vaccineLabel}>{item.label}</Text>

                <TextInput
                  ref={ref => {
                    inputRefs.current[item.field] = ref;
                  }}
                  value={coverage[item.field]}
                  onChangeText={value => handleChange(item.field, value)}
                  placeholder="0"
                  placeholderTextColor={colors.inputPlaceholder}
                  keyboardType="number-pad"
                  returnKeyType={
                    index === vaccineFields.length - 1 ? 'done' : 'next'
                  }
                  onSubmitEditing={() => handleNext(index)}
                  blurOnSubmit={index === vaccineFields.length - 1}
                  onFocus={() => setFocusedField(item.field)}
                  onBlur={() => setFocusedField(null)}
                  style={[
                    styles.input,
                    focusedField === item.field && styles.focusedInput,
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Lucide name="save" size={18} color={colors.textOnPrimary} />

            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardScreen>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmationVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <Lucide
                  name="clipboard-check"
                  size={22}
                  color={colors.primaryDark}
                />
              </View>

              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>Confirm Daily Coverage</Text>
                <Text style={styles.modalSubtitle}>
                  Please review the entered values.
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.modalCloseButton}
                onPress={handleCancelConfirmation}
              >
                <Lucide name="x" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Date */}
            <View style={styles.modalDateRow}>
              <Text style={styles.modalDateLabel}>Coverage Date</Text>

              <Text style={styles.modalDateValue}>{currentDate}</Text>
            </View>

            {/* Values */}
            <View style={styles.confirmationCard}>
              {vaccineFields.map((item, index) => (
                <View
                  key={item.field}
                  style={[
                    styles.confirmationRow,
                    index === vaccineFields.length - 1 &&
                      styles.lastConfirmationRow,
                  ]}
                >
                  <Text style={styles.confirmationLabel}>{item.label}</Text>

                  <Text style={styles.confirmationValue}>
                    {coverage[item.field] || '0'}
                  </Text>
                </View>
              ))}
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalCancelButton}
                onPress={handleCancelConfirmation}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalConfirmButton}
                onPress={handleConfirmSave}
              >
                <Lucide name="check" size={18} color={colors.textOnPrimary} />

                <Text style={styles.modalConfirmText}>Confirm & Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },

  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: spacing.lg,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.cardRadius,
  },

  dateIcon: {
    width: 42,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primaryLight,

    borderRadius: 10,
  },

  dateContent: {
    marginLeft: spacing.md,
  },

  dateLabel: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  dateValue: {
    marginTop: spacing.xs,

    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  sectionSubtitle: {
    marginTop: spacing.xs,

    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  formCard: {
    marginTop: spacing.lg,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.cardRadius,

    overflow: 'hidden',
  },

  vaccineRow: {
    minHeight: 62,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.lg,

    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  focusedVaccineRow: {
    backgroundColor: colors.primaryLight,
  },

  lastVaccineRow: {
    borderBottomWidth: 0,
  },

  vaccineLabel: {
    flex: 1,

    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  input: {
    width: 100,
    height: 42,

    paddingHorizontal: spacing.md,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.inputRadius,

    textAlign: 'center',

    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

focusedInput: {
  backgroundColor: colors.background,
  borderColor: colors.textMuted,
  borderWidth: 1.5,

  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.08,
  shadowRadius: 3,

  elevation: 1,
},

  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,

    marginTop: spacing.xl,
  },

  cancelButton: {
    flex: 1,

    height: spacing.buttonHeight,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.buttonRadius,
  },

  cancelButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  saveButton: {
    flex: 1,

    height: spacing.buttonHeight,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: spacing.sm,

    backgroundColor: colors.primaryDark,

    borderRadius: spacing.buttonRadius,
  },

  saveButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textOnPrimary,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modalCard: {
    width: '100%',
    maxHeight: '90%',
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },

  modalHeaderContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  modalTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  modalSubtitle: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  modalDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.inputRadius,
  },

  modalDateLabel: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  modalDateValue: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  confirmationCard: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    overflow: 'hidden',
  },

  confirmationRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  lastConfirmationRow: {
    borderBottomWidth: 0,
  },

  confirmationLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  confirmationValue: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },

  modalButtonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },

  modalCancelButton: {
    flex: 1,
    height: spacing.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.buttonRadius,
  },

  modalCancelText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  modalConfirmButton: {
    flex: 1,
    height: spacing.buttonHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryDark,
    borderRadius: spacing.buttonRadius,
  },

  modalConfirmText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textOnPrimary,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
});

export default DailyCoverageScreen;
