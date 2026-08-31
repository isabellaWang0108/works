import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { preloadRouteAssets } from "../utils/preloadAssets";
import "../css/index.css"

const Loading = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        return preloadRouteAssets(pathname);
    }, [pathname]);

    return (
        <div className="loadingpage" role="status" aria-label="Loading" />
    );
}

export default Loading;
