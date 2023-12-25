import React from 'react';
import { MantineProvider } from '@mantine/core';
import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import Header from './Header';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useParams() {
    return {
      lang: 'en',
    };
  },
}));

describe('Header', () => {
  test('should render Header component', async () => {
    render(
      <MantineProvider>
        <Header />
      </MantineProvider>,
    );

    expect(screen.getByText(/en/i)).toBeInTheDocument();
    expect(screen.getByText(/ru/i)).toBeInTheDocument();
    expect(screen.getByText(/de/i)).toBeInTheDocument();
  });
});
