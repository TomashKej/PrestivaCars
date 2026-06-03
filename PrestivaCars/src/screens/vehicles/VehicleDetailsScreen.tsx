import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {getVehicleById} from '../../api/vehiclesApi';
import {VehicleDto} from '../../types/vehicle';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import BottomTabBar from '../../components/common/BottomTabBar';

// Type definition for the props of the VehicleDetailsScreen component, using the RootStackParamList to specify the expected parameters for this screen
type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetails'>;

// Type definition for the props of the DetailItem component, which is a reusable component for displaying a label and value pair in the vehicle details screen
type DetailItemProps = {
    label: string;
    value: string;
};

// Reusable component for displaying a label and value pair in the vehicle details screen
const DetailItem = ({label, value}: DetailItemProps) => {
    return (
        <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
};

// Main component for displaying the details of a specific vehicle, including loading state, error handling, and rendering the vehicle information
const VehicleDetailsScreen = ({route, navigation}: Props) => {
    const {vehicleId} = route.params;

    const [vehicle, setVehicle] = useState<VehicleDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to handle navigation back to the vehicle list screen
    const handleGoBack = () => {
        navigation.navigate('Vehicles');
    };

    const loadVehicle = async () => {
        try {
            setIsLoading(true);                                                                         // Start loading state
            setError(null);                                                                             // Clear any previous errors

            const data = await getVehicleById(vehicleId);                                               // Fetch vehicle details using the provided vehicleId
            setVehicle(data);                                                                           // Set the fetched vehicle data to state
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';  // Type guard to extract error message
            setError(`Unable to load vehicle details. Details: ${errorMessage}`);                       // Set a user-friendly error message with details
        } finally {
            setIsLoading(false);
        }
    };
    
    // Load vehicle details when the component mounts or when the vehicleId changes
    useEffect(() => {
        loadVehicle();
    }, [vehicleId]); 

    // Render loading state, error state, or vehicle details based on the current state
    if (isLoading) {
        return(
            <View style={styles.stateContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.stateText}>Loading vehicle details...</Text>
            </View>
        );
    }

    // Render error state if there was an error loading the vehicle details
    if (error) {
        return(
            <View style={styles.stateContainer}>
                <Text style={styles.errorTitle}>Something went wrong</Text>
                <Text style={styles.stateText}>{error}</Text>

                <TouchableOpacity style={styles.primaryButton} onPress={loadVehicle}>
                    <Text style={styles.primaryButtonText}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render vehicle details if the vehicle data was successfully loaded
    if (!vehicle) {
        return(
            <View style={styles.stateContainer}>
                <Text style={styles.errorTitle}>Vehicle not found</Text>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleGoBack}>
                    <Text style={styles.primaryButtonText}>Go back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.7}
                    onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>Prestiva Cars</Text>

                    <View
                        style={[
                            styles.statusPill,
                            vehicle.isSold ? styles.soldPill : styles.availablePill,
                        ]}>
                        <Text style={styles.statusPillText}>
                            {vehicle.isSold ? 'Sold' : 'Available'}
                        </Text>
                    </View>
                </View>
                  
                <View style={styles.contentCard}>
                    <Text style={styles.price}>£{vehicle.price.toLocaleString()}</Text>
                    
                    <Text style={styles.title}>
                        {vehicle.brand} {vehicle.model}
                    </Text>
                    
                    <Text style={styles.subtitle}>
                        {vehicle.vehicleType} • {vehicle.year} •{' '}
                        {vehicle.mileage.toLocaleString()} miles
                    </Text>
                    
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Overview</Text>

                        <View style={styles.detailsGrid}>
                            <DetailItem label="Brand" value={vehicle.brand} />
                            <DetailItem label="Model" value={vehicle.model} />
                            <DetailItem label="Year" value={vehicle.year.toString()} />
                            <DetailItem label="Category" value={vehicle.vehicleCategoryName} />
                            <DetailItem label="Fuel type" value={vehicle.fuelType} />
                            <DetailItem label="Transmission" value={vehicle.transmission} />
                            <DetailItem label="Mileage" value={`${vehicle.mileage.toLocaleString()} miles`} />
                            <DetailItem label="Registration" value={vehicle.registrationNumber}/>
                        </View>
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Features</Text>

                        {vehicle.vehicleFeatures.length > 0 ? (
                            <View style={styles.featuresContainer}>
                                {vehicle.vehicleFeatures.map(feature => (
                                    <View key={feature.id} style={styles.featureBadge}>
                                        <Text style={styles.featureBadgeText}>{feature.name}</Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.emptyFeaturesText}>No features assigned.</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Vehicle description</Text>
                        <Text style={styles.description}>{vehicle.description}</Text>
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical details</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>VIN number</Text>
                            <Text style={styles.infoValue}>{vehicle.vinNumber}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Listed</Text>
                            <Text style={styles.infoValue}>
                                {new Date(vehicle.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </Text>
                        </View>
                          
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Listing status</Text>
                            <Text style={styles.infoValue}>
                              {vehicle.isActive ? 'Active' : 'Inactive'}
                            </Text>
                        </View>
                    </View>
                        
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Contact seller</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <BottomTabBar/>
        </View>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  backButtonText: {
    fontSize: typography.bodyM,
    fontWeight: '800',
    color: colors.textPrimary,
  },

  imagePlaceholder: {
    height: 220,
    backgroundColor: '#D1D5DB',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: spacing.lg,
  },

  imagePlaceholderText: {
    fontSize: typography.bodyL,
    fontWeight: '900',
    color: '#6B7280',
    letterSpacing: 0.5,
  },

  statusPill: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },

  availablePill: {
    backgroundColor: '#DCFCE7',
  },

  soldPill: {
    backgroundColor: '#FEE2E2',
  },

  statusPillText: {
    fontSize: typography.bodyS,
    fontWeight: '800',
    color: colors.textPrimary,
  },

  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  price: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
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

  section: {
    marginTop: spacing.xl,
  },

  sectionTitle: {
    fontSize: typography.titleS,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  detailsGrid: {
    gap: spacing.sm,
  },

  featuresContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: spacing.sm,
},

featureBadge: {
  backgroundColor: colors.background,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
},

featureBadgeText: {
  fontSize: typography.bodyS,
  fontWeight: '800',
  color: colors.textPrimary,
},

emptyFeaturesText: {
  fontSize: typography.bodyM,
  color: colors.textSecondary,
},

  detailItem: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  detailLabel: {
    fontSize: typography.bodyS,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  detailValue: {
    fontSize: typography.bodyM,
    fontWeight: '800',
    color: colors.textPrimary,
  },

  description: {
    fontSize: typography.bodyM,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  infoRow: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  infoLabel: {
    fontSize: typography.bodyS,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  infoValue: {
    fontSize: typography.bodyM,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  contactButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },

  contactButtonText: {
    fontSize: typography.bodyM,
    fontWeight: '900',
    color: colors.surface,
  },

  stateContainer: {
    flex: 1,
    backgroundColor: colors.background,
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

  primaryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  primaryButtonText: {
    color: colors.surface,
    fontSize: typography.bodyM,
    fontWeight: '900',
  },
});

export default VehicleDetailsScreen;
