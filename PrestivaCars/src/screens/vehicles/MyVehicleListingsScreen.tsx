import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../navigation/types';
import BottomTabBar from '../../components/common/BottomTabBar';
import PrimaryButton from '../../components/common/PrimaryButton';
import VehicleCard from '../../components/vehicles/VehicleCard';
import {
  deleteVehicle,
  getVehicles,
} from '../../api/vehiclesApi';
import {VehicleDto} from '../../types/vehicle';
import {useAppTheme} from '../../theme/ThemeContext';
import type {ThemeColors} from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'MyVehicleListings'
>;

const MyVehicleListingsScreen = ({
  navigation,
}: Props) => {
  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  const [vehicles, setVehicles] =
    useState<VehicleDto[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string | null>(null);

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
        `Unable to load listings. Details: ${errorMessage}`,
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

  const handleDelete = (vehicle: VehicleDto) => {
    Alert.alert(
      'Delete listing',
      `Are you sure you want to delete ${vehicle.brand} ${vehicle.model}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteVehicle(vehicle.id);
              await loadVehicles();

              Alert.alert(
                'Success',
                'Vehicle listing has been deleted.',
              );
            } catch (deleteError) {
              const errorMessage =
                deleteError instanceof Error
                  ? deleteError.message
                  : 'Unknown error occurred.';

              Alert.alert(
                'Error',
                `Unable to delete vehicle. ${errorMessage}`,
              );
            }
          },
        },
      ],
    );
  };

  const renderVehicle = ({
    item,
  }: {
    item: VehicleDto;
  }) => {
    return (
      <VehicleCard
        vehicle={item}
        variant="owner"
        onPress={vehicle =>
          navigation.navigate('VehicleDetails', {
            vehicleId: vehicle.id,
          })
        }
        onEdit={vehicle =>
          navigation.navigate('EditVehicle', {
            vehicleId: vehicle.id,
          })
        }
        onDelete={handleDelete}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.stateText}>
            Loading your listings...
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

          <Text style={styles.stateText}>
            {error}
          </Text>

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
        data={vehicles}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderVehicle}
        contentContainerStyle={
          styles.listContent
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No listings yet
            </Text>

            <Text style={styles.emptyText}>
              Vehicles you list for sale will
              appear here.
            </Text>

            <PrimaryButton
              title="Sell vehicle"
              onPress={() =>
                navigation.navigate(
                  'SellVehicle',
                )
              }
              style={styles.emptyButton}
            />
          </View>
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          My Listings
        </Text>

        <Text style={styles.subtitle}>
          Manage vehicles you are currently
          selling.
        </Text>
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>

      <BottomTabBar />
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
      backgroundColor: colors.background,
    },

    listContent: {
      paddingHorizontal: spacing.xxl,
      paddingBottom: 120,
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
      fontWeight: '900',
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
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      elevation: 4,
    },

    emptyTitle: {
      fontSize: typography.titleS,
      fontWeight: '900',
      color: colors.textPrimary,
    },

    emptyText: {
      marginTop: spacing.sm,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
      textAlign: 'center',
    },

    emptyButton: {
      marginTop: spacing.lg,
    },
  });

export default MyVehicleListingsScreen;