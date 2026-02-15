import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@components/hello-wave';
import ParallaxScrollView from '@components/parallax-scroll-view';
import { ThemedText } from '@components/themed-text';
import { ThemedView } from '@components/themed-view';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('Welcome!')}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('Step 1: Try it')}</ThemedText>
        <ThemedText>
          {t('Edit app/(tabs)/index.tsx to see changes.')} {t('Press')}{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          {t('to open developer tools.')}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">{t('Step 2: Explore')}</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title={t('Action')} icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title={t('Share')}
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title={t('More')} icon="ellipsis">
              <Link.MenuAction
                title={t('Delete')}
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {t("Tap the Explore tab to learn more about what's included in this starter app.")}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('Step 3: Get a fresh start')}</ThemedText>
        <ThemedText>
          {t("When you're ready, run ")}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> {t('to get a fresh')}{' '}
          <ThemedText type="defaultSemiBold">{t('app')}</ThemedText> {t('directory. This will move the current')}{' '}
          <ThemedText type="defaultSemiBold">{t('app')}</ThemedText> {t('to')}{' '}
          <ThemedText type="defaultSemiBold">{t('app-example')}</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
