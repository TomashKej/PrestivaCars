/** 
 * Primary button component for the application. 
 * This component is a reusable button that can be used throughout the app. It supports two variants: primary and secondary, which determine the button's background color. The component also accepts custom styles for both the button and the text, allowing for flexibility in different contexts.
 * Props:
 * - title: The text to display on the button.
 * - onPress: A function to call when the button is pressed.
 * - variant: The style variant of the button, either 'primary' or 'secondary'. Defaults to 'primary'.
 * - style: Custom styles for the button container.
 * - textStyle: Custom styles for the button text.
*/
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle} from "react-native";
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from "../../theme/typography";

type ButtonVariant = 'primary' | 'secondary';

type PrimaryButtonProps = {
    title : string;
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
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                style,
            ]}>
            <Text
                style={[
                    styles.text,
                    isPrimary ? styles.primaryButton : styles.secondaryButton,
                    textStyle,
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 150,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
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
