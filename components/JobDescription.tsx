import { isSafeUrl } from '@/services/remotive';
import React, { useCallback } from 'react';
import { Linking, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

interface JobDescriptionProps {
  readonly html: string;
}

const IGNORED_DOM_TAGS = [
  'script',
  'iframe',
  'object',
  'embed',
  'form',
  'input',
  'button',
];

export function JobDescription({ html }: JobDescriptionProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const handleLinkPress = useCallback((_e: unknown, href: string) => {
    if (isSafeUrl(href)) Linking.openURL(href);
  }, []);

  const tagsStyles = {
    body: {
      color: theme.colors.onSurface,
      fontSize: 15,
      lineHeight: 22,
    },
    p: { marginVertical: 6 },
    a: { color: theme.colors.primary },
    li: { marginVertical: 2 },
  };

  const systemFonts = [theme.fonts.bodyMedium.fontFamily];

  return (
    <RenderHtml
      contentWidth={width - 32}
      source={{ html: html || '<p>No hay descripción.</p>' }}
      tagsStyles={tagsStyles}
      ignoredDomTags={IGNORED_DOM_TAGS}
      renderersProps={{ a: { onPress: handleLinkPress } }}
      baseStyle={{ color: theme.colors.onSurface }}
      systemFonts={systemFonts}
      enableExperimentalMarginCollapsing
    />
  );
}
