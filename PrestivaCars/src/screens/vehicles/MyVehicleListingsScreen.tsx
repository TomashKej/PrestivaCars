import React, {useCallback, useState} from 'react';
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
import {deleteVehicle, getVehicles} from '../../api/vehiclesApi';
import {VehicleDto} from '../../types/vehicle';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'MyVehicleListings'>;

const MyVehicleListingsScreen = ({navigation}: Props) => {
  const [vehicles, setVehicles] = useState<VehicleDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred.';

      setError(`Unable to load listings. Details: ${errorMessage}`);
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

              Alert.alert('Success', 'Vehicle listing has been deleted.');
            } catch (error) {
              const errorMessage =
                error instanceof Error
                  ? error.message
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

  const renderVehicle = ({item}: {item: VehicleDto}) => {
    return (
      <VehicleCard
        vehicle={item}
        variant="owner"
        onPress={vehicle =>
          navigation.navigate('VehicleDetails', {
            vehicleId: vehicle.id,
          })
        }
        onEdit={vehicle => {
          navigation.navigate('EditVehicle', {
            vehicleId: vehicle.id,
          });
        }}
        onDelete={handleDelete}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.stateText}>Loading your listings...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
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
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderVehicle}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No listings yet</Text>
            <Text style={styles.emptyText}>
              Vehicles you list for sale will appear here.
            </Text>

            <PrimaryButton
              title="Sell vehicle"
              onPress={() => navigation.navigate('SellVehicle')}
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
        <Text style={styles.title}>My Listings</Text>

        <Text style={styles.subtitle}>
          Manage vehicles you are currently selling.
        </Text>
      </View>

      <View style={styles.content}>{renderContent()}</View>

      <BottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 120,
  },

  stateContainer: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
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