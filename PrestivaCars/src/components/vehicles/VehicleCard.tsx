import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { VehicleDto } from "../../types/vehicle";
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

// Define the variant type for the VehicleCard component, which can be either "public" or "owner". This will allow us to conditionally render different UI elements based on the variant.
type VehicleCardVariant =  "public" | "owner";

// VehicleCard component to display vehicle information in a card format
type Props = {
    vehicle: VehicleDto;
    variant?: VehicleCardVariant;
    onEdit?: (vehicle: VehicleDto) => void;
    onDelete?: (vehicle: VehicleDto) => void;
    onPress?: (vehicle: VehicleDto) => void;
};

// The VehicleCard component is a reusable UI component that displays information about a vehicle. 
// It supports two variants: "public" for general users and "owner" for vehicle owners, which includes additional actions like edit and delete. 
// The component also handles user interactions through the onPress, onEdit, and onDelete callbacks.
const VehicleCard = ({
    vehicle,                // The vehicle data to be displayed in the card
    variant = "public",     // Default variant is "public"
    onPress,                // Callback for when the card is pressed
    onEdit,                 // Callback for when the "Edit" button is pressed (only shown in "owner" variant)
    onDelete,               // Callback for when the "Delete" button is pressed (only shown in "owner" variant)
}: Props) => {
    const listedDate = new Date(vehicle.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <TouchableOpacity
            activeOpacity={0.88}
            style={styles.vehicleCard}
            onPress={() => onPress?.(vehicle)}
        >
            <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Prestiva Cars</Text>

                <View style={[ styles.statusPill, vehicle.isSold ? styles.soldPill : styles.availablePill ]}>
                    <Text style={styles.statusPillText}>{vehicle.isSold ? 'Sold' : 'Available'}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Text style={styles.price}>£{vehicle.price.toLocaleString()}</Text>

                <Text style={styles.vehicleName}>
                    {vehicle.brand} {vehicle.model}
                </Text>

                <Text style={styles.vehicleMeta}>
                    {vehicle.vehicleType} • {vehicle.year} •{' '}
                    {vehicle.mileage.toLocaleString()} miles
                </Text>

                <Text style={styles.vehicleMeta}>
                    {vehicle.transmission} • {vehicle.fuelType}
                </Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.listedDate}>Listed {listedDate}</Text>
                    <Text style={styles.category}>{vehicle.vehicleCategoryName}</Text>
                </View>
        
                {variant === 'owner' && (
                    <View style={styles.ownerActions}>
                        <TouchableOpacity
                            style={styles.secondaryActionButton}
                            onPress={() => onEdit?.(vehicle)}>
                            <Text style={styles.secondaryActionText}>Edit</Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity
                            style={styles.dangerActionButton}
                            onPress={() => onDelete?.(vehicle)}>
                            <Text style={styles.dangerActionText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
          </View>
        </TouchableOpacity>
    );
}; 

const styles = StyleSheet.create({
    vehicleCard: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        marginBottom: spacing.lg,
        overflow: 'hidden',
        shadowColor: colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 5,
    },
    
    imagePlaceholder: {
        height: 180,
        backgroundColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
 
    imagePlaceholderText: {
        fontSize: typography.bodyL,
        fontWeight: '800',
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
    
    cardBody: {
        padding: spacing.lg,
    },
   
    price: {
        fontSize: 24,
        fontWeight: '900',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
   
    vehicleName: {
        fontSize: typography.titleS,
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    
    vehicleMeta: {
        fontSize: typography.bodyM,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
   
    cardFooter: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
    },
   
    listedDate: {
        flex: 1,
        fontSize: typography.bodyS,
        color: colors.textSecondary,
        fontWeight: '600',
    },
   
    category: {
        fontSize: typography.bodyS,
        color: colors.textPrimary,
        fontWeight: '800',
    },
    
    ownerActions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    
    secondaryActionButton: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 14,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    
    secondaryActionText: {
        fontSize: typography.bodyS,
        fontWeight: '800',
        color: colors.textPrimary,
    },
    
    dangerActionButton: {
        flex: 1,
        backgroundColor: '#FEE2E2',
        borderRadius: 14,
        paddingVertical: spacing.sm,
        alignItems: 'center',
    },
    
    dangerActionText: {
        fontSize: typography.bodyS,
        fontWeight: '800',
        color: '#991B1B',
    },
});

export default VehicleCard;