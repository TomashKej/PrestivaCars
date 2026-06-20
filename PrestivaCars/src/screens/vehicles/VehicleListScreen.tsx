import React, {useCallback, useMemo, useState, } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView,} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import BottomTabBar from '../../components/common/BottomTabBar';
import PrimaryButton from '../../components/common/PrimaryButton';
import VehicleCard from '../../components/vehicles/VehicleCard';
import {getVehicles} from '../../api/vehiclesApi';
import {VehicleDto} from '../../types/vehicle';
import {RootStackParamList} from '../../navigation/types';
import {useAppTheme} from '../../theme/ThemeContext';
import type {ThemeColors} from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Vehicles'
>;

type SortOption =
  | 'newest'
  | 'priceLowToHigh'
  | 'priceHighToLow'
  | 'lowestMileage'
  | 'newestYear';

type SortOptionItem = {
  label: string;
  value: SortOption;
};

const SORT_OPTIONS: SortOptionItem[] = [
  {
    label: 'Newest listings',
    value: 'newest',
  },
  {
    label: 'Price: low to high',
    value: 'priceLowToHigh',
  },
  {
    label: 'Price: high to low',
    value: 'priceHighToLow',
  },
  {
    label: 'Lowest mileage',
    value: 'lowestMileage',
  },
  {
    label: 'Newest production year',
    value: 'newestYear',
  },
];

