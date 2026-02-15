import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ErrorState } from './error-state';

describe('ErrorState', () => {
  it('renders error title and retry button', () => {
    render(<ErrorState />);
    expect(screen.getAllByText('Something went wrong').length).toBeGreaterThan(0);
    expect(screen.getByText('Retry')).toBeOnTheScreen();
  });

  it('retry button has accessibility label', () => {
    render(<ErrorState />);
    expect(
      screen.getByLabelText('Retry load jobs label')
    ).toBeOnTheScreen();
  });
});
