import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText('No items')).toBeOnTheScreen();
  });

  it('renders the message when provided', () => {
    render(
      <EmptyState title="No favorites" message="Add some to see them here." />
    );
    expect(screen.getByText('No favorites')).toBeOnTheScreen();
    expect(screen.getByText('Add some to see them here.')).toBeOnTheScreen();
  });

  it('does not render message when not provided', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByText('Empty')).toBeOnTheScreen();
    expect(screen.queryByText(/./)).toBeTruthy();
  });
});
