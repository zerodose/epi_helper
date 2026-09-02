// import React, { useRef, useState } from 'react';
// import {
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Lucide } from '@react-native-vector-icons/lucide/static';

// import AuthHeader from '@/components/common/AuthHeader';
// import KeyboardScreen from '@/components/common/KeyboardScreen';

// import { colors, spacing, typography } from '@/theme';

// function IndentScreen({ navigation }) {
//   const [receivingType, setReceivingType] = useState('routine');

//   const [indent, setIndent] = useState({
//     bcg: {
//       dosesPerVial: '20',
//       vials: '',
//       doses: '',
//     },

//     hepB: {
//       dosesPerVial: '1',
//       vials: '',
//       doses: '',
//     },

//     penta: {
//       dosesPerVial: '',
//       vials: '',
//       doses: '',
//     },

//     pcv10: {
//       dosesPerVial: '',
//       vials: '',
//       doses: '',
//     },

//     rota: {
//       dosesPerVial: '1',
//       vials: '',
//       doses: '',
//     },

//     mr: {
//       dosesPerVial: '',
//       vials: '',
//       doses: '',
//     },

//     tcv: {
//       dosesPerVial: '5',
//       vials: '',
//       doses: '',
//     },

//     opv: {
//       dosesPerVial: '20',
//       vials: '',
//       doses: '',
//     },

//     ipv: {
//       dosesPerVial: '10',
//       vials: '',
//       doses: '',
//     },

//     td: {
//       dosesPerVial: '',
//       vials: '',
//       doses: '',
//     },

//     hpv: {
//       dosesPerVial: '1',
//       vials: '',
//       doses: '',
//     },
//     panadol: {
//       dosesPerVial: '1',
//       vials: '',
//       doses: '',
//     },
//   });

//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const inputRefs = useRef({});

//   const currentDate = new Date().toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });

//   const vaccineFields = [
//     {
//       label: 'BCG',
//       field: 'bcg',
//       fixed: true,
//     },
//     {
//       label: 'Hep-B',
//       field: 'hepB',
//       fixed: true,
//     },
//     {
//       label: 'Penta',
//       field: 'penta',
//       fixed: false,
//       allowedDosesPerVial: ['1', '5', '10'],
//     },
//     {
//       label: 'PCV-10',
//       field: 'pcv10',
//       fixed: false,
//       allowedDosesPerVial: ['2', '4'],
//     },
//     {
//       label: 'Rota',
//       field: 'rota',
//       fixed: true,
//     },
//     {
//       label: 'MR',
//       field: 'mr',
//       fixed: false,
//       allowedDosesPerVial: ['5', '10'],
//     },
//     {
//       label: 'TCV',
//       field: 'tcv',
//       fixed: true,
//     },
//     {
//       label: 'OPV',
//       field: 'opv',
//       fixed: true,
//     },
//     {
//       label: 'IPV',
//       field: 'ipv',
//       fixed: true,
//     },
//     {
//       label: 'TD',
//       field: 'td',
//       fixed: false,
//       allowedDosesPerVial: ['10', '20'],
//     },
//     {
//       label: 'HPV',
//       field: 'hpv',
//       fixed: true,
//     },
//     {
//       label: 'Panadol',
//       field: 'panadol',
//       fixed: true,
//     },
//   ];

//   /*
//    * Vaccines for which Routine / Campaign applies.
//    */
//   const routineCampaignVaccines = ['mr', 'tcv', 'opv', 'ipv', 'hpv'];

//   const isVaccineDisabled = field => {
//     return (
//       receivingType === 'campaign' && !routineCampaignVaccines.includes(field)
//     );
//   };

//   const handleDosesPerVialChange = (field, value) => {
//     const numericValue = value.replace(/\D/g, '');

//     setIndent(previous => {
//       const current = previous[field];

//       let updated = {
//         ...current,
//         dosesPerVial: numericValue,
//       };

//       /*
//        * If vials already exist, recalculate doses.
//        */
//       if (numericValue && current.vials) {
//         updated.doses = String(Number(numericValue) * Number(current.vials));
//       }

//       /*
//        * Otherwise, if doses already exist,
//        * calculate required vials.
//        */
//       if (numericValue && !current.vials && current.doses) {
//         updated.vials = String(
//           Math.ceil(Number(current.doses) / Number(numericValue)),
//         );
//       }

//       return {
//         ...previous,
//         [field]: updated,
//       };
//     });
//   };

//   const handleVialsChange = (field, value) => {
//     if (isVaccineDisabled(field)) {
//       return;
//     }

//     const numericValue = value.replace(/\D/g, '');

//     setIndent(previous => {
//       const current = previous[field];

//       let updated = {
//         ...current,
//         vials: numericValue,
//       };

//       if (numericValue && current.dosesPerVial) {
//         updated.doses = String(
//           Number(current.dosesPerVial) * Number(numericValue),
//         );
//       }

//       if (!numericValue) {
//         updated.doses = '';
//       }

//       return {
//         ...previous,
//         [field]: updated,
//       };
//     });
//   };

//   const handleDosesChange = (field, value) => {
//     if (isVaccineDisabled(field)) {
//       return;
//     }

//     const numericValue = value.replace(/\D/g, '');

//     setIndent(previous => {
//       const current = previous[field];

//       let updated = {
//         ...current,
//         doses: numericValue,
//       };

