import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  search: { marginBottom: 4 },
  chips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: { marginRight: 0 },
  anchorButton: { marginRight: 4 },
});
