import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FilterBar } from './filter-bar';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
);

describe('FilterBar', () => {
  it('renders without crashing when wrapped in SafeAreaProvider', () => {
    expect(() => render(<FilterBar />, { wrapper })).not.toThrow();
  });
});
