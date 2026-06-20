/**
 *  CategoryCard Component
 *  This component represents a card for a specific car category (e.g., SUVs, Sedans) on the home screen.
 *  It displays the category title, the count of items in that category, and a preview of three cars.
 *  Props:
 *  - title: The name of the category (e.g., "SUVs").
 *  - count: The number of items in that category (e.g., "120+").
 *  The card is styled with a border, shadow, and rounded corners to match the app's design language.
 *  The preview section contains three placeholder boxes representing car images.
 */

import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppTheme} from '../../theme/ThemeContext';
import type {ThemeColors} from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type CategoryCardProps = {
  title: string;
  count: string;
};

const CategoryCard = ({
  title,
  count,
}: CategoryCardProps) => {
  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconPlaceholder} />

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.count}>
            {count}
          </Text>
        </View>
      </View>

      <View style={styles.previewRow}>
        <View style={styles.previewBox} />
        <View style={styles.previewBox} />
        <View style={styles.previewBox} />
      </View>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: 24,
      padding: spacing.xl,
      marginBottom: spacing.xl,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 3,
    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },

    iconPlaceholder: {
      width: 58,
      height: 58,
      borderRadius: 18,
      backgroundColor: colors.imagePlaceholder,
      marginRight: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },

    title: {
      fontSize: typography.titleM,
      fontWeight: '700',
      color: colors.textPrimary,
    },

    count: {
      marginTop: spacing.xs,
      fontSize: typography.bodyL,
      color: colors.textSecondary,
    },

    previewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    previewBox: {
      width: 58,
      height: 46,
      borderRadius: 8,
      backgroundColor: colors.disabledBackground,
      borderWidth: 1,
      borderColor: colors.disabledBorder,
    },
  });

export default CategoryCard;