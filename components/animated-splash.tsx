import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { BrandText } from '@components/animated-splash/brand-text';
import {
  ANIMATION_DURATION_MS,
  SPLASH_DURATION_MS
} from '@components/animated-splash/constants';
import { styles } from '@components/animated-splash/styles';
import { useSplashStore } from '@stores/splash-store';

export const AnimatedSplash = () => {
  const finishSplash = useSplashStore((s) => s.finishSplash);


  useEffect(() => {
    const timer = setTimeout(() => {
      finishSplash();
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [finishSplash]);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, styles.container]}
      pointerEvents="box-none"
      exiting={FadeOut.duration(400)}
    >
        <MotiView
          style={styles.content}
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'timing',
          duration: ANIMATION_DURATION_MS,
        }}
      >
        <Image
          source={require('@assets/images/splash-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <BrandText />
      </MotiView> 
    </Animated.View>
  );
};