const VehicleListScreen = ({navigation}: Props) => {
  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  const [vehicles, setVehicles] = useState<VehicleDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false);

  /**
   * Loads vehicles from the API.
   */
  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getVehicles();

      setVehicles(data);
    } catch (loadError) {
      const errorMessage =
        loadError instanceof Error
          ? loadError.message
          : 'Unknown error occurred.';

      setError(
        `Unable to load vehicles. Details: ${errorMessage}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, []),
  );

  const displayedVehicles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const filteredVehicles = vehicles.filter(vehicle => {
      if (!query) {
        return true;
      }

      return (
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.vehicleType.toLowerCase().includes(query) ||
        vehicle.fuelType.toLowerCase().includes(query) ||
        vehicle.transmission.toLowerCase().includes(query) ||
        vehicle.registrationNumber.toLowerCase().includes(query) ||
        vehicle.vehicleCategoryName.toLowerCase().includes(query)
      );
    });

  const sortedVehicles = [...filteredVehicles];

  switch (sortOption) {
    case 'priceLowToHigh':
      return sortedVehicles.sort(
        (firstVehicle, secondVehicle) =>
          firstVehicle.price - secondVehicle.price,
      );

    case 'priceHighToLow':
      return sortedVehicles.sort(
        (firstVehicle, secondVehicle) =>
          secondVehicle.price - firstVehicle.price,
      );

    case 'lowestMileage':
      return sortedVehicles.sort(
        (firstVehicle, secondVehicle) =>
          firstVehicle.mileage - secondVehicle.mileage,
      );

    case 'newestYear':
      return sortedVehicles.sort(
        (firstVehicle, secondVehicle) =>
          secondVehicle.year - firstVehicle.year,
      );

    case 'newest':
    default:
      return sortedVehicles.sort(
        (firstVehicle, secondVehicle) =>
          new Date(secondVehicle.createdAt).getTime() -
          new Date(firstVehicle.createdAt).getTime(),
      );
  }
}, [vehicles, searchQuery, sortOption]);

const selectedSortLabel = SORT_OPTIONS.find(option => option.value === sortOption,)?.label ?? 'Newest listings';
const handleSelectSortOption = (
  selectedOption: SortOption,
) => {
  setSortOption(selectedOption);
  setIsSortModalVisible(false);
};

  const renderVehicle = ({item}: {item: VehicleDto}) => (
    <VehicleCard
      vehicle={item}
      variant="public"
      onPress={vehicle => {
        navigation.navigate('VehicleDetails', {
          vehicleId: vehicle.id,
        });
      }}
    />
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.stateText}>
            Loading vehicles...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.errorTitle}>
            Something went wrong
          </Text>

          <Text style={styles.stateText}>{error}</Text>

          <PrimaryButton
            title="Try again"
            onPress={loadVehicles}
            style={styles.retryButton}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={displayedVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderVehicle}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No vehicles found
            </Text>

            <Text style={styles.emptyText}>
              Try changing your search criteria.
            </Text>
          </View>
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Vehicle Catalogue
        </Text>

        <Text style={styles.subtitle}>
          Browse available vehicles from Prestiva Cars
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by brand, model, fuel type..."
            placeholderTextColor={colors.placeholder}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sortHeader}>
          <Text style={styles.resultCount}>
            {displayedVehicles.length}{' '}
            {displayedVehicles.length === 1
              ? 'vehicle'
              : 'vehicles'}
          </Text>
            
          <TouchableOpacity
            style={styles.sortButton}
            activeOpacity={0.8}
            onPress={() => setIsSortModalVisible(true)}>
            <Text style={styles.sortIcon}>⇅</Text>
            
            <Text
              style={styles.sortButtonText}
              numberOfLines={1}>
              {selectedSortLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>

      <BottomTabBar />
      <Modal
        visible={isSortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setIsSortModalVisible(false)
        }>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Sort vehicles
              </Text>
      
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setIsSortModalVisible(false)
                }>
                <Text style={styles.closeButtonText}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
              
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {SORT_OPTIONS.map(option => {
                const isSelected =
                  option.value === sortOption;
              
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortOption,
                      isSelected &&
                        styles.sortOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleSelectSortOption(
                        option.value,
                      )
                    }>
                    <Text
                      style={[
                        styles.sortOptionText,
                        isSelected &&
                          styles.sortOptionTextSelected,
                      ]}>
                      {option.label}
                    </Text>
                    
                    {isSelected && (
                      <Text
                        style={
                          styles.selectedIndicator
                        }>
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xxxl,
      paddingBottom: spacing.lg,
    },

    title: {
      fontSize: typography.titleL,
      fontWeight: '900',
      color: colors.textPrimary,
    },

    subtitle: {
      marginTop: spacing.xs,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
    },

    content: {
      flex: 1,
    },

    listContent: {
      paddingHorizontal: spacing.xxl,
      paddingBottom: spacing.xxl,
    },

    stateContainer: {
      flex: 1,
      paddingHorizontal: spacing.xxl,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },

    stateText: {
      marginTop: spacing.sm,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
      textAlign: 'center',
    },

    errorTitle: {
      fontSize: typography.titleS,
      fontWeight: '800',
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },

    retryButton: {
      marginTop: spacing.lg,
    },

    emptyCard: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: spacing.xl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },

    emptyTitle: {
      fontSize: typography.titleS,
      fontWeight: '800',
      color: colors.textPrimary,
    },

    emptyText: {
      marginTop: spacing.sm,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
      textAlign: 'center',
    },

    searchContainer: {
      marginTop: spacing.lg,
      backgroundColor: colors.inputBackground,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      shadowColor: colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 2,
    },

    searchInput: {
      height: 50,
      fontSize: typography.bodyM,
      color: colors.textPrimary,
    },
    
    sortHeader: {
      marginTop: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },

    resultCount: {
      flex: 1,
      fontSize: typography.bodyS,
      fontWeight: '700',
      color: colors.textSecondary,
    },

    sortButton: {
      maxWidth: '70%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },

    sortIcon: {
      marginRight: spacing.xs,
      fontSize: typography.bodyL,
      fontWeight: '900',
      color: colors.primary,
    },

    sortButtonText: {
      flexShrink: 1,
      fontSize: typography.bodyS,
      fontWeight: '800',
      color: colors.textPrimary,
    },
        
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      paddingHorizontal: spacing.xxl,
    },
    modalCard: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      maxHeight: '70%',
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    modalTitle: {
      fontSize: typography.titleS,
      fontWeight: '900',
      color: colors.textPrimary,
    },
    closeButtonText: {
      fontSize: typography.bodyL,
      fontWeight: '900',
      color: colors.textSecondary,
    },
    sortOption: {
      minHeight: 52,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 14,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    sortOptionSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.surfaceSoft,
    },
    sortOptionText: {
      flex: 1,
      fontSize: typography.bodyM,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    sortOptionTextSelected: {
      color: colors.primary,
      fontWeight: '900',
    },
    selectedIndicator: {
      marginLeft: spacing.md,
      fontSize: typography.bodyL,
      fontWeight: '900',
      color: colors.primary,
    },
  });

export default VehicleListScreen;