/** 
 * BottomTabBar component
 * This component represents the bottom tab bar of the application. 
 * It displays a set of tabs that users can navigate between. Each tab consists of an icon placeholder and a label. 
 * The component is styled to fit at the bottom of the screen and provides a consistent navigation experience across the app.
 * CURRENTLY USING PLACEHOLDER ICONS (O) FOR DEMONSTRATION PURPOSES. THESE SHOULD BE REPLACED WITH ACTUAL ICONS IN A PRODUCTION APP.
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const tabs = ['Home', 'Search', 'Sell','Saved' ,'Account'];

const BottomTabBar = () => {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <View key={tab} style={styles.tabItem}>
                    <Text style={styles.iconPlaceholder}>O</Text>
                    <Text style={styles.label}>{tab}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 78,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: spacing.sm,
    },

    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },

    iconPlaceholder: {
        fontSize: 18,
        color: colors.textPrimary,
    },

    label: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textPrimary,
    },
});

export default BottomTabBar;