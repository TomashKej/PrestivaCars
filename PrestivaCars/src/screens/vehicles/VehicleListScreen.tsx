import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TextInput, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomTabBar from '../../components/common/BottomTabBar';
import PrimaryButton from '../../components/common/PrimaryButton';
import { getVehicles } from '../../api/vehiclesApi';
import { VehicleDto } from '../../types/vehicle';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import VehicleCard from '../../components/vehicles/VehicleCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Type definition for the props of the VehicleListScreen component, using the RootStackParamList to ensure type safety when navigating between screens.
type Props = NativeStackScreenProps<RootStackParamList, 'Vehicles'>;

const VehicleListScreen = ({navigation}: Props) => {
    const [vehicles, setVehicles] = useState<VehicleDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    /**
     * Loads the list of vehicles from the API and updates the state accordingly.
     * Handles loading and error states to provide feedback to the user.
     */
    const loadVehicles = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';

            setError(`Unable to load vehicles. Details: ${errorMessage}`);
        } finally { setIsLoading(false); }
    };


    useFocusEffect(
        useCallback(() => { loadVehicles(); }, []),
    );

    const filteredVehicles = vehicles.filter(vehicle => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) { return true; }

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

    const renderVehicle = ({item}: {item: VehicleDto}) => {
    return (
        <VehicleCard
            vehicle={item}
            variant="public"
            onPress={vehicle => {
                navigation.navigate('VehicleDetails', { vehicleId: vehicle.id });
            }}
        />
    );
};

    // Renders the main content of the screen based on the current state (loading, error, or data).
    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.stateContainer}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.stateText}>Loading vehicles...</Text>
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
                data={filteredVehicles}
                keyExtractor={item => item.id.toString()}
                renderItem={renderVehicle}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>No vehicles found</Text>
                        <Text style={styles.emptyText}>Try changing your search criteria.</Text>
                    </View>
                }
            />
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Vehicle Catalogue</Text>
                <Text style={styles.subtitle}>Browse available vehicles from Prestiva Cars</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search by brand, model, fuel type..."
                        placeholderTextColor={colors.textSecondary}
                        style={styles.searchInput}
                    />
                </View>

                <View style={styles.quickFilters}>
                    <View style={styles.filterChip}>
                        <Text style={styles.filterChipText}>SUV</Text>
                    </View>

                    <View style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Diesel</Text>
                    </View>

                    <View style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Automatic</Text>
                    </View>
                </View>
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
        paddingBottom: spacing.lg
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
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        shadowColor: colors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    searchInput: {
        height: 50,
        fontSize: typography.bodyM,
        color: colors.textPrimary,
    },

    quickFilters: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.md,
    },

    filterChip: {
        backgroundColor: colors.surface,
        borderRadius: 999,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
    },

    filterChipText: {
        fontSize: typography.bodyS,
        fontWeight: '700',
        color: colors.textPrimary,
    },
});

export default VehicleListScreen;