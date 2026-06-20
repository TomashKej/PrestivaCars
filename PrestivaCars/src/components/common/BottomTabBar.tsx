import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../navigation/types';
import {useAppTheme} from '../../theme/ThemeContext';
import type {ThemeColors} from '../../theme/colors';
import spacing from '../../theme/spacing';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type TabItem = {
  label: string;
  route: keyof RootStackParamList;
  icon: string;
};

const tabs: TabItem[] = [
  {
    label: 'Home',
    route: 'Home',
    icon: '⌂',
  },
  {
    label: 'Search',
    route: 'Vehicles',
    icon: '⌕',
  },
  {
    label: 'Sell',
    route: 'SellVehicle',
    icon: '£',
  },
  {
    label: 'Account',
    route: 'Account',
    icon: '○',
  },
];

const BottomTabBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const {colors} = useAppTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  const handleNavigate = (
    routeName: keyof RootStackParamList,
  ) => {
    navigation.navigate(routeName as never);
  };

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = route.name === tab.route;

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tabItem}
            activeOpacity={0.75}
            onPress={() => handleNavigate(tab.route)}>
            <Text
              style={[
                styles.iconPlaceholder,
                isActive && styles.activeItem,
              ]}>
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.label,
                isActive && styles.activeItem,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },

    iconPlaceholder: {
      fontSize: 18,
      color: colors.textSecondary,
    },

    label: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },

    activeItem: {
      color: colors.primary,
    },
  });

export default BottomTabBar;