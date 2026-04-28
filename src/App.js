import React, { useState, useEffect, Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading"


const Homepage = lazy(() => import("./views/homepage"));
const Contact = lazy(() => import("./views/contact.js"));
const Vogether = lazy(() => import("./views/projects/Vogether"));
const ProductStudio = lazy(() => import("./views/projects/ProductStudio"));
const Thesis = lazy(() => import("./views/projects/Thesis"));
const DS = lazy(() => import("./views/projects/DS"));
const Voice = lazy(() => import("./views/projects/Voice"));
const Kiosk = lazy(() => import("./views/projects/Kiosk"));


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
    <HashRouter>
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product-studio" element={<ProductStudio />} />
        <Route path="/thesis" element={<Thesis />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/design-system" element={<DS />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/vogether" element={<Vogether />} />
        <Route path="/kiosk" element={<Kiosk />} />
      </Routes>
    </Suspense>
  </HashRouter>
  );
};

export default App;