import { usePreferencesStore } from './preferences-store';

function getState() {
  return usePreferencesStore.getState();
}

describe('preferences-store', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ colorScheme: 'light', locale: 'en' });
  });

  it('has default colorScheme and locale', () => {
    usePreferencesStore.setState({ colorScheme: 'light', locale: 'en' });
    expect(getState().colorScheme).toBe('light');
    expect(getState().locale).toBe('en');
  });

  it('setColorScheme updates colorScheme', () => {
    getState().setColorScheme('dark');
    expect(getState().colorScheme).toBe('dark');
    getState().setColorScheme('light');
    expect(getState().colorScheme).toBe('light');
  });

  it('setLocale updates locale', () => {
    getState().setLocale('es');
    expect(getState().locale).toBe('es');
    getState().setLocale('en');
    expect(getState().locale).toBe('en');
  });
});
