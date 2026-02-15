// AsyncStorage mock (required for stores that use persist with AsyncStorage)
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mocks for component tests
jest.mock('react-native-paper', () => {
  const actual = jest.requireActual('react-native-paper');
  return {
    ...actual,
    useTheme: () => ({
      colors: {
        onSurface: '#000',
        onSurfaceVariant: '#666',
        primary: '#6200ee',
        error: '#b00020',
        surfaceVariant: '#e0e0e0',
      },
      fonts: {
        bodyMedium: { fontFamily: 'System' },
      },
    }),
  Provider: ({ children }) => children,
  PaperProvider: ({ children }) => children,
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
}));

// Shared router mocks so navigation tests can assert on push/replace
globalThis.__routerPushMock = jest.fn();
globalThis.__routerReplaceMock = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: globalThis.__routerPushMock,
    replace: globalThis.__routerReplaceMock,
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  usePathname: () => '/',
  Link: ({ children, href, ...props }) =>
    require('react').createElement('a', { href: String(href), ...props }, children),
  Href: {},
}));

jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  useReducedMotion: () => false,
}));

jest.mock('moti', () => ({
  MotiView: ({ children, style, ...props }) =>
    require('react').createElement(
      require('react-native').View,
      { style, ...props },
      children
    ),
}));

jest.mock('expo-image', () => ({
  Image: ({ children, style, ...props }) =>
    require('react').createElement(
      require('react-native').View,
      { style, testID: 'expo-image', ...props },
      children
    ),
}));

jest.mock('react-native-render-html', () => ({
  __esModule: true,
  default: ({ source }) =>
    require('react').createElement(
      require('react-native').Text,
      { testID: 'render-html' },
      source?.html ?? ''
    ),
}));

const mockJobsState = {
  error: null,
  clearError: jest.fn(),
  loadJobs: jest.fn(),
  searchQuery: '',
  setSearchQuery: jest.fn(),
  categories: [],
  selectedCategory: null,
  setSelectedCategory: jest.fn(),
  selectedJobType: null,
  setSelectedJobType: jest.fn(),
  sortBy: null,
  setSortBy: jest.fn(),
};
jest.mock('@stores/jobs-store', () => ({
  useJobsStore: (selector) => selector(mockJobsState),
  useFilteredJobs: () => [],
}));

jest.mock('@stores/favorites-store', () => ({
  useFavoritesStore: (selector) =>
    selector({
      isFavorite: () => false,
      toggleFavorite: jest.fn(),
    }),
}));
