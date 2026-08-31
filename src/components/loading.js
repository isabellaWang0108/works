import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { preloadRouteAssets } from "../utils/preloadAssets";
import "../css/index.css"

const Loading = ({ isExiting = false, onExitAnimationEnd }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        return preloadRouteAssets(pathname);
    }, [pathname]);

    return (
        <div
            className={`loadingpage${isExiting ? " loadingpage--exit" : ""}`}
            role="status"
            aria-label="Loading"
            onAnimationEnd={onExitAnimationEnd}
        />
    );
}

export default Loading;
