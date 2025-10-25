import { StyleSheet, Dimensions } from 'react-native';
import { colors, shadows, spacing, borderRadius } from './theme';

const { width } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.overlayLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    ...shadows.medium,
    zIndex: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  burgerButton: {
    padding: 5,
  },
  burgerLine: {
    width: 25,
    height: 3,
    backgroundColor: colors.text,
    marginVertical: 2,
    borderRadius: 2,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});

export { width };
