import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading"
import { lazyWithMinimum } from "./utils/lazyWithMinimum";
import { preloadRouteCriticalAssets } from "./utils/preloadAssets";
import { isRouteLoading, subscribeToRouteLoading } from "./utils/routeLoadingState";


const Homepage = lazy(() => lazyWithMinimum(() => import("./views/homepage"), () => preloadRouteCriticalAssets("/")));
const Contact = lazy(() => lazyWithMinimum(() => import("./views/contact.js"), () => preloadRouteCriticalAssets("/contact")));
const ProductStudio = lazy(() => lazyWithMinimum(() => import("./views/projects/ProductStudio"), () => preloadRouteCriticalAssets("/product-studio")));
const DS = lazy(() => lazyWithMinimum(() => import("./views/projects/DS"), () => preloadRouteCriticalAssets("/design-system")));
const Voice = lazy(() => lazyWithMinimum(() => import("./views/projects/Voice"), () => preloadRouteCriticalAssets("/voice")));
const AIResearchGuide = lazy(() => lazyWithMinimum(() => import("./views/projects/AIResearchGuide"), () => preloadRouteCriticalAssets("/ai-research-guide")));
const PlatformsIntegration = lazy(() => lazyWithMinimum(() => import("./views/projects/PlatformsIntegration"), () => preloadRouteCriticalAssets("/platforms-integration")));
const Kiosk = lazy(() => lazyWithMinimum(() => import("./views/projects/Kiosk"), () => preloadRouteCriticalAssets("/kiosk")));

const LOADER_GRID_LOOP_MS = 2200;
const LOADER_GRID_EXIT_START_MS = LOADER_GRID_LOOP_MS * 0.46;
const LOADER_EXIT_FALLBACK_MS = 820;
const LOADER_EXIT_ALIGNMENT_EPSILON_MS = 24;

const getLoaderExitDelay = (startedAt) => {
  const elapsed = performance.now() - startedAt;
  const loopProgress = elapsed % LOADER_GRID_LOOP_MS;

  if (Math.abs(loopProgress - LOADER_GRID_EXIT_START_MS) <= LOADER_EXIT_ALIGNMENT_EPSILON_MS) {
    return 0;
  }

  return loopProgress < LOADER_GRID_EXIT_START_MS
    ? LOADER_GRID_EXIT_START_MS - loopProgress
    : LOADER_GRID_LOOP_MS - loopProgress + LOADER_GRID_EXIT_START_MS;
};

function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(() => isRouteLoading());
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef();
  const settleTimerRef = useRef();
  const visibleStartedAtRef = useRef(performance.now());
  const visibleRef = useRef(isVisible);
  const isExitingRef = useRef(isExiting);

  useEffect(() => {
    visibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    isExitingRef.current = isExiting;
  }, [isExiting]);

  useEffect(() => {
    return subscribeToRouteLoading((isLoading) => {
      window.clearTimeout(settleTimerRef.current);
      window.clearTimeout(exitTimerRef.current);

      if (isLoading) {
        if (!visibleRef.current) {
          visibleStartedAtRef.current = performance.now();
        }

        setIsVisible(true);
        setIsExiting(false);
        return;
      }

      if (!visibleRef.current) {
        return;
      }

      const startExit = () => {
        setIsExiting(true);
        exitTimerRef.current = window.setTimeout(() => {
          setIsVisible(false);
          setIsExiting(false);
        }, LOADER_EXIT_FALLBACK_MS);
      };

      settleTimerRef.current = window.setTimeout(startExit, getLoaderExitDelay(visibleStartedAtRef.current));
    });
  }, []);

  useEffect(() => () => {
    window.clearTimeout(settleTimerRef.current);
    window.clearTimeout(exitTimerRef.current);
  }, []);

  const handleExitAnimationEnd = (event) => {
    if (!isExitingRef.current || event.target !== event.currentTarget || event.animationName !== "loadingPageClear") {
      return;
    }

    window.clearTimeout(settleTimerRef.current);
    window.clearTimeout(exitTimerRef.current);
    setIsVisible(false);
    setIsExiting(false);
  };

  if (!isVisible && !isRouteLoading()) {
    return null;
  }

  return <Loading isExiting={isExiting} onExitAnimationEnd={handleExitAnimationEnd} />;
}

function AppRoutes() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product-studio" element={<ProductStudio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<DS />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/ai-research-guide" element={<AIResearchGuide />} />
          <Route path="/platforms-integration" element={<PlatformsIntegration />} />
          <Route path="/kiosk" element={<Kiosk />} />
        </Routes>
      </Suspense>
      <LoadingOverlay />
    </>
  );
}

const App = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
