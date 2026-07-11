// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { vi } from 'vitest';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(), // deprecated
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(), // deprecated
  })),
  writable: true,
});

class ResizeObserverMock {
  observe() {
    // mock
  }
  unobserve() {
    // mock
  }
  disconnect() {
    // mock
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  value: ResizeObserverMock,
  writable: true,
});

vi.mock('JSON', () => ({
  parse: vi.fn(),
}));
