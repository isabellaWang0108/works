import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading"
import { lazyWithMinimum } from "./utils/lazyWithMinimum";


const Homepage = lazy(() => lazyWithMinimum(() => import("./views/homepage")));
const Contact = lazy(() => lazyWithMinimum(() => import("./views/contact.js")));
const ProductStudio = lazy(() => lazyWithMinimum(() => import("./views/projects/ProductStudio")));
const DS = lazy(() => lazyWithMinimum(() => import("./views/projects/DS")));
const Voice = lazy(() => lazyWithMinimum(() => import("./views/projects/Voice")));
const AIResearchGuide = lazy(() => lazyWithMinimum(() => import("./views/projects/AIResearchGuide")));
const PlatformsIntegration = lazy(() => lazyWithMinimum(() => import("./views/projects/PlatformsIntegration")));
const Kiosk = lazy(() => lazyWithMinimum(() => import("./views/projects/Kiosk")));


const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
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
    </HashRouter>
  );
};

export default App;