//       if (numericValue && current.dosesPerVial) {
//         updated.vials = String(
//           Math.ceil(Number(numericValue) / Number(current.dosesPerVial)),
//         );
//       }

//       if (!numericValue) {
//         updated.vials = '';
//       }

//       return {
//         ...previous,
//         [field]: updated,
//       };
//     });
//   };

//   const handleNext = (field, index, type) => {
//     /*
//      * First go from Doses/Vial → Vials → Doses
//      */
//     if (type === 'dosesPerVial') {
//       inputRefs.current[`${field}-vials`]?.focus();

//       return;
//     }

//     if (type === 'vials') {
//       inputRefs.current[`${field}-doses`]?.focus();

//       return;
//     }

//     /*
//      * After Doses, move to next vaccine's
//      * first editable input.
//      */
//     const nextVaccine = vaccineFields[index + 1];

//     if (!nextVaccine) {
//       return;
//     }

//     if (!nextVaccine.fixed) {
//       inputRefs.current[`${nextVaccine.field}-dosesPerVial`]?.focus();

//       return;
//     }

//     inputRefs.current[`${nextVaccine.field}-vials`]?.focus();
//   };

//   const handleSave = () => {
//     setConfirmationVisible(true);
//   };

//   const handleConfirmSave = () => {
//     const vaccineData = vaccineFields.map(item => {
//       const data = indent[item.field];

//       return {
//         vaccine: item.label,
//         dosesPerVial: Number(data.dosesPerVial || 0),
//         vials: Number(data.vials || 0),
//         doses: Number(data.doses || 0),

//         /*
//          * Only these five vaccines receive
//          * Routine / Campaign classification.
//          */
//         category: routineCampaignVaccines.includes(item.field)
//           ? receivingType
//           : null,
//       };
//     });

//     const dataToSave = {
//       indentDate: currentDate,

//       /*
//        * Overall selected receiving type.
//        */
//       receivingType,

//       vaccines: vaccineData,
//     };

//     console.log('Indent Saved:', JSON.stringify(dataToSave, null, 2));

//     setConfirmationVisible(false);

//     navigation.goBack();
//   };

//   const handleCancelConfirmation = () => {
//     setConfirmationVisible(false);
//   };

//   const handleCancel = () => {
//     navigation.goBack();
//   };

//   const handleReceivingTypeChange = type => {
//     setReceivingType(type);

//     if (type === 'campaign') {
//       setIndent(previous => {
//         const updated = { ...previous };

//         Object.keys(updated).forEach(field => {
//           if (!routineCampaignVaccines.includes(field)) {
//             updated[field] = {
//               ...updated[field],
//               vials: '0',
//               doses: '0',
//             };
//           }
//         });

//         return updated;
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <AuthHeader title="Add Indent" onBack={() => navigation.goBack()} />

//       <KeyboardScreen contentContainerStyle={styles.keyboardContent}>
//         <View style={styles.content}>
//           {/* Date */}
//           <View style={styles.dateCard}>
//             <View style={styles.dateIconContainer}>
//               <Lucide
//                 name="calendar-days"
//                 size={20}
//                 color={colors.primaryDark}
//               />
//             </View>

//             <View style={styles.dateTextContainer}>
//               <Text style={styles.dateLabel}>Indent Date</Text>

//               <Text style={styles.dateValue}>{currentDate}</Text>
//             </View>
//           </View>

//           {/* Vaccine Type */}
//           <View style={styles.typeSection}>
//             <Text style={styles.sectionTitle}>Vaccine Type</Text>

//             <View style={styles.typeOptions}>
//               {/* Routine */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.typeOption}
//                 onPress={() => handleReceivingTypeChange('routine')}
//               >
//                 <View
//                   style={[
//                     styles.radioOuter,
//                     receivingType === 'routine' && styles.radioOuterActive,
//                   ]}
//                 >
//                   {receivingType === 'routine' && (
//                     <View style={styles.radioInner} />
//                   )}
//                 </View>

//                 <Text
//                   style={[
//                     styles.typeText,
//                     receivingType === 'routine' && styles.typeTextActive,
//                   ]}
//                 >
//                   Routine
//                 </Text>
//               </TouchableOpacity>

//               {/* Campaign */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.typeOption}
//                 onPress={() => handleReceivingTypeChange('campaign')}
//               >
//                 <View
//                   style={[
//                     styles.radioOuter,
//                     receivingType === 'campaign' && styles.radioOuterActive,
//                   ]}
//                 >
//                   {receivingType === 'campaign' && (
//                     <View style={styles.radioInner} />
//                   )}
//                 </View>

//                 <Text
//                   style={[
//                     styles.typeText,
//                     receivingType === 'campaign' && styles.typeTextActive,
//                   ]}
//                 >
//                   Campaign
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Table */}
//           <View style={styles.tableCard}>
//             {/* Header */}
//             <View style={styles.tableHeader}>
//               <View style={styles.vaccineColumn}>
//                 <Text style={styles.headerText}>Vaccine</Text>
//               </View>

//               <View style={styles.numericColumn}>
//                 <Text style={[styles.headerText, styles.centerText]}>
//                   Doses/Vial
//                 </Text>
//               </View>

//               <View style={styles.numericColumn}>
//                 <Text style={[styles.headerText, styles.centerText]}>
//                   Vials
//                 </Text>
//               </View>

//               <View style={styles.numericColumn}>
//                 <Text style={[styles.headerText, styles.centerText]}>
//                   Doses
//                 </Text>
//               </View>
//             </View>

//             {/* Rows */}
//             {vaccineFields.map((item, index) => {
//               const vaccine = indent[item.field];
//               const disabled = isVaccineDisabled(item.field);
//               const isFocused = focusedField === item.field;

//               return (
//                 <View
//                   key={item.field}
//                   style={[
//                     styles.tableRow,
//                     isFocused && styles.tableRowFocused,
//                     disabled && styles.tableRowDisabled,
//                   ]}
//                 >
//                   {/* Vaccine */}
//                   <View style={styles.vaccineColumn}>
//                     <Text
//                       style={[
//                         styles.vaccineName,
//                         disabled && styles.disabledVaccineName,
//                       ]}
//                     >
//                       {item.label}
//                     </Text>
//                   </View>

//                   {/* Doses / Vial */}
//                   <View style={styles.numericColumn}>
//                     <TextInput
//                       ref={ref => {
//                         inputRefs.current[`${item.field}-dosesPerVial`] = ref;
//                       }}
//                       value={vaccine.dosesPerVial}
//                       onChangeText={value =>
//                         handleDosesPerVialChange(item.field, value)
//                       }
//                       editable={!item.fixed && !disabled}
//                       keyboardType="number-pad"
//                       returnKeyType="next"
//                       selectTextOnFocus
//                       onFocus={() => setFocusedField(item.field)}
//                       onBlur={() => setFocusedField(null)}
//                       onSubmitEditing={() =>
//                         handleNext(item.field, index, 'dosesPerVial')
//                       }
//                       style={[styles.input, item.fixed && styles.fixedInput]}
//                       placeholder="-"
//                       placeholderTextColor={colors.inputPlaceholder}
//                     />
//                   </View>

//                   {/* Vials */}
//                   <View style={styles.numericColumn}>
//                     <TextInput
//                       ref={ref => {
//                         inputRefs.current[`${item.field}-vials`] = ref;
//                       }}
//                       editable={!disabled}
//                       value={vaccine.vials}
//                       onChangeText={value =>
//                         handleVialsChange(item.field, value)
//                       }
//                       keyboardType="number-pad"
//                       returnKeyType="next"
//                       onFocus={() => setFocusedField(item.field)}
//                       onBlur={() => setFocusedField(null)}
//                       onSubmitEditing={() =>
//                         handleNext(item.field, index, 'vials')
//                       }
//                       style={[styles.input, disabled && styles.disabledInput]}
//                       placeholder="0"
//                       placeholderTextColor={colors.inputPlaceholder}
//                     />
//                   </View>

//                   {/* Doses */}
//                   <View style={styles.numericColumn}>
//                     <TextInput
//                       ref={ref => {
//                         inputRefs.current[`${item.field}-doses`] = ref;
//                       }}
//                       editable={!disabled}
//                       value={vaccine.doses}
//                       onChangeText={value =>
//                         handleDosesChange(item.field, value)
//                       }
//                       keyboardType="number-pad"
//                       returnKeyType="next"
//                       onFocus={() => setFocusedField(item.field)}
//                       onBlur={() => setFocusedField(null)}
//                       onSubmitEditing={() =>
//                         handleNext(item.field, index, 'doses')
//                       }
//                       style={[styles.input, disabled && styles.disabledInput]}
//                       placeholder="0"
//                       placeholderTextColor={colors.inputPlaceholder}
//                     />
//                   </View>
//                 </View>
//               );
//             })}
//           </View>

//           {/* Buttons */}
//           <View style={styles.bottomButtons}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={styles.cancelButton}
//               onPress={handleCancel}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={styles.saveButton}
//               onPress={handleSave}
//             >
//               <Lucide name="save" size={18} color={colors.textOnPrimary} />

//               <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardScreen>

//       {/* Confirmation Modal */}
//       <Modal
//         visible={confirmationVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={handleCancelConfirmation}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCard}>
//             {/* Modal Header */}
//             <View style={styles.modalHeader}>
//               <View>
//                 <Text style={styles.modalTitle}>Confirm Indent</Text>

//                 <Text style={styles.modalSubtitle}>
//                   Please review the details before saving.
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 style={styles.modalCloseButton}
//                 onPress={handleCancelConfirmation}
//               >
//                 <Lucide name="x" size={22} color={colors.textSecondary} />
//               </TouchableOpacity>
//             </View>

//             {/* Date + Type */}
//             <View style={styles.modalInfoCard}>
//               <View style={styles.modalInfoItem}>
//                 <Text style={styles.modalInfoLabel}>Date</Text>

//                 <Text style={styles.modalInfoValue}>{currentDate}</Text>
//               </View>

//               <View style={styles.modalInfoDivider} />

//               <View style={styles.modalInfoItem}>
//                 <Text style={styles.modalInfoLabel}>Vaccine Type</Text>

//                 <Text style={[styles.modalInfoValue, styles.modalTypeValue]}>
//                   {receivingType === 'routine' ? 'Routine' : 'Campaign'}
//                 </Text>
//               </View>
//             </View>

//             {/* Confirmation Table */}
//             <View style={styles.modalTable}>
//               <View style={styles.modalTableHeader}>
//                 <Text
//                   style={[styles.modalHeaderText, styles.modalVaccineColumn]}
//                 >
//                   Vaccine
//                 </Text>

//                 <Text style={[styles.modalHeaderText, styles.modalSmallColumn]}>
//                   D/V
//                 </Text>

//                 <Text style={[styles.modalHeaderText, styles.modalSmallColumn]}>
//                   Vials
//                 </Text>

//                 <Text style={[styles.modalHeaderText, styles.modalSmallColumn]}>
//                   Doses
//                 </Text>
//               </View>

//               {vaccineFields.map(item => {
//                 const vaccine = indent[item.field];

//                 return (
//                   <View key={item.field} style={styles.modalTableRow}>
//                     <Text
//                       style={[styles.modalCellText, styles.modalVaccineColumn]}
//                     >
//                       {item.label}
//                     </Text>

//                     <Text
//                       style={[styles.modalCellText, styles.modalSmallColumn]}
//                     >
//                       {vaccine.dosesPerVial || '-'}
//                     </Text>

//                     <Text
//                       style={[styles.modalCellText, styles.modalSmallColumn]}
//                     >
//                       {vaccine.vials || '0'}
//                     </Text>

//                     <Text
//                       style={[styles.modalCellText, styles.modalSmallColumn]}
//                     >
//                       {vaccine.doses || '0'}
//                     </Text>
//                   </View>
//                 );
//               })}
//             </View>

//             {/* Modal Buttons */}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.modalCancelButton}
//                 onPress={handleCancelConfirmation}
//               >
//                 <Text style={styles.modalCancelText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmSave}
//               >
//                 <Lucide name="check" size={18} color={colors.textOnPrimary} />

//                 <Text style={styles.modalConfirmText}>Confirm & Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.surface,
//   },

//   keyboardContent: {
//     justifyContent: 'flex-start',
//   },

//   content: {
//     width: '100%',
//     paddingHorizontal: spacing.screenHorizontal,
//     paddingTop: spacing.lg,
//   },

//   /* Date */

//   dateCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: spacing.cardRadius,
//     padding: spacing.lg,
//     marginBottom: spacing.xl,
//   },

//   dateIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.primaryLight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },

//   dateTextContainer: {
//     flex: 1,
//   },

//   dateLabel: {
//     fontSize: typography.size.sm,
//     fontWeight: typography.weight.medium,
//     color: colors.textSecondary,
//     marginBottom: 2,
//   },

//   dateValue: {
//     fontSize: typography.size.lg,
//     fontWeight: typography.weight.semibold,
//     color: colors.text,
//   },

//   /* Vaccine Type */

//   typeSection: {
//     marginBottom: spacing.lg,
//   },

//   sectionTitle: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.text,
//     marginBottom: spacing.md,
//   },

//   typeOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.xl,
//   },

//   typeOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   radioOuter: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     borderWidth: 2,
//     borderColor: colors.border,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.sm,
//   },

//   radioOuterActive: {
//     borderColor: colors.primaryDark,
//   },

//   radioInner: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: colors.primaryDark,
//   },

//   typeText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.medium,
//     color: colors.textSecondary,
//   },

//   typeTextActive: {
//     color: colors.primaryDark,
//     fontWeight: typography.weight.semibold,
//   },

//   /* Table */

//   tableCard: {
//     backgroundColor: colors.background,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: spacing.cardRadius,
//     overflow: 'hidden',
//   },

//   tableHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 44,
//     backgroundColor: colors.surface,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//     paddingHorizontal: spacing.sm,
//   },

//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 58,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//     paddingHorizontal: spacing.sm,
//   },

//   tableRowFocused: {
//     backgroundColor: colors.focusBackground,
//     borderLeftWidth: 3,
//     borderLeftColor: colors.focusBorder,
//   },

//   vaccineColumn: {
//     flex: 1,
//     justifyContent: 'center',
//   },

//   numericColumn: {
//     width: 60,
//     marginLeft: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   headerText: {
//     fontSize: typography.size.xs,
//     fontWeight: typography.weight.semibold,
//     color: colors.textSecondary,
//   },

//   centerText: {
//     textAlign: 'center',
//   },

//   vaccineName: {
//     fontSize: typography.size.sm,
//     fontWeight: typography.weight.semibold,
//     color: colors.text,
//   },

//   input: {
//     width: 60,
//     height: 40,
//     backgroundColor: colors.inputBackground,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: spacing.inputRadius,
//     paddingHorizontal: spacing.xs,
//     paddingVertical: 0,
//     textAlign: 'center',
//     fontSize: typography.size.sm,
//     fontWeight: typography.weight.medium,
//     color: colors.text,
//   },

//   fixedInput: {
//     backgroundColor: colors.surface,
//     color: colors.textSecondary,
//   },

//   /* Buttons */

//   bottomButtons: {
//     flexDirection: 'row',
//     gap: spacing.md,
//     marginTop: spacing.xl,
//   },

//   cancelButton: {
//     flex: 1,
//     height: spacing.buttonHeight,
//     borderRadius: spacing.buttonRadius,
//     borderWidth: 1,
//     borderColor: colors.border,
//     backgroundColor: colors.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   cancelButtonText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.textSecondary,
//   },

//   saveButton: {
//     flex: 1,
//     height: spacing.buttonHeight,
//     borderRadius: spacing.buttonRadius,
//     backgroundColor: colors.primaryDark,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: spacing.sm,
//   },

//   saveButtonText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.textOnPrimary,
//   },

//   /* Modal */

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.45)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: spacing.lg,
//   },

//   modalCard: {
//     width: '100%',
//     maxHeight: '90%',
//     backgroundColor: colors.background,
//     borderRadius: spacing.cardRadius,
//     overflow: 'hidden',
//   },

//   modalHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     padding: spacing.xl,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },

//   modalTitle: {
//     fontSize: typography.size.xl,
//     fontWeight: typography.weight.bold,
//     color: colors.text,
//   },

//   modalSubtitle: {
//     fontSize: typography.size.sm,
//     color: colors.textSecondary,
//     marginTop: spacing.xs,
//     paddingRight: spacing.lg,
//   },

//   modalCloseButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.surface,
//   },

//   modalInfoCard: {
//     flexDirection: 'row',
//     marginHorizontal: spacing.lg,
//     marginTop: spacing.lg,
//     padding: spacing.md,
//     backgroundColor: colors.primaryLight,
//     borderRadius: spacing.inputRadius,
//   },

//   modalInfoItem: {
//     flex: 1,
//   },

//   modalInfoDivider: {
//     width: 1,
//     backgroundColor: colors.border,
//     marginHorizontal: spacing.md,
//   },

//   modalInfoLabel: {
//     fontSize: typography.size.xs,
//     color: colors.textSecondary,
//     marginBottom: 2,
//   },

//   modalInfoValue: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.text,
//   },

//   modalTypeValue: {
//     color: colors.primaryDark,
//   },

//   modalTable: {
//     margin: spacing.lg,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: spacing.inputRadius,
//     overflow: 'hidden',
//   },

//   modalTableHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 38,
//     backgroundColor: colors.surface,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//     paddingHorizontal: spacing.sm,
//   },

//   modalTableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 38,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//     paddingHorizontal: spacing.sm,
//   },

//   modalHeaderText: {
//     fontSize: typography.size.xs,
//     fontWeight: typography.weight.semibold,
//     color: colors.textSecondary,
//     textAlign: 'center',
//   },

//   modalCellText: {
//     fontSize: typography.size.xs,
//     color: colors.text,
//     textAlign: 'center',
//   },

//   modalVaccineColumn: {
//     flex: 1.2,
//     textAlign: 'left',
//   },

//   modalSmallColumn: {
//     width: 52,
//   },

//   modalButtons: {
//     flexDirection: 'row',
//     gap: spacing.md,
//     padding: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.borderLight,
//   },

//   modalCancelButton: {
//     flex: 1,
//     height: spacing.buttonHeight,
//     borderRadius: spacing.buttonRadius,
//     borderWidth: 1,
//     borderColor: colors.border,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   modalCancelText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.textSecondary,
//   },

//   modalConfirmButton: {
//     flex: 1.3,
//     height: spacing.buttonHeight,
//     borderRadius: spacing.buttonRadius,
//     backgroundColor: colors.primaryDark,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: spacing.sm,
//   },

//   modalConfirmText: {
//     fontSize: typography.size.md,
//     fontWeight: typography.weight.semibold,
//     color: colors.textOnPrimary,
//   },

//   tableRowDisabled: {
//     backgroundColor: colors.disabledBackground,
//   },

//   disabledInput: {
//     backgroundColor: colors.disabledInputBackground,
//     color: colors.disabledText,
//     borderColor: colors.disabledBorder,
//   },
//   disabledVaccineName: {
//     color: colors.textMuted,
//   },
// });

