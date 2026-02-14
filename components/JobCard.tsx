import { CompanyLogo } from '@/components/CompanyLogo';
import type { Job } from '@/types/remotive';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { useReducedMotion } from 'react-native-reanimated';
import { type GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

interface JobCardProps {
  job: Job;
  index?: number;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isFavorite = useFavoritesStore((s) => s.isFavorite(job.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handlePress = () => {
    router.push({ pathname: '/job/[id]', params: { id: String(job.id) } });
  };

  const handleFavoritePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleFavorite(job.id);
  };

  const logoUrl = job.company_logo_url ?? job.company_logo ?? null;
  const animateState = { opacity: 1, translateY: 0 };
  const transition = reduceMotion ? { type: 'timing' as const, duration: 0 } : { type: 'timing' as const, duration: 300, delay: index * 50 };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={animateState}
      transition={transition}
    >
      <Card
        style={styles.card}
        onPress={handlePress}
        accessibilityLabel={`Empleo: ${job.title} en ${job.company_name}`}
        accessibilityHint="Doble toque para ver detalle"
        accessibilityRole="button"
      >
        <Card.Content style={styles.content}>
          <View style={styles.row}>
            <CompanyLogo
              companyName={job.company_name}
              logoUrl={logoUrl}
              size={48}
            />
            <View style={styles.main}>
              <Text variant="titleMedium" numberOfLines={2}>
                {job.title}
              </Text>
              <Text variant="bodyMedium" style={styles.company}>
                {job.company_name}
              </Text>
              <Text variant="bodySmall" style={styles.meta}>
                {job.candidate_required_location} · {formatDate(job.publication_date)}
              </Text>
            </View>
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              iconColor={isFavorite ? theme.colors.error : theme.colors.onSurfaceVariant}
              onPress={handleFavoritePress}
              accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              accessibilityHint="Doble toque para guardar o quitar de favoritos"
            />
          </View>
        </Card.Content>
      </Card>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  content: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  company: {
    opacity: 0.85,
    marginTop: 2,
  },
  meta: {
    opacity: 0.7,
    marginTop: 2,
  },
});
