import { Image } from 'expo-image';
import { MotiView } from 'moti';
import React, { useEffect, useRef } from 'react';
import { Platform, Text, View } from 'react-native';

import { useSplashStore } from '@stores/splash-store';

import { ANIMATION_DURATION_MS, BRAND_TEXT_SEGMENTS, SPLASH_DURATION_MS } from '@components/animated-splash/constants';
import { styles } from '@components/animated-splash/styles';

function BrandText() {
  return (
    <Text style={styles.brandText}>
      {BRAND_TEXT_SEGMENTS.map(({ text, color }) => (
        <Text key={text} style={[styles.brandSegment, { color }]}>
          {text}
        </Text>
      ))}
    </Text>
  );
}

export const AnimatedSplash = () => {
  const finishSplash = useSplashStore((s) => s.finishSplash);
  const finishCalled = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finishCalled.current) return;
      finishCalled.current = true;
      finishSplash();
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [finishSplash]);

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'timing',
          duration: ANIMATION_DURATION_MS,
          delay: Platform.OS === 'android' ? 100 : 0,
        }}
      >
        <Image
          source={require('@assets/images/splash-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <BrandText />
      </MotiView>
      
    </View>
  );
}
