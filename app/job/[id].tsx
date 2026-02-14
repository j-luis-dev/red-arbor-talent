import { CompanyLogo } from '@/components/CompanyLogo';
import { JobDescription } from '@/components/JobDescription';
import { useJobsStore } from '@/store/jobsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { isSafeUrl } from '@/services/remotive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React from 'react';
import { Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function JobDetailScreen() {
  const theme = useTheme();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { id } = useLocalSearchParams<{ id: string }>();
  const jobs = useJobsStore((s) => s.jobs);
  const job = React.useMemo(
    () => (id ? jobs.find((j) => String(j.id) === id) : null),
    [jobs, id]
  );
  const isFavorite = useFavoritesStore((s) => (job ? s.isFavorite(job.id) : false));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleFavorite = () => {
    if (job) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      toggleFavorite(job.id);
    }
  };

  const handleApply = () => {
    if (!job?.url) return;
    if (!isSafeUrl(job.url)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(job.url);
  };

  const handleShare = async () => {
    if (!job) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        title: job.title,
        message: `${job.title} - ${job.company_name}\n${job.url}`,
        url: job.url,
      });
    } catch {
      // user cancelled or share failed
    }
  };

  if (!id || !job) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text variant="titleMedium">Empleo no encontrado</Text>
        <Button mode="outlined" onPress={() => router.back()} style={{ marginTop: 16 }}>
          Volver
        </Button>
      </View>
    );
  }

  const logoUrl = job.company_logo_url ?? job.company_logo ?? null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduceMotion ? { type: 'timing', duration: 0 } : { type: 'timing', duration: 250 }}>
        <View style={styles.header}>
          <CompanyLogo companyName={job.company_name} logoUrl={logoUrl} size={64} />
          <View style={styles.headerText}>
            <Text variant="headlineSmall">{job.title}</Text>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>{job.company_name}</Text>
            <Text variant="bodyMedium" style={styles.meta}>
              {job.candidate_required_location} · {job.category} · {job.job_type.replace('_', ' ')}
            </Text>
            <Text variant="bodySmall" style={styles.meta}>{formatDate(job.publication_date)}</Text>
            {job.salary ? <Text variant="bodyMedium" style={styles.salary}>{job.salary}</Text> : null}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleApply}
            icon="open-in-new"
            accessibilityLabel="Aplicar al empleo"
            accessibilityHint="Abre el enlace de la oferta"
          >
            Aplicar
          </Button>
          <IconButton
            icon="share-variant"
            size={24}
            onPress={handleShare}
            accessibilityLabel="Compartir empleo"
            accessibilityHint="Abre el menú para compartir"
          />
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            iconColor={isFavorite ? theme.colors.error : undefined}
            onPress={handleFavorite}
            accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            accessibilityHint="Doble toque para guardar o quitar de favoritos"
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Descripción</Text>
          <JobDescription html={job.description} />
        </View>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  headerText: { flex: 1, minWidth: 0 },
  meta: { opacity: 0.8, marginTop: 4 },
  salary: { marginTop: 8 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 },
  section: { marginTop: 8 },
  sectionTitle: { marginBottom: 12 },
});
