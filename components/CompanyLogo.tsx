import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const SIZE = 48;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
  const hue = Math.abs(h % 360);
  return `hsl(${hue}, 45%, 40%)`;
}

interface CompanyLogoProps {
  companyName: string;
  logoUrl?: string | null;
  size?: number;
}

export function CompanyLogo({ companyName, logoUrl, size = SIZE }: CompanyLogoProps) {
  const [failed, setFailed] = React.useState(false);
  const showFallback = !logoUrl || failed;

  if (showFallback) {
    const initials = getInitials(companyName);
    const bg = hashColor(companyName);
    return (
      <View
        style={[
          styles.fallback,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
        ]}
        accessibilityLabel={`Logo de ${companyName}`}
      >
        <Text variant="labelLarge" style={[styles.initials, { fontSize: size * 0.4 }]}>
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
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600' },
});
