import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { JobDescription } from './job-description';

describe('JobDescription', () => {
  it('renders HTML content', () => {
    render(<JobDescription html="<p>Hello world</p>" />);
    expect(screen.getByTestId('render-html')).toBeOnTheScreen();
  });

  it('uses fallback when html is empty', () => {
    render(<JobDescription html="" />);
    const el = screen.getByTestId('render-html');
    expect(el).toBeOnTheScreen();
    expect(el.props.children).toContain('No hay descripción');
  });
});
