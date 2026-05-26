import React from 'react';
import { createRoot } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  sessionStorage.clear();
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(<App />);
    expect(div).toBeDefined();
    root.unmount();
  });

  it('renders homepage content after authentication', async () => {
    sessionStorage.setItem('portfolio_auth', 'true');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await vi.waitFor(() => {
      expect(div.textContent).toContain('AI Fluent.');
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
  });
});
