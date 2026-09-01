import { trackRouteLoad } from "./routeLoadingState";

const MIN_ROUTE_LOADING_MS = 650;

const wait = (duration) => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

export const lazyWithMinimum = (loadModule, prepareRoute = () => Promise.resolve()) => (
  trackRouteLoad(Promise.resolve()
    .then(() => {
      Promise.resolve(prepareRoute()).catch(() => {});

      return Promise.all([
        loadModule(),
        wait(MIN_ROUTE_LOADING_MS),
      ]);
    })
    .then(([module]) => module))
);
