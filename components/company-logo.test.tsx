import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CompanyLogo } from './company-logo';

describe('CompanyLogo', () => {
  it('renders initials when no logo URL', () => {
    render(<CompanyLogo companyName="Acme Inc" />);
    expect(screen.getByText('AI')).toBeOnTheScreen();
  });

  it('renders two-letter initials for single word', () => {
    render(<CompanyLogo companyName="Stripe" />);
    expect(screen.getByText('ST')).toBeOnTheScreen();
  });

  it('has accessibility label with company name', () => {
    render(<CompanyLogo companyName="Acme Inc" />);
    expect(screen.getByLabelText('Logo de Acme Inc')).toBeOnTheScreen();
  });

  it('renders image when logoUrl is provided', () => {
    render(
      <CompanyLogo companyName="Acme" logoUrl="https://example.com/logo.png" />
    );
    expect(screen.getByTestId('expo-image')).toBeOnTheScreen();
  });
});
