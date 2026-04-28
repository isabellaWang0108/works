import React, { useState, useEffect, Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading"
import PasswordGate from "./components/PasswordGate"


const Homepage = lazy(() => import("./views/homepage"));
const Contact = lazy(() => import("./views/contact.js"));
const ProductStudio = lazy(() => import("./views/projects/ProductStudio"));
const Thesis = lazy(() => import("./views/projects/Thesis"));
const DS = lazy(() => import("./views/projects/DS"));
const Voice = lazy(() => import("./views/projects/Voice"));
const AIResearchGuide = lazy(() => import("./views/projects/AIResearchGuide"));
const PlatformsIntegration = lazy(() => import("./views/projects/PlatformsIntegration"));


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = 2000;

    Promise.all([
      new Promise((resolve) => setTimeout(resolve, minLoadingTime)),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PasswordGate>
      <HashRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product-studio" element={<ProductStudio />} />
            <Route path="/thesis" element={<Thesis />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/design-system" element={<DS />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/ai-research-guide" element={<AIResearchGuide />} />
            <Route path="/platforms-integration" element={<PlatformsIntegration />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </PasswordGate>
  );
};

export default App;
