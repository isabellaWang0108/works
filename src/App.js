import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading"


const Homepage = lazy(() => import("./views/homepage"));
const Contact = lazy(() => import("./views/contact.js"));
const ProductStudio = lazy(() => import("./views/projects/ProductStudio"));
const DS = lazy(() => import("./views/projects/DS"));
const Voice = lazy(() => import("./views/projects/Voice"));
const AIResearchGuide = lazy(() => import("./views/projects/AIResearchGuide"));
const PlatformsIntegration = lazy(() => import("./views/projects/PlatformsIntegration"));
const Kiosk = lazy(() => import("./views/projects/Kiosk"));


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
