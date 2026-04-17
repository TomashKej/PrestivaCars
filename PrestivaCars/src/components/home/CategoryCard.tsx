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

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type CategoryCardProps = {
    title: string;  // The title of the category, e.g., "SUVs", "Sedans", etc.
    count: string;  // The count of items in the category, e.g., "120+"
};

const CategoryCard = ({title, count}: CategoryCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.iconPlaceholder} />
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.count}>{count}</Text>
                </View>
            </View>

            <View style={styles.previewRow}>
                <View style={styles.previewBox} />
                <View style={styles.previewBox} />
                <View style={styles.previewBox} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 24,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
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
    backgroundColor: '#D9D9D9',
    marginRight: spacing.lg,
  },
  title: {
    fontSize: typography.titleM,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  count: {
    marginTop: spacing.xs,
    fontSize: typography.bodyL,
    color: colors.textPrimary,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewBox: {
    width: 58,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#E7E7E7',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
});

export default CategoryCard;