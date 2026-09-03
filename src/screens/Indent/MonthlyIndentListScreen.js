// import React, { useCallback, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';

// import { getMonthlyIndents } from '@/api/monthlyIndentApi';
// import { colors, spacing, typography } from '@/theme';

// const MonthlyIndentListScreen = () => {
//   const [indents, setIndents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');

//   const fetchMonthlyIndents = useCallback(async () => {
//     try {
//       setError('');

//       const response = await getMonthlyIndents();

//       console.log('MONTHLY INDENTS RESPONSE:');
//       console.log(JSON.stringify(response, null, 2));

//       setIndents(response?.data || []);
//     } catch (error) {
//       console.log(
//         'GET MONTHLY INDENTS ERROR:',
//         error.response?.data || error.message,
//       );

//       setError(
//         error.response?.data?.message ||
//           error.message ||
//           'Failed to load monthly indents',
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   React.useEffect(() => {
//     fetchMonthlyIndents();
//   }, [fetchMonthlyIndents]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchMonthlyIndents();
//   };

//   const renderVaccine = ({ item }) => {
//     return (
//       <View style={styles.vaccineRow}>
//         <View style={styles.vaccineInfo}>
//           <Text style={styles.vaccineName}>{item.vaccine}</Text>

//           {item.category && (
//             <Text style={styles.category}>{item.category}</Text>
//           )}
//         </View>

//         <View style={styles.valueBox}>
//           <Text style={styles.valueLabel}>Vials</Text>
//           <Text style={styles.value}>{item.vials}</Text>
//         </View>

//         <View style={styles.valueBox}>
//           <Text style={styles.valueLabel}>Doses</Text>
//           <Text style={styles.value}>{item.doses}</Text>
//         </View>
//       </View>
//     );
//   };

//   const renderIndent = ({ item }) => {
//     const date = new Date(item.indentDate);

//     return (
//       <View style={styles.indentCard}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Monthly Indent</Text>

//             <Text style={styles.date}>{date.toLocaleDateString()}</Text>
//           </View>

//           <View style={styles.typeBadge}>
//             <Text style={styles.typeText}>{item.receivingType}</Text>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.tableHeader}>
//           <Text style={[styles.headerText, styles.vaccineColumn]}>Vaccine</Text>

//           <Text style={styles.headerText}>Vials</Text>

//           <Text style={styles.headerText}>Doses</Text>
//         </View>

//         <FlatList
//           data={item.vaccines || []}
//           keyExtractor={(vaccine, index) =>
//             `${item._id}-${vaccine.vaccine}-${index}`
//           }
//           renderItem={renderVaccine}
//           scrollEnabled={false}
//         />
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={colors.primary} />

//         <Text style={styles.loadingText}>Loading monthly indents...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={indents}
//         keyExtractor={item => item._id}
//         renderItem={renderIndent}
//         contentContainerStyle={styles.listContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             tintColor={colors.primary}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.center}>
//             <Text style={styles.emptyText}>No monthly indents found.</Text>
//           </View>
//         }
//         ListHeaderComponent={
//           <View style={styles.pageHeader}>
//             <Text style={styles.pageTitle}>Monthly Indents</Text>

//             <Text style={styles.pageSubtitle}>Received vaccine stock</Text>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   listContent: {
//     padding: spacing.md,
//     paddingBottom: spacing.xl,
//   },

//   pageHeader: {
//     marginBottom: spacing.md,
//   },

// pageTitle: {
//   fontSize: typography.size.xl,
//   fontWeight: typography.weight.bold,
//   color: colors.text,
// },

// pageSubtitle: {
//   marginTop: 4,
//   fontSize: typography.size.md,
//   color: colors.textSecondary,
// },

//   indentCard: {
//     marginBottom: spacing.md,
//     padding: spacing.md,
//     backgroundColor: colors.surface,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 12,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: colors.text,
//   },

//   date: {
//     marginTop: 4,
//     fontSize: 13,
//     color: colors.textSecondary,
//   },

//   typeBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//     backgroundColor: colors.primaryLight,
//   },

//   typeText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: colors.primary,
//     textTransform: 'capitalize',
//   },

//   divider: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: spacing.md,
//   },

//   tableHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: 8,
//   },

//   headerText: {
//     flex: 1,
//     fontSize: 12,
//     fontWeight: '700',
//     color: colors.textSecondary,
//     textAlign: 'center',
//   },

//   vaccineColumn: {
//     flex: 2,
//     textAlign: 'left',
//   },

//   vaccineRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },

//   vaccineInfo: {
//     flex: 2,
//   },

//   vaccineName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.text,
//   },

//   category: {
//     marginTop: 2,
//     fontSize: 11,
//     color: colors.textSecondary,
//     textTransform: 'capitalize',
//   },

//   valueBox: {
//     flex: 1,
//     alignItems: 'center',
//   },

//   valueLabel: {
//     display: 'none',
//   },

//   value: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.text,
//   },

//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: spacing.lg,
//   },

//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: colors.textSecondary,
//   },

//   emptyText: {
//     fontSize: 15,
//     color: colors.textSecondary,
//   },

//   errorText: {
//     marginTop: 10,
//     fontSize: 13,
//     color: 'red',
//   },
// });

// export default MonthlyIndentListScreen;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';

import { getMonthlyIndents } from '@/api/monthlyIndentApi';
import { colors, spacing, typography } from '@/theme';

const MONTHS = [
  { label: 'All Months', value: '' },
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const getYears = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 6 }, (_, index) => {
    const year = currentYear - index;

    return {
      label: String(year),
      value: String(year),
    };
  });
};

const YEARS = getYears();

const MonthlyIndentListScreen = ({ navigation }) => {
  const currentYear = String(new Date().getFullYear());

  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState('');

  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);

  const [expandedIndent, setExpandedIndent] = useState(null);

  const animations = useRef({}).current;

  const getAnimation = id => {
    if (!animations[id]) {
      animations[id] = new Animated.Value(0);
    }

    return animations[id];
  };

  const fetchMonthlyIndents = useCallback(
    async (year = selectedYear, month = selectedMonth) => {
      try {
        setError('');

        const params = {};

        if (year) {
          params.year = year;
        }

        if (month) {
          params.month = month;
        }

        const response = await getMonthlyIndents(params);

        console.log('MONTHLY INDENTS RESPONSE:');
        console.log(JSON.stringify(response, null, 2));

        const data = Array.isArray(response?.data) ? response.data : [];

        console.log('FILTER:', params);
        console.log('RESULT COUNT:', data.length);

        setIndents(data);
        setExpandedIndent(null);
      } catch (error) {
        console.log(
          'GET MONTHLY INDENTS ERROR:',
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            'Failed to load monthly indents',
        );

        setIndents([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedYear, selectedMonth],
  );

  useEffect(() => {
    fetchMonthlyIndents(currentYear, '');
  }, []);

  const handleGetReport = () => {
    console.log('GET REPORT:', {
      year: selectedYear,
      month: selectedMonth,
    });

    setLoading(true);
    fetchMonthlyIndents(selectedYear, selectedMonth);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMonthlyIndents(selectedYear, selectedMonth);
  };

  const handleToggleIndent = id => {
    const isExpanded = expandedIndent === id;

    if (!isExpanded) {
      setExpandedIndent(id);
    }

    const animation = getAnimation(id);

    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (isExpanded) {
        setExpandedIndent(null);
      }
    });
  };

  const renderVaccine = ({ item }) => {
    return (
      <View style={styles.vaccineRow}>
        <View style={styles.vaccineInfo}>
          <Text style={styles.vaccineName}>{item.vaccine}</Text>

          {item.category ? (
            <Text style={styles.category}>{item.category}</Text>
          ) : null}
        </View>

        <View style={styles.valueBox}>
          <Text style={styles.value}>{item.vials ?? 0}</Text>
        </View>

        <View style={styles.valueBox}>
          <Text style={styles.value}>{item.doses ?? 0}</Text>
        </View>
      </View>
    );
  };

  const renderIndent = ({ item }) => {
    const date = new Date(item.indentDate);
    const id = item._id;

    const animation = getAnimation(id);

    const rotate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-12, 0],
    });

    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const isExpanded = expandedIndent === id;

    return (
      <View style={styles.indentCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.reportHeader}
          onPress={() => handleToggleIndent(id)}
        >
          <View style={styles.reportHeaderLeft}>
            <Text style={styles.reportTitle}>Monthly Indent</Text>

            <Text style={styles.date}>{date.toLocaleDateString()}</Text>
          </View>

          <View style={styles.reportHeaderRight}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{item.receivingType}</Text>
            </View>

            <Animated.View
              style={[
                styles.chevronButton,
                {
                  transform: [{ rotate }],
                },
              ]}
            >
              <Lucide
                name="chevron-down"
                size={20}
                color={colors.textSecondary}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {isExpanded ? (
          <Animated.View
            style={[
              styles.reportContent,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.divider} />

            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.vaccineColumn]}>
                Vaccine
              </Text>

              <Text style={styles.headerText}>Vials</Text>

              <Text style={styles.headerText}>Doses</Text>
            </View>

            <FlatList
              data={item.vaccines || []}
              keyExtractor={(vaccine, index) =>
                `${item._id}-${vaccine.vaccine}-${index}`
              }
              renderItem={renderVaccine}
              scrollEnabled={false}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  };

  const selectedYearLabel =
    YEARS.find(item => item.value === selectedYear)?.label || selectedYear;

  const selectedMonthLabel =
    MONTHS.find(item => item.value === selectedMonth)?.label || 'All Months';

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={styles.loadingText}>Loading monthly indents...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Lucide name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.pageTitle}>Monthly Indents</Text>

          <Text style={styles.pageSubtitle}>Vaccine receiving reports</Text>
        </View>
      </View>

      <View style={styles.filterCard}>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Year</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dropdown}
              onPress={() => setYearModalVisible(true)}
            >
              <Text style={styles.dropdownText}>{selectedYearLabel}</Text>

              <Lucide
                name="chevron-down"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Month</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dropdown}
              onPress={() => setMonthModalVisible(true)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedMonth && styles.allMonthsText,
                ]}
              >
                {selectedMonthLabel}
              </Text>

              <Lucide
                name="chevron-down"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.getButton}
          onPress={handleGetReport}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Lucide name="search" size={18} color="#ffffff" />

              <Text style={styles.getButtonText}>Get Report</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorCard}>
          <Lucide name="circle-alert" size={20} color="#dc2626" />

          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={indents}
        keyExtractor={item => item._id}
        renderItem={renderIndent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          indents.length > 0 ? (
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                {selectedMonth
                  ? `${selectedMonthLabel} ${selectedYearLabel}`
                  : `${selectedYearLabel} Indents`}
              </Text>

              <Text style={styles.resultCount}>
                {indents.length} {indents.length === 1 ? 'report' : 'reports'}
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Lucide name="file-text" size={28} color={colors.primaryDark} />
            </View>

            <Text style={styles.emptyTitle}>No Indents Found</Text>

            <Text style={styles.emptyText}>
              No vaccine indent reports were found for the selected period.
            </Text>
          </View>
        }
      />

      <Modal
        visible={yearModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setYearModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setYearModalVisible(false)}
        >
          <Pressable
            style={styles.selectionModal}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Year</Text>

              <TouchableOpacity onPress={() => setYearModalVisible(false)}>
                <Lucide name="x" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {YEARS.map(year => (
              <TouchableOpacity
                key={year.value}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  selectedYear === year.value && styles.selectedOption,
                ]}
                onPress={() => {
                  setSelectedYear(year.value);
                  setYearModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedYear === year.value && styles.selectedOptionText,
                  ]}
                >
                  {year.label}
                </Text>

                {selectedYear === year.value ? (
                  <Lucide name="check" size={20} color={colors.primary} />
                ) : null}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={monthModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMonthModalVisible(false)}
        >
          <Pressable
            style={styles.selectionModal}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month</Text>

              <TouchableOpacity onPress={() => setMonthModalVisible(false)}>
                <Lucide name="x" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {MONTHS.map(month => (
              <TouchableOpacity
                key={month.value || 'all'}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  selectedMonth === month.value && styles.selectedOption,
                ]}
                onPress={() => {
                  setSelectedMonth(month.value);
                  setMonthModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedMonth === month.value && styles.selectedOptionText,
                  ]}
                >
                  {month.label}
                </Text>

                {selectedMonth === month.value ? (
                  <Lucide name="check" size={20} color={colors.primary} />
                ) : null}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },

  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },

  headerTextContainer: {
    flex: 1,
  },

  pageTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  pageSubtitle: {
    marginTop: 3,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  filterCard: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.cardRadius,
    elevation: 2,
  },

  filterRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  filterItem: {
    flex: 1,
  },

  filterLabel: {
    marginBottom: spacing.xs,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  dropdown: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },

  dropdownText: {
    flex: 1,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
  },

  allMonthsText: {
    color: colors.textSecondary,
  },

  getButton: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  getButtonText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: '#ffffff',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingHorizontal: 2,
  },

  resultTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  resultCount: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },

  indentCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.cardRadius,
    overflow: 'hidden',
    elevation: 2,
  },

  reportHeader: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  reportHeaderLeft: {
    flex: 1,
  },

  reportTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  date: {
    marginTop: 4,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  reportHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },

  typeText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
    textTransform: 'capitalize',
  },

  chevronButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
  },

  reportContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },

  divider: {
    height: 1,
    marginBottom: spacing.md,
    backgroundColor: colors.border,
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },

  headerText: {
    flex: 1,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  vaccineColumn: {
    flex: 2,
    textAlign: 'left',
  },

  vaccineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  vaccineInfo: {
    flex: 2,
  },

  vaccineName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  category: {
    marginTop: 2,
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },

  valueBox: {
    flex: 1,
    alignItems: 'center',
  },

  value: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 10,
  },

  errorText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.size.sm,
    color: '#dc2626',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: 30,
  },

  emptyTitle: {
    marginBottom: spacing.xs,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  emptyText: {
    fontSize: typography.size.sm,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  selectionModal: {
    maxHeight: '80%',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 16,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  modalTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text,
  },

  option: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderRadius: 10,
  },

  selectedOption: {
    backgroundColor: colors.primaryLight,
  },

  optionText: {
    fontSize: typography.size.md,
    color: colors.text,
  },

  selectedOptionText: {
    fontWeight: typography.weight.semibold,
    color: colors.primaryDark,
  },
});

export default MonthlyIndentListScreen;