// export default IndentScreen;
import React, { useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
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

function IndentScreen({ navigation }) {
  const [receivingType, setReceivingType] = useState('routine');

  const [indent, setIndent] = useState({
    bcg: {
      dosesPerVial: '20',
      vials: '',
      doses: '',
    },

    hepB: {
      dosesPerVial: '1',
      vials: '',
      doses: '',
    },

    penta: {
      dosesPerVial: '',
      vials: '',
      doses: '',
    },

    pcv10: {
      dosesPerVial: '',
      vials: '',
      doses: '',
    },

    rota: {
      dosesPerVial: '1',
      vials: '',
      doses: '',
    },

    mr: {
      dosesPerVial: '',
      vials: '',
      doses: '',
    },

    tcv: {
      dosesPerVial: '5',
      vials: '',
      doses: '',
    },

    opv: {
      dosesPerVial: '20',
      vials: '',
      doses: '',
    },

    ipv: {
      dosesPerVial: '10',
      vials: '',
      doses: '',
    },

    td: {
      dosesPerVial: '',
      vials: '',
      doses: '',
    },

    hpv: {
      dosesPerVial: '1',
      vials: '',
      doses: '',
    },

    panadol: {
      dosesPerVial: '1',
      vials: '',
      doses: '',
    },
  });

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const inputRefs = useRef({});

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const vaccineFields = [
    {
      label: 'BCG',
      field: 'bcg',
      fixed: true,
    },
    {
      label: 'Hep-B',
      field: 'hepB',
      fixed: true,
    },
    {
      label: 'Penta',
      field: 'penta',
      fixed: false,
      allowedDosesPerVial: ['1', '5', '10'],
    },
    {
      label: 'PCV-10',
      field: 'pcv10',
      fixed: false,
      allowedDosesPerVial: ['2', '4'],
    },
    {
      label: 'Rota',
      field: 'rota',
      fixed: true,
    },
    {
      label: 'MR',
      field: 'mr',
      fixed: false,
      allowedDosesPerVial: ['5', '10'],
    },
    {
      label: 'TCV',
      field: 'tcv',
      fixed: true,
    },
    {
      label: 'OPV',
      field: 'opv',
      fixed: true,
    },
    {
      label: 'IPV',
      field: 'ipv',
      fixed: true,
    },
    {
      label: 'TD',
      field: 'td',
      fixed: false,
      allowedDosesPerVial: ['10', '20'],
    },
    {
      label: 'HPV',
      field: 'hpv',
      fixed: true,
    },
    {
      label: 'Panadol',
      field: 'panadol',
      fixed: true,
    },
  ];

  /*
   * Vaccines for which Routine / Campaign applies.
   */
  const routineCampaignVaccines = ['mr', 'tcv', 'opv', 'ipv', 'hpv'];

  const isVaccineDisabled = field => {
    return (
      receivingType === 'campaign' && !routineCampaignVaccines.includes(field)
    );
  };

  const handleDosesPerVialChange = (field, value) => {
    const numericValue = value.replace(/\D/g, '');

    setIndent(previous => {
      const current = previous[field];

      let updated = {
        ...current,
        dosesPerVial: numericValue,
      };

      /*
       * If vials already exist, recalculate doses.
       */
      if (numericValue && current.vials) {
        updated.doses = String(Number(numericValue) * Number(current.vials));
      }

      /*
       * Otherwise, if doses already exist,
       * calculate required vials.
       */
      if (numericValue && !current.vials && current.doses) {
        updated.vials = String(
          Math.ceil(Number(current.doses) / Number(numericValue)),
        );
      }

      return {
        ...previous,
        [field]: updated,
      };
    });
  };

  const handleVialsChange = (field, value) => {
    if (isVaccineDisabled(field)) {
      return;
    }

    const numericValue = value.replace(/\D/g, '');

    setIndent(previous => {
      const current = previous[field];

      let updated = {
        ...current,
        vials: numericValue,
      };

      if (numericValue && current.dosesPerVial) {
        updated.doses = String(
          Number(current.dosesPerVial) * Number(numericValue),
        );
      }

      if (!numericValue) {
        updated.doses = '';
      }

      return {
        ...previous,
        [field]: updated,
      };
    });
  };

  const handleDosesChange = (field, value) => {
    if (isVaccineDisabled(field)) {
      return;
    }

    const numericValue = value.replace(/\D/g, '');

    setIndent(previous => {
      const current = previous[field];

      let updated = {
        ...current,
        doses: numericValue,
      };

      if (numericValue && current.dosesPerVial) {
        updated.vials = String(
          Math.ceil(Number(numericValue) / Number(current.dosesPerVial)),
        );
      }

      if (!numericValue) {
        updated.vials = '';
      }

      return {
        ...previous,
        [field]: updated,
      };
    });
  };

  const handleNext = (field, index, type) => {
    /*
     * First go from Doses/Vial → Vials → Doses
     */
    if (type === 'dosesPerVial') {
      inputRefs.current[`${field}-vials`]?.focus();

      return;
    }

    if (type === 'vials') {
      inputRefs.current[`${field}-doses`]?.focus();

      return;
    }

    /*
     * After Doses, move to next vaccine's
     * first editable input.
     */
    const nextVaccine = vaccineFields[index + 1];

    if (!nextVaccine) {
      return;
    }

    if (!nextVaccine.fixed) {
      inputRefs.current[`${nextVaccine.field}-dosesPerVial`]?.focus();

      return;
    }

    inputRefs.current[`${nextVaccine.field}-vials`]?.focus();
  };

  const handleSave = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmSave = () => {
    const vaccineData = vaccineFields.map(item => {
      const data = indent[item.field];

      return {
        vaccine: item.label,
        dosesPerVial: Number(data.dosesPerVial || 0),
        vials: Number(data.vials || 0),
        doses: Number(data.doses || 0),

        /*
         * Only these five vaccines receive
         * Routine / Campaign classification.
         */
        category: routineCampaignVaccines.includes(item.field)
          ? receivingType
          : null,
      };
    });

    const dataToSave = {
      indentDate: currentDate,

      /*
       * Overall selected receiving type.
       */
      receivingType,

      vaccines: vaccineData,
    };

    console.log('Indent Saved:', JSON.stringify(dataToSave, null, 2));

    setConfirmationVisible(false);

    navigation.goBack();
  };

  const handleCancelConfirmation = () => {
    setConfirmationVisible(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleReceivingTypeChange = type => {
    setReceivingType(type);

    if (type === 'campaign') {
      setIndent(previous => {
        const updated = { ...previous };

        Object.keys(updated).forEach(field => {
          if (!routineCampaignVaccines.includes(field)) {
            updated[field] = {
              ...updated[field],
              vials: '0',
              doses: '0',
            };
          }
        });

        return updated;
      });
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader title="Add Indent" onBack={() => navigation.goBack()} />

      <KeyboardScreen contentContainerStyle={styles.scrollContent}>
        {/* Indent Date */}
        <View style={styles.dateCard}>
          <View style={styles.dateIcon}>
            <Lucide name="calendar-days" size={20} color={colors.primaryDark} />
          </View>

          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>Indent Date</Text>

            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
        </View>

        {/* Vaccine Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccine Type</Text>

          <Text style={styles.sectionSubtitle}>
            Select whether this indent is for routine or campaign vaccines.
          </Text>

          <View style={styles.typeCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.typeOption}
              onPress={() => handleReceivingTypeChange('routine')}
            >
              <View
                style={[
                  styles.radioOuter,
                  receivingType === 'routine' && styles.radioOuterActive,
                ]}
              >
                {receivingType === 'routine' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text
                style={[
                  styles.typeText,
                  receivingType === 'routine' && styles.typeTextActive,
                ]}
              >
                Routine
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.typeOption}
              onPress={() => handleReceivingTypeChange('campaign')}
            >
              <View
                style={[
                  styles.radioOuter,
                  receivingType === 'campaign' && styles.radioOuterActive,
                ]}
              >
                {receivingType === 'campaign' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text
                style={[
                  styles.typeText,
                  receivingType === 'campaign' && styles.typeTextActive,
                ]}
              >
                Campaign
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vaccine Indent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccine Indent</Text>

          <Text style={styles.sectionSubtitle}>
            Enter the required vials or doses.
          </Text>

          <View style={styles.formCard}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.vaccineColumn}>
                <Text style={styles.headerText}>Vaccine</Text>
              </View>

              <View style={styles.numericColumn}>
                <Text style={styles.headerText}>Doses per vial</Text>
              </View>

              <View style={styles.numericColumn}>
                <Text style={styles.headerText}>Vials</Text>
              </View>

              <View style={styles.numericColumn}>
                <Text style={styles.headerText}>Doses</Text>
              </View>
            </View>

            {/* Vaccine Rows */}
            {vaccineFields.map((item, index) => {
              const vaccine = indent[item.field];
              const disabled = isVaccineDisabled(item.field);

              /*
               * Row is focused when any input
               * inside this vaccine row is focused.
               */
              const isFocused = focusedField?.startsWith(`${item.field}-`);

              return (
                <View
                  key={item.field}
                  style={[
                    styles.vaccineRow,
                    isFocused && styles.focusedVaccineRow,
                    disabled && styles.disabledVaccineRow,
                    index === vaccineFields.length - 1 && styles.lastVaccineRow,
                  ]}
                >
                  {/* Vaccine */}
                  <View style={styles.vaccineColumn}>
                    <Text
                      style={[
                        styles.vaccineLabel,
                        disabled && styles.disabledVaccineLabel,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {/* Doses / Vial */}
                  <View style={styles.numericColumn}>
                    <TextInput
                      ref={ref => {
                        inputRefs.current[`${item.field}-dosesPerVial`] = ref;
                      }}
                      value={vaccine.dosesPerVial}
                      onChangeText={value =>
                        handleDosesPerVialChange(item.field, value)
                      }
                      editable={!item.fixed && !disabled}
                      keyboardType="number-pad"
                      returnKeyType="next"
                      selectTextOnFocus
                      onFocus={() =>
                        setFocusedField(`${item.field}-dosesPerVial`)
                      }
                      onBlur={() => setFocusedField(null)}
                      onSubmitEditing={() =>
                        handleNext(item.field, index, 'dosesPerVial')
                      }
                      style={[
                        styles.input,
                        item.fixed && styles.fixedInput,
                        disabled && styles.disabledInput,
                        focusedField === `${item.field}-dosesPerVial` &&
                          styles.focusedInput,
                      ]}
                      placeholder="-"
                      placeholderTextColor={colors.inputPlaceholder}
                    />
                  </View>

                  {/* Vials */}
                  <View style={styles.numericColumn}>
                    <TextInput
                      ref={ref => {
                        inputRefs.current[`${item.field}-vials`] = ref;
                      }}
                      editable={!disabled}
                      value={vaccine.vials}
                      onChangeText={value =>
                        handleVialsChange(item.field, value)
                      }
                      keyboardType="number-pad"
                      returnKeyType="next"
                      onFocus={() => setFocusedField(`${item.field}-vials`)}
                      onBlur={() => setFocusedField(null)}
                      onSubmitEditing={() =>
                        handleNext(item.field, index, 'vials')
                      }
                      style={[
                        styles.input,
                        disabled && styles.disabledInput,
                        focusedField === `${item.field}-vials` &&
                          styles.focusedInput,
                      ]}
                      placeholder="0"
                      placeholderTextColor={colors.inputPlaceholder}
                    />
                  </View>

                  {/* Doses */}
                  <View style={styles.numericColumn}>
                    <TextInput
                      ref={ref => {
                        inputRefs.current[`${item.field}-doses`] = ref;
                      }}
                      editable={!disabled}
                      value={vaccine.doses}
                      onChangeText={value =>
                        handleDosesChange(item.field, value)
                      }
                      keyboardType="number-pad"
                      returnKeyType="next"
                      onFocus={() => setFocusedField(`${item.field}-doses`)}
                      onBlur={() => setFocusedField(null)}
                      onSubmitEditing={() =>
                        handleNext(item.field, index, 'doses')
                      }
                      style={[
                        styles.input,
                        disabled && styles.disabledInput,
                        focusedField === `${item.field}-doses` &&
                          styles.focusedInput,
                      ]}
                      placeholder="0"
                      placeholderTextColor={colors.inputPlaceholder}
                    />
                  </View>
                </View>
              );
            })}
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalScrollContent}
            >
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
                  <Text style={styles.modalTitle}>Confirm Indent</Text>

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

              {/* Date + Type */}
              <View style={styles.modalDateRow}>
                <View>
                  <Text style={styles.modalDateLabel}>Indent Date</Text>

                  <Text style={styles.modalDateValue}>{currentDate}</Text>
                </View>

                <View style={styles.modalTypeContainer}>
                  <Text style={styles.modalDateLabel}>Vaccine Type</Text>

                  <Text style={styles.modalTypeValue}>
                    {receivingType === 'routine' ? 'Routine' : 'Campaign'}
                  </Text>
                </View>
              </View>

              {/* Confirmation Table */}
              <View style={styles.confirmationCard}>
                {/* Header */}
                <View style={styles.confirmationHeader}>
                  <View style={styles.confirmationVaccineColumn}>
                    <Text style={styles.confirmationHeaderText}>Vaccine</Text>
                  </View>

                  <View style={styles.confirmationSmallColumn}>
                    <Text style={styles.confirmationHeaderText}>Doses per vial</Text>
                  </View>

                  <View style={styles.confirmationSmallColumn}>
                    <Text style={styles.confirmationHeaderText}>Vials</Text>
                  </View>

                  <View style={styles.confirmationSmallColumn}>
                    <Text style={styles.confirmationHeaderText}>Doses</Text>
                  </View>
                </View>

                {vaccineFields
                  .filter(item => Number(indent[item.field].doses || 0) > 0)
                  .map((item, index) => {
                    const vaccine = indent[item.field];

                    return (
                      <View
                        key={item.field}
                        style={[
                          styles.confirmationRow,
                          index === vaccineFields.length - 1 &&
                            styles.lastConfirmationRow,
                        ]}
                      >
                        <View style={styles.confirmationVaccineColumn}>
                          <Text style={styles.confirmationLabel}>
                            {item.label}
                          </Text>
                        </View>

                        <Text style={styles.confirmationSmallValue}>
                          {vaccine.dosesPerVial || '-'}
                        </Text>

                        <Text style={styles.confirmationSmallValue}>
                          {vaccine.vials || '0'}
                        </Text>

                        <Text style={styles.confirmationSmallValue}>
                          {vaccine.doses || '0'}
                        </Text>
                      </View>
                    );
                  })}
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
            </ScrollView>
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

  /* Date */

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

  /* Sections */

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

  /* Vaccine Type */

  typeCard: {
    marginTop: spacing.lg,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.lg,
    minHeight: 58,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.cardRadius,

    gap: spacing.xxl,
  },

  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioOuter: {
    width: 22,
    height: 22,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: colors.border,

    borderRadius: 11,

    marginRight: spacing.sm,
  },

  radioOuterActive: {
    borderColor: colors.primaryDark,
  },

  radioInner: {
    width: 10,
    height: 10,

    backgroundColor: colors.primaryDark,

    borderRadius: 5,
  },

  typeText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
  },

  typeTextActive: {
    color: colors.primaryDark,
    fontWeight: typography.weight.semibold,
  },

  /* Vaccine Form */

  formCard: {
    marginTop: spacing.lg,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.cardRadius,

    overflow: 'hidden',
  },

  tableHeader: {
    minHeight: 44,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.sm,

    backgroundColor: colors.surface,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  vaccineRow: {
    minHeight: 62,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.sm,

    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  focusedVaccineRow: {
    backgroundColor: colors.primaryLight,
  },

  disabledVaccineRow: {
    backgroundColor: colors.disabledBackground,
  },

  lastVaccineRow: {
    borderBottomWidth: 0,
  },

  vaccineColumn: {
    flex: 1,

    justifyContent: 'center',
  },

  numericColumn: {
    width: 60,

    marginLeft: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    width: '100%',

    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,

    textAlign: 'center',
  },

  vaccineLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  disabledVaccineLabel: {
    color: colors.textMuted,
  },

  input: {
    width: 60,
    height: 42,

    paddingHorizontal: spacing.xs,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.inputRadius,

    textAlign: 'center',

    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  fixedInput: {
    backgroundColor: colors.surface,
    color: colors.textSecondary,
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

  disabledInput: {
    backgroundColor: colors.disabledInputBackground,
    color: colors.disabledText,
    borderColor: colors.disabledBorder,
  },

  /* Buttons */

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

  /* Modal */

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

  modalCloseButton: {
    width: 36,
    height: 36,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 18,
  },

  modalDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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
    marginTop: spacing.xs,

    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  modalTypeContainer: {
    alignItems: 'flex-end',
  },

  modalTypeValue: {
    marginTop: spacing.xs,

    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },

  confirmationCard: {
    marginTop: spacing.md,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: spacing.inputRadius,

    overflow: 'hidden',
  },

  confirmationHeader: {
    minHeight: 40,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.sm,

    backgroundColor: colors.surface,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  confirmationRow: {
    minHeight: 42,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.sm,

    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  lastConfirmationRow: {
    borderBottomWidth: 0,
  },

  confirmationVaccineColumn: {
    flex: 1,

    justifyContent: 'center',
  },

  confirmationSmallColumn: {
    width: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmationHeaderText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  confirmationLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  confirmationSmallValue: {
    width: 52,

    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,

    textAlign: 'center',
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
});

export default IndentScreen;
