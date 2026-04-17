/** 
 * LandingScreen Component
 * This component serves as the entry point for users when they open the PrestivaCars app. 
 * It features a welcoming hero section with the brand name and a placeholder for a car image, followed by a login form. 
 * Users can either log in with their credentials or continue as a guest. 
 * The design emphasizes a premium and user-friendly experience, aligning with the brand's identity as a premium auto marketplace.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';
import PrimaryButton from '../components/common/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = ({navigation}: Props) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.brandTitle}>PrestivaCars</Text>
          <Text style={styles.brandSubtitle}>Premium Auto Marketplace</Text>

          <View style={styles.carPlaceholder}>
            <Text style={styles.carPlaceholderText}>CAR IMAGE</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            style={styles.input}
          />

          <PrimaryButton
            title="Login"
            onPress={() => navigation.navigate('Home')}
            style={styles.loginButton}
          />

          <Text style={styles.accountText}>
            Don&apos;t have an account?{' '}
            <Text style={styles.createAccountText}>Create an account here!</Text>
          </Text>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.guestText}>Continue as a guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#EFE8DF',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
    justifyContent: 'space-between',
    backgroundColor: '#EFE8DF',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    fontStyle: 'italic',
    color: colors.black,
  },
  brandSubtitle: {
    marginTop: spacing.xs,
    fontSize: typography.titleS,
    fontWeight: '700',
    fontStyle: 'italic',
    color: colors.primary,
  },
  carPlaceholder: {
    width: '100%',
    height: 220,
    marginTop: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carPlaceholderText: {
    color: colors.textSecondary,
    fontSize: typography.bodyL,
    fontWeight: '600',
  },
  formSection: {
    marginBottom: spacing.xxl,
  },
  input: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    fontSize: typography.bodyL,
    color: colors.textPrimary,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    width: '100%',
    marginTop: spacing.sm,
  },
  accountText: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: typography.bodyM,
    fontWeight: '600',
  },
  createAccountText: {
    color: colors.primary,
    fontWeight: '800',
  },
  orText: {
    marginTop: 44,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: colors.black,
  },
  guestText: {
    marginTop: spacing.xxl,
    textAlign: 'center',
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default LandingScreen;