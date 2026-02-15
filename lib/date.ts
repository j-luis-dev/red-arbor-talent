const DEFAULT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export function formatDate(
  iso: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    return new Date(iso).toLocaleDateString(
      undefined,
      options ?? DEFAULT_FORMAT_OPTIONS
    );
  } catch {
    return iso;
  }
}
