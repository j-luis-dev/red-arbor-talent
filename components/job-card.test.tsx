import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { JobCard } from './job-card';
import type { Job } from '@/types/remotive';

const mockJob: Job = {
  id: 1,
  url: 'https://example.com/job/1',
  title: 'Software Engineer',
  company_name: 'Acme Inc',
  company_logo: null,
  category: 'Software',
  tags: [],
  job_type: 'full_time',
  publication_date: '2024-06-01T00:00:00.000Z',
  candidate_required_location: 'Worldwide',
  description: 'Build things',
};

describe('JobCard', () => {
  it('renders job title and company name', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Software Engineer')).toBeOnTheScreen();
    expect(screen.getByText('Acme Inc')).toBeOnTheScreen();
  });

  it('has accessibility label for the card', () => {
    render(<JobCard job={mockJob} />);
    expect(
      screen.getByLabelText('Software Engineer @ Acme Inc')
    ).toBeOnTheScreen();
  });

  it('renders favorite toggle with accessibility label', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByLabelText('Add to favorites')).toBeOnTheScreen();
  });
});
