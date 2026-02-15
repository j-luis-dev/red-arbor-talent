import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 104,
    height: 104,
  },
  brandText: {
    fontSize: 26,
    fontWeight: '700',
  },
  brandSegment: {
    fontWeight: '700',
  },
});
