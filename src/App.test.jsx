import React from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(<App />);
    expect(div).toBeDefined();
    root.unmount();
  });
});
