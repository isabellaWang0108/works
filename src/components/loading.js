import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { preloadRouteAssets } from "../utils/preloadAssets";

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
        >
            <span className="loading-grid-forming" aria-hidden="true" />
        </div>
    );
}

export default Loading;
