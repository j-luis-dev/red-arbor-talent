import { getInitials, hashColor } from '@/lib/avatar';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const SIZE = 48;

interface CompanyLogoProps {
  companyName: string;
  logoUrl?: string | null;
  size?: number;
}

export const CompanyLogo = ({
  companyName,
  logoUrl,
  size = SIZE,
}: CompanyLogoProps) => {
  const [failed, setFailed] = React.useState(false);
  const showFallback = !logoUrl || failed;

  if (showFallback) {
    const initials = getInitials(companyName);
    const bg = hashColor(companyName);
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
          },
        ]}
        accessibilityLabel={`Logo de ${companyName}`}
      >
        <Text
          variant="labelLarge"
          style={[styles.initials, { fontSize: size * 0.4 }]}
        >
          {initials}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: logoUrl }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
      onError={() => setFailed(true)}
      accessibilityLabel={`Logo de ${companyName}`}
    />
  );
};

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600' },
});
