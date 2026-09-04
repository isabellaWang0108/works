import React from 'react';
import { createRoot } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { findRecommendation } from './components/PortfolioChat';

beforeEach(() => {
  sessionStorage.clear();
  window.history.pushState({}, '', '/');
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
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
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
      expect(div.textContent).toContain('AmbiguityAI-powered Design to Frontend');
      expect(div.textContent).toContain('Type in keywords');
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
  });

  it('renders the all projects route', async () => {
    window.history.pushState({}, '', '/projects');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await vi.waitFor(() => {
      expect(div.textContent).toContain('All projects');
      expect(div.textContent).toContain('AI-powered knowledge platform');
      expect(div.textContent).toContain('Kiosk UX');
      expect(div.textContent).toContain('Enterprise platform');
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
    window.history.pushState({}, '', '/');
  });

  it('migrates legacy hash routes to clean routes', async () => {
    window.history.pushState({}, '', '/#/voice');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await vi.waitFor(() => {
      expect(window.location.pathname).toBe('/voice');
      expect(window.location.hash).toBe('');
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
    window.history.pushState({}, '', '/');
  });

  it('recommends one typo-tolerant project from keywords', () => {
    expect(findRecommendation('desgin systm accessibility')).toBe('Design-system');
    expect(findRecommendation('hardwre ipad visitor')).toBe('Kiosk');
    expect(findRecommendation('enterprise tool intergration')).toBe('PlatformsIntegration');
    expect(findRecommendation('community event oprations')).toBe('NYTango');
    expect(findRecommendation('agentic RAG copilot knowledge workflow')).toBe('AIResearchGuide');
    expect(findRecommendation('design engineering local discovery cms')).toBe('NYTango');
    expect(findRecommendation('zzzz qqqq banana')).toBeNull();
  });
});
