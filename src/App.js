import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loading from "./components/loading"
import { lazyWithMinimum } from "./utils/lazyWithMinimum";
import { trackPageView } from "./utils/analytics";
import { preloadRouteCriticalAssets } from "./utils/preloadAssets";
import { isRouteLoading, subscribeToRouteLoading } from "./utils/routeLoadingState";


const Homepage = lazy(() => lazyWithMinimum(() => import("./views/homepage/index.js"), () => preloadRouteCriticalAssets("/")));
const Contact = lazy(() => lazyWithMinimum(() => import("./views/contact.js"), () => preloadRouteCriticalAssets("/contact")));
const DS = lazy(() => lazyWithMinimum(() => import("./views/projects/DS/index.js"), () => preloadRouteCriticalAssets("/design-system")));
const Voice = lazy(() => lazyWithMinimum(() => import("./views/projects/Voice/index.js"), () => preloadRouteCriticalAssets("/voice")));
const AIResearchGuide = lazy(() => lazyWithMinimum(() => import("./views/projects/AIResearchGuide/index.js"), () => preloadRouteCriticalAssets("/ai-research-guide")));
const PlatformsIntegration = lazy(() => lazyWithMinimum(() => import("./views/projects/PlatformsIntegration/index.js"), () => preloadRouteCriticalAssets("/platforms-integration")));
const Kiosk = lazy(() => lazyWithMinimum(() => import("./views/projects/Kiosk/index.js"), () => preloadRouteCriticalAssets("/kiosk")));
const AllProjects = lazy(() => lazyWithMinimum(() => import("./views/projects/index.js"), () => preloadRouteCriticalAssets("/projects")));

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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const legacyPath = window.location.hash;

    if (!legacyPath.startsWith("#/")) {
      return;
    }

    navigate(legacyPath.slice(1), { replace: true });
  }, [navigate]);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<DS />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/ai-research-guide" element={<AIResearchGuide />} />
          <Route path="/platforms-integration" element={<PlatformsIntegration />} />
          <Route path="/kiosk" element={<Kiosk />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </Suspense>
      <LoadingOverlay />
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
