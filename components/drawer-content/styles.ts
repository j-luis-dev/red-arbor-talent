import { StyleSheet } from 'react-native';

import { LOGO_SIZE } from './constants';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logoCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: LOGO_SIZE - 16,
    height: LOGO_SIZE - 16,
  },
  divider: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    gap: 12,
  },
  sectionLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  segmentedButtons: {
    width: 50,
  },
});
