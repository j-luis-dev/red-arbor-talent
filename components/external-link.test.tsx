import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ExternalLink } from './external-link';

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: { AUTOMATIC: 0 },
}));

describe('ExternalLink', () => {
  it('renders children and passes href to link', () => {
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Example
      </ExternalLink>
    );
    const link = screen.getByTestId('external-link');
    expect(link).toBeOnTheScreen();
    expect(link.props.href).toBe('https://example.com');
  });
});
