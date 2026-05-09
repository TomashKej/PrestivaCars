/** 
 * BottomTabBar component
 * This component represents the bottom tab bar of the application. 
 * It displays a set of tabs that users can navigate between. Each tab consists of an icon placeholder and a label. 
 * The component is styled to fit at the bottom of the screen and provides a consistent navigation experience across the app.
 * CURRENTLY USING PLACEHOLDER ICONS (O) FOR DEMONSTRATION PURPOSES. THESE SHOULD BE REPLACED WITH ACTUAL ICONS IN A PRODUCTION APP.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

// Define the type for navigation prop using the RootStackParamList
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// Define the structure of a tab item
type TabItem = {
    label: string;
    route: keyof RootStackParamList;
    icon: string; // Placeholder for icon name or component
};

// Define the tabs to be displayed in the bottom tab bar
const tabs: TabItem[] = [
    { label: 'Home', route: 'Home', icon: '⌂' },
    { label: 'Search', route: 'Vehicles', icon: '⌕' },
    { label: 'Sell', route: 'SellVehicle', icon: '£' },
    { label: 'Account', route: 'Account', icon: '○' }
];

// BottomTabBar component definition
const BottomTabBar = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleNavigate = (route: keyof RootStackParamList) => {
        navigation.navigate(route as never); // Cast to never to satisfy TypeScript, since route is a keyof RootStackParamList
    };

    return (
    <View style={styles.container}>
        {tabs.map(tab => (
            <TouchableOpacity
                key={tab.label}
                style={styles.tabItem}
                activeOpacity={0.75}
                onPress={() => handleNavigate(tab.route)}>
                <Text style={styles.iconPlaceholder}>{tab.icon}</Text>
                <Text style={styles.label}>{tab.label}</Text>
            </TouchableOpacity>
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