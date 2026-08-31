import { trackRouteLoad } from "./routeLoadingState";

const MIN_ROUTE_LOADING_MS = 650;

const wait = (duration) => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

export const lazyWithMinimum = (loadModule, prepareRoute = () => Promise.resolve()) => (
  trackRouteLoad(Promise.all([
    loadModule(),
    Promise.resolve().then(prepareRoute),
    wait(MIN_ROUTE_LOADING_MS),
  ]).then(([module]) => module))
);
