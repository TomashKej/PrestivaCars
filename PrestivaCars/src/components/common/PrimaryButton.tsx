/**
 * Reusable application button supporting primary and secondary variants.
 */

import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {useAppTheme} from '../../theme/ThemeContext';
import type {ThemeColors} from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type ButtonVariant = 'primary' | 'secondary';

type PrimaryButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const PrimaryButton = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}: PrimaryButtonProps) => {
  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary
          ? styles.primaryButton
          : styles.secondaryButton,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          isPrimary
            ? styles.primaryText
            : styles.secondaryText,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      minWidth: 150,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.18,
      shadowRadius: 6,
    },

    primaryButton: {
      backgroundColor: colors.primary,
    },

    secondaryButton: {
      backgroundColor: colors.secondary,
    },

    text: {
      fontSize: typography.titleS,
      fontWeight: '700',
    },

    primaryText: {
      color: colors.white,
    },

    secondaryText: {
      color: colors.white,
    },
  });

export default PrimaryButton;