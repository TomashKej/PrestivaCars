/** HomeScreen
 * The HomeScreen component serves as the main landing page for the Prestiva Cars app. 
 * It features a hero section with a catchy headline and subtitle, two primary action buttons for browsing and selling vehicles, 
 * and a section showcasing different vehicle categories. The screen is designed to be visually appealing and user-friendly, 
 * encouraging users to explore the app's offerings. The BottomTabBar component is included for easy navigation to other sections of the app.
 */

import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import PrimaryButton from '../components/common/PrimaryButton';
import BottomTabBar from '../components/common/BottomTabBar';
import CategoryCard from '../components/home/CategoryCard';
import {RootStackParamList} from '../navigation/types';
import {useAppTheme} from '../theme/ThemeContext';
import type {ThemeColors} from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

const HomeScreen = ({navigation}: Props) => {
  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroLineOne}>
            Find Your
          </Text>

          <Text style={styles.heroLineTwo}>
            Dream Car
          </Text>

          <Text style={styles.heroSubtitle}>
            Buy or sell with confidence
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <PrimaryButton
            title="Browse All →"
            onPress={() =>
              navigation.navigate('Vehicles')
            }
            style={styles.actionButton}
          />

          <PrimaryButton
            title="Sell Vehicle"
            onPress={() =>
              navigation.navigate('SellVehicle')
            }
            variant="secondary"
            style={styles.actionButton}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Browse By Category
        </Text>

        <CategoryCard
          title="Cars"
          count="2137"
        />

        <CategoryCard
          title="Motorcycles"
          count="69"
        />

        <CategoryCard
          title="Vans & Trucks"
          count="67"
        />
      </ScrollView>

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

    container: {
      flex: 1,
    },

    content: {
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xxxl,
      paddingBottom: 120,
    },

    heroSection: {
      alignItems: 'center',
      marginTop: spacing.xxl,
    },

    heroLineOne: {
      fontSize: 30,
      fontWeight: '900',
      fontStyle: 'italic',
      color: colors.textPrimary,
    },

    heroLineTwo: {
      fontSize: 30,
      fontWeight: '900',
      fontStyle: 'italic',
      color: colors.primary,
      marginTop: -4,
    },

    heroSubtitle: {
      marginTop: spacing.sm,
      fontSize: typography.titleS,
      fontWeight: '600',
      color: colors.textSecondary,
    },

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.xxxl,
      gap: spacing.md,
      marginBottom: spacing.xxxl,
    },

    actionButton: {
      flex: 1,
      minWidth: 0,
    },

    sectionTitle: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '800',
      color: colors.textPrimary,
      marginBottom: spacing.xxl,
    },
  });

export default HomeScreen;