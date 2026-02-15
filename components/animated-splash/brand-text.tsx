import { useTheme } from 'react-native-paper';

import { BRAND_TEXT_SEGMENTS } from '@components/animated-splash/constants';
import { styles } from '@components/animated-splash/styles';
import { Text } from 'react-native';

export const BrandText = () => {
  const theme = useTheme();
  const segmentColor = (usePrimary: boolean) =>
    usePrimary ? theme.colors.primary : theme.colors.onBackground;

  return (
    <Text style={styles.brandText}>
      {BRAND_TEXT_SEGMENTS.map(({ text, usePrimary }) => (
        <Text
          key={text}
          style={[styles.brandSegment, { color: segmentColor(usePrimary) }]}>
          {text}
        </Text>
      ))}
    </Text>
  );
};