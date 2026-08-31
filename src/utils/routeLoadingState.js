let activeLoads = 0;
const listeners = new Set();

const notify = () => {
  queueMicrotask(() => {
    listeners.forEach((listener) => listener(activeLoads > 0));
  });
};

export const isRouteLoading = () => activeLoads > 0;

export const subscribeToRouteLoading = (listener) => {
  listeners.add(listener);
  listener(activeLoads > 0);

  return () => {
    listeners.delete(listener);
  };
};

export const trackRouteLoad = (promise) => {
  activeLoads += 1;
  notify();

  return promise.finally(() => {
    activeLoads = Math.max(0, activeLoads - 1);
    notify();
  });
};
