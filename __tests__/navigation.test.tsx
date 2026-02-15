import { JobCard } from '@components/job-card';
import type { Job } from '@/types/remotive';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

declare global {
  var __routerPushMock: jest.Mock;
  var __routerReplaceMock: jest.Mock;
}

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
  description: 'Description',
};

describe('Navigation', () => {
  beforeEach(() => {
    globalThis.__routerPushMock.mockClear();
    globalThis.__routerReplaceMock.mockClear();
  });

  describe('JobCard → Job detail', () => {
    it('navigates to job detail with correct id when card is pressed', () => {
      render(<JobCard job={mockJob} />);
      const card = screen.getByLabelText('Senior Developer @ Tech Co');
      fireEvent.press(card);
      expect(globalThis.__routerPushMock).toHaveBeenCalledTimes(1);
      expect(globalThis.__routerPushMock).toHaveBeenCalledWith({
        pathname: '/job/[id]',
        params: { id: '42' },
      });
    });

  });
});
