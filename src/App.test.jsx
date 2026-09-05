import assert from 'node:assert/strict';
import test, { beforeEach, describe } from 'node:test';
import { JSDOM } from 'jsdom';
import React from 'react';
import { createRoot } from 'react-dom/client';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
});

[
  'Element',
  'HTMLElement',
  'SVGElement',
  'Node',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'CustomEvent',
].forEach((key) => {
  globalThis[key] = dom.window[key];
});

globalThis.sessionStorage = dom.window.sessionStorage;
globalThis.screen = dom.window.screen;
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
const ResizeObserverShim = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.ResizeObserver = ResizeObserverShim;
window.ResizeObserver = ResizeObserverShim;
globalThis.Image = class {
  constructor() {
    this.complete = true;
  }

  set src(value) {
    this.currentSrc = value;
    setTimeout(() => this.onload?.(), 0);
  }

  get src() {
    return this.currentSrc;
  }
};

const [{ default: App }, { findRecommendation }] = await Promise.all([
  import('./App'),
  import('./components/PortfolioChat'),
]);

const mockFn = (implementation = () => undefined) => {
  const mock = (...args) => {
    mock.calls.push(args);
    return implementation(...args);
  };
  mock.calls = [];
  mock.mockImplementation = (nextImplementation) => {
    implementation = nextImplementation;
    return mock;
  };
  return mock;
};

const waitFor = async (callback, { timeout = 1000, interval = 20 } = {}) => {
  const startedAt = performance.now();
  let lastError;

  while (performance.now() - startedAt < timeout) {
    try {
      callback();
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  throw lastError;
};

beforeEach(() => {
  sessionStorage.clear();
  window.history.pushState({}, '', '/');
  window.matchMedia = mockFn((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: mockFn(),
    removeListener: mockFn(),
    addEventListener: mockFn(),
    removeEventListener: mockFn(),
    dispatchEvent: mockFn(),
  }));
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.ResizeObserver = globalThis.ResizeObserver;
});

describe('App', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(<App />);
    assert.ok(div);
    root.unmount();
  });

  test('renders homepage content after authentication', async () => {
    sessionStorage.setItem('portfolio_auth', 'true');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await waitFor(() => {
      assert.match(div.textContent, /Ambiguity to ProductAI-powered DesignFrontend/);
      assert.match(div.textContent, /Type in keywords/);
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
  });

  test('renders the all projects route', async () => {
    window.history.pushState({}, '', '/projects');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await waitFor(() => {
      assert.match(div.textContent, /All projects/);
      assert.match(div.textContent, /AI-powered knowledge platform/);
      assert.match(div.textContent, /Kiosk UX/);
      assert.match(div.textContent, /Enterprise platform/);
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
    window.history.pushState({}, '', '/');
  });

  test('migrates legacy hash routes to clean routes', async () => {
    window.history.pushState({}, '', '/#/voice');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    root.render(<App />);
    await waitFor(() => {
      assert.equal(window.location.pathname, '/voice');
      assert.equal(window.location.hash, '');
    }, { timeout: 5000 });

    root.unmount();
    div.remove();
    window.history.pushState({}, '', '/');
  });

  test('recommends one typo-tolerant project from keywords', () => {
    assert.equal(findRecommendation('desgin systm accessibility'), 'Design-system');
    assert.equal(findRecommendation('hardwre ipad visitor'), 'Kiosk');
    assert.equal(findRecommendation('enterprise tool intergration'), 'PlatformsIntegration');
    assert.equal(findRecommendation('community event oprations'), 'NYTango');
    assert.equal(findRecommendation('agentic RAG copilot knowledge workflow'), 'AIResearchGuide');
    assert.equal(findRecommendation('design engineering local discovery cms'), 'NYTango');
    assert.equal(findRecommendation('zzzz qqqq banana'), null);
    assert.equal(findRecommendation('poop'), null);
    assert.equal(findRecommendation('poop random nonsense'), null);
  });
});
