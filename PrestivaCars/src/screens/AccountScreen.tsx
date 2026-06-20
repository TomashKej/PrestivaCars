import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/types';
import BottomTabBar from '../components/common/BottomTabBar';
import PrimaryButton from '../components/common/PrimaryButton';
import {useAppTheme} from '../theme/ThemeContext';
import {ThemeColors} from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen = ({navigation}: Props) => {
  const {colors, isDarkMode, toggleTheme} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Text style={styles.title}>Account</Text>

        <Text style={styles.subtitle}>
          Manage your Prestiva Cars profile and application settings.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Dark mode</Text>

              <Text style={styles.settingDescription}>
                {isDarkMode
                  ? 'Dark theme is currently enabled.'
                  : 'Light theme is currently enabled.'}
              </Text>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.border}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My selling activity</Text>

          <Text style={styles.cardText}>
            View, edit and remove vehicles listed for sale.
          </Text>

          <PrimaryButton
            title="My Listings"
            onPress={() => navigation.navigate('MyVehicleListings')}
            style={styles.button}
          />
        </View>
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

    content: {
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xxxl,
      paddingBottom: 120,
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

    card: {
      marginTop: spacing.xl,
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: spacing.lg,
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

    cardTitle: {
      fontSize: typography.titleS,
      fontWeight: '900',
      color: colors.textPrimary,
    },

    cardText: {
      marginTop: spacing.sm,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
    },

    settingRow: {
      marginTop: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    settingTextContainer: {
      flex: 1,
      paddingRight: spacing.lg,
    },

    settingTitle: {
      fontSize: typography.bodyL,
      fontWeight: '700',
      color: colors.textPrimary,
    },

    settingDescription: {
      marginTop: spacing.xs,
      fontSize: typography.bodyM,
      color: colors.textSecondary,
    },

    button: {
      marginTop: spacing.lg,
    },
  });

export default AccountScreen;