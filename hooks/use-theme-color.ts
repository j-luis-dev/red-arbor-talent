import { usePreferencesStore } from '@/stores/preferences-store';
import { Colors } from '@constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = usePreferencesStore((s) => s.colorScheme);
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
  
}
