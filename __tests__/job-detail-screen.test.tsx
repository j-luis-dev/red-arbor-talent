import React from 'react';
import { render, screen } from '@testing-library/react-native';
import type { Job } from '@/types/remotive';

const mockJob: Job = {
  id: 42,
  url: 'https://example.com/job/42',
  title: 'Senior Developer',
  company_name: 'Tech Co',
  company_logo: null,
  category: 'Software',
  tags: [],
  job_type: 'full_time',
  publication_date: '2024-06-01T00:00:00.000Z',
  candidate_required_location: 'Remote',
  description: '<p>Description</p>',
};

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useLocalSearchParams: () => ({ id: '42' }),
  useRouter: () => ({
    push: globalThis.__routerPushMock,
    replace: globalThis.__routerReplaceMock,
    back: jest.fn(),
  }),
}));

jest.mock('@stores/jobs-store', () => ({
  useJobsStore: (selector: (s: { jobs: Job[] }) => unknown) =>
    selector({ jobs: [mockJob] }),
  useFilteredJobs: () => [],
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 0 },
}));

// Import after mocks so the screen gets mocked params and store
// eslint-disable-next-line @typescript-eslint/no-require-imports
const JobDetailScreen = require('@/app/job/[id]').default;

describe('JobDetailScreen', () => {
  it('renders job title and company when job is found', () => {
    render(<JobDetailScreen />);
    expect(screen.getByText('Senior Developer')).toBeOnTheScreen();
    expect(screen.getByText('Tech Co')).toBeOnTheScreen();
  });

  it('renders Apply and Description section', () => {
    render(<JobDetailScreen />);
    expect(screen.getByText('Apply')).toBeOnTheScreen();
    expect(screen.getByText('Description')).toBeOnTheScreen();
  });
});
