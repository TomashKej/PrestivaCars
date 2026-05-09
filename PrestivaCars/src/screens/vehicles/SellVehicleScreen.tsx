import React, {useState, useEffect, useMemo} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import BottomTabBar from '../../components/common/BottomTabBar';
import PrimaryButton from '../../components/common/PrimaryButton';
import {createVehicle} from '../../api/vehiclesApi';
import {CreateVehicleRequest} from '../../types/vehicle';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import {getVehicleCategories} from '../../api/vehicleCategoryApi';
import {VehicleCategoryDto} from '../../types/vehicleCategory';

type Props = NativeStackScreenProps<RootStackParamList, 'SellVehicle'>;

const VEHICLE_TYPE_OPTIONS = ['SUV', 'Saloon', 'Hatchback', 'Estate', 'Coupe', 'Convertible', 'Van'];
const FUEL_TYPE_OPTIONS = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];   
const TRANSMISSION_OPTIONS = ['Manual', 'Automatic', 'Semi-automatic'];

const SellVehicleScreen = ({navigation}: Props) => {
    const [vehicleType, setVehicleType] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vinNumber, setVinNumber] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [vehicleCategoryId, setVehicleCategoryId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<VehicleCategoryDto[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    // Generate year options from current year down to 1950
    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years: string[] = [];

        for (let yearValue = currentYear; yearValue >= 1950; yearValue--) {
            years.push(yearValue.toString());
        }

      return years;
    }, []);

    // Fetch vehicle categories when the component mounts
    const handleGoBack = () => {
        navigation.navigate('Home');
    };

    const loadVehicleCategories = async () => {
        try {
            setIsLoadingCategories(true);
            
            const data = await getVehicleCategories();
            setCategories(data);
        } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error occurred.';
            
            Alert.alert('Error', `Unable to load vehicle categories. ${errorMessage}`);
        } finally {
            setIsLoadingCategories(false);
        }
    };

useEffect(() => {
  loadVehicleCategories();
}, []);
    
  // Fetch vehicle categories when the component mounts
  const validateForm = () => {
    if (
      !brand.trim() ||
      !model.trim() ||
      !vehicleType.trim() ||
      !year.trim() ||
      !price.trim() ||
      !fuelType.trim() ||
      !transmission.trim() ||
      !vehicleCategoryId.trim()
    ) {
      Alert.alert(
        'Validation error',
        'Brand, model, vehicle type, year, price, fuel type, transmission and category are required.',
      );
      return false;
    }

    if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Validation error', 'Price must be a valid number.');
      return false;
    }

    if (mileage.trim() && (Number.isNaN(Number(mileage)) || Number(mileage) < 0)) {
      Alert.alert('Validation error', 'Mileage must be a valid number.');
      return false;
    }

    return true;
};

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const request: CreateVehicleRequest = {
      vehicleType: vehicleType.trim(),
      brand: brand.trim(),
      model: model.trim(),
      year: Number(year),
      registrationNumber: registrationNumber.trim(),
      vinNumber: vinNumber.trim(),
      mileage: Number(mileage || 0),
      fuelType: fuelType.trim(),
      transmission: transmission.trim(),
      price: Number(price),
      description: description.trim(),
      isSold: false,
      vehicleCategoryId: Number(vehicleCategoryId || 1),
      isActive: true,
    };

    try {
      setIsSubmitting(true);

      await createVehicle(request);

      Alert.alert('Success', 'Vehicle listing has been created.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Vehicles'),
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred.';

      Alert.alert('Error', `Unable to create vehicle. ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <Text style={styles.title}>Sell your vehicle</Text>
        <Text style={styles.subtitle}>
          Create a new listing in the Prestiva Cars catalogue.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Vehicle information</Text>

          <FormInput
            label="Brand"
            value={brand}
            onChangeText={setBrand}
            placeholder="BMW"
          />

          <FormInput
            label="Model"
            value={model}
            onChangeText={setModel}
            placeholder="X5"
          />

          <FormSelect
            label="Vehicle type"
            value={vehicleType}
            placeholder="Select vehicle type"
            options={VEHICLE_TYPE_OPTIONS.map(option => ({
              label: option,
              value: option,
            }))}
            onSelect={setVehicleType}
          />

          <FormSelect
            label="Year"
            value={year}
            placeholder="Select year"
            options={yearOptions.map(option => ({
              label: option,
              value: option,
            }))}
            onSelect={setYear}
          />

          <FormInput
            label="Mileage"
            value={mileage}
            onChangeText={setMileage}
            placeholder="45000"
            keyboardType="numeric"
          />

          <FormSelect
            label="Fuel type"
            value={fuelType}
            placeholder="Select fuel type"
            options={FUEL_TYPE_OPTIONS.map(option => ({
              label: option,
              value: option,
            }))}
            onSelect={setFuelType}
          />

          <FormSelect
            label="Transmission"
            value={transmission}
            placeholder="Select transmission"
            options={TRANSMISSION_OPTIONS.map(option => ({
              label: option,
              value: option,
            }))}
            onSelect={setTransmission}
          />

          <Text style={styles.sectionTitle}>Listing details</Text>

          <FormInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            placeholder="34999.99"
            keyboardType="decimal-pad"
          />

          <FormInput
            label="Registration number"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            placeholder="AB12 CDE"
          />

          <FormInput
            label="VIN number"
            value={vinNumber}
            onChangeText={setVinNumber}
            placeholder="WBA12345678900001"
          />

          <FormSelect
            label="Vehicle category"
            value={vehicleCategoryId}
            placeholder={
              isLoadingCategories ? 'Loading categories...' : 'Select vehicle category'
            }
            options={categories.map(category => ({
              label: category.name,
              value: category.id.toString(),
            }))}
            onSelect={setVehicleCategoryId}
          />

          <FormInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the condition, equipment and history..."
            multiline
          />

          <PrimaryButton
            title={isSubmitting ? 'Creating...' : 'Create listing'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
};

type FormInputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
};

const FormInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
}: FormInputProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && styles.multilineInput]}
      />
    </View>
  );
};

type SelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
};

const FormSelect = ({
  label,
  value,
  placeholder,
  options,
  onSelect,
}: FormSelectProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={styles.selectButton}
        activeOpacity={0.8}
        onPress={() => setIsVisible(true)}>
        <Text
          style={[
            styles.selectButtonText,
            !selectedOption && styles.selectPlaceholder,
          ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Text style={styles.selectArrow}>⌄</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{label}</Text>

            <ScrollView>
              {options.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  activeOpacity={0.8}
                  onPress={() => {
                    onSelect(option.value);
                    setIsVisible(false);
                  }}>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingBottom: 120,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
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

  formCard: {
    marginTop: spacing.lg,
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

  sectionTitle: {
    fontSize: typography.titleS,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },

  inputGroup: {
    marginBottom: spacing.md,
  },

  inputLabel: {
    fontSize: typography.bodyS,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  input: {
    backgroundColor: colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.bodyM,
    color: colors.textPrimary,
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  submitButton: {
    marginTop: spacing.lg,
  },
  selectButton: {
  backgroundColor: colors.background,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

selectButtonText: {
  fontSize: typography.bodyM,
  color: colors.textPrimary,
},

selectPlaceholder: {
  color: colors.textSecondary,
},

selectArrow: {
  fontSize: typography.bodyL,
  fontWeight: '900',
  color: colors.textSecondary,
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  justifyContent: 'center',
  paddingHorizontal: spacing.xxl,
},

modalCard: {
  maxHeight: '70%',
  backgroundColor: colors.surface,
  borderRadius: 24,
  padding: spacing.lg,
},

modalTitle: {
  fontSize: typography.titleS,
  fontWeight: '900',
  color: colors.textPrimary,
  marginBottom: spacing.md,
},

optionRow: {
  paddingVertical: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},

optionText: {
  fontSize: typography.bodyM,
  fontWeight: '700',
  color: colors.textPrimary,
},
});

export default SellVehicleScreen;