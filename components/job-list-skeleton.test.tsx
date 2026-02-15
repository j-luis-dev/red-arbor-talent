import { render } from '@testing-library/react-native';
import React from 'react';
import { JobListSkeleton } from './job-list-skeleton';

describe('JobListSkeleton', () => {
  it('renders without crashing', () => {
    expect(() => render(<JobListSkeleton />)).not.toThrow();
  });
});
