const MIN_ROUTE_LOADING_MS = 650;

const wait = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, duration);
});

export const lazyWithMinimum = (loadModule) => (
  Promise.all([
    loadModule(),
    wait(MIN_ROUTE_LOADING_MS),
  ]).then(([module]) => module)
);
