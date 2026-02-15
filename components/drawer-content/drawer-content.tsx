import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import {
  Divider,
  SegmentedButtons,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';

import { BrandText } from '@components/animated-splash/brand-text';
import type { ColorScheme } from '@stores/preferences-store';
import { usePreferencesStore } from '@stores/preferences-store';

import { LOGO_SIZE } from './constants';
import { styles } from './styles';

export const CustomDrawerContent = (
  props: DrawerContentComponentProps
) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const setColorScheme = usePreferencesStore((s) => s.setColorScheme);
  const locale = usePreferencesStore((s) => s.locale);
  const setLocale = usePreferencesStore((s) => s.setLocale);

  const handleColorSchemeChange = (value: boolean) => {
    setColorScheme((value ? 'dark' : 'light') as ColorScheme);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.logoCircle,
            {
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: LOGO_SIZE / 2,
              overflow: 'hidden',
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <Image
            source={require('@assets/images/splash-icon.png')}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
        <BrandText />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.section}>
        <Text variant="labelSmall" style={styles.sectionLabel}>
          {t('Preferences').toUpperCase()}
        </Text>
        <View style={styles.row}>
          <Text variant="bodyLarge">{t('Dark mode')}</Text>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={handleColorSchemeChange}
          />
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge">{t('Language')}</Text>
          <SegmentedButtons
            density="small"
            value={locale}
            style={{ width: 150 }}
            onValueChange={(v) => setLocale(v === 'es' ? 'es' : 'en')}
            theme={{
              colors: {
                secondaryContainer: theme.colors.primaryContainer,
                onSecondaryContainer: theme.colors.onPrimaryContainer,
              },
            }}
            buttons={[
              { value: 'es', label: 'ES' },
              { value: 'en', label: 'EN' },
            ]}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
