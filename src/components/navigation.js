import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Linkedin from "../assets/images/contact/linkedin.svg"
import Email from "../assets/images/contact/email.svg"

const RESUME_URL = "https://drive.google.com/file/d/1dbaLfbp0ysq0jpxBCEXDLSYdyJorgTE_/view?usp=sharing";
const DISTORTION_SOURCE_SELECTOR = "#HP_container, .project-page .content-layout";
const DISTORTION_WAVE_HEIGHT = 128;
const DISTORTION_WAVE_AMPLITUDE = 76;

const createWaveDisplacementMap = () => {
    const rows = Array.from({ length: DISTORTION_WAVE_HEIGHT }, (_, index) => {
        const progress = index / DISTORTION_WAVE_HEIGHT;
        const red = Math.round(128 - (DISTORTION_WAVE_AMPLITUDE * Math.sin(progress * Math.PI * 2)));

        return `<rect x="0" y="${index}" width="1" height="1" fill="rgb(${red},128,0)" />`;
    }).join("");

    return `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="${DISTORTION_WAVE_HEIGHT}" viewBox="0 0 1 ${DISTORTION_WAVE_HEIGHT}" preserveAspectRatio="none">${rows}</svg>`
    )}`;
};

const WAVE_DISPLACEMENT_MAP = createWaveDisplacementMap();

const NavigationBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";
    const distortionBandRef = useRef(null);
    const distortionWaveImageRef = useRef(null);

    useEffect(() => {
        const distortionBand = distortionBandRef.current;

        if (!distortionBand) {
            return undefined;
        }

        let sourceElement = null;
        let cloneElement = null;
        let frameId = null;
        let rebuildTimerId = null;
        let scrollParent = null;
        let resizeObserver = null;

        const getSourceElement = () => (
            Array.from(document.querySelectorAll(DISTORTION_SOURCE_SELECTOR)).find(
                (element) => !element.closest(".site-nav-distortion-band")
            )
        );

        const updateClonePosition = () => {
            frameId = null;

            if (!sourceElement || !cloneElement) {
                return;
            }

            const rect = sourceElement.getBoundingClientRect();
            const scrollOffset = scrollParent ? scrollParent.scrollTop : window.scrollY;
            const scrollableHeight = Math.max(
                sourceElement.scrollHeight,
                sourceElement.offsetHeight,
                rect.height,
                scrollParent?.scrollHeight || 0,
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );

            cloneElement.style.width = `${rect.width}px`;
            cloneElement.style.height = `${scrollableHeight}px`;
            cloneElement.style.minHeight = `${scrollableHeight}px`;
            cloneElement.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;

            if (distortionWaveImageRef.current) {
                distortionWaveImageRef.current.setAttribute("y", `${-scrollOffset % DISTORTION_WAVE_HEIGHT}`);
            }
        };

        const requestPositionUpdate = () => {
            if (frameId) {
                return;
            }

            frameId = window.requestAnimationFrame(updateClonePosition);
        };

        const buildDistortionClone = () => {
            sourceElement = getSourceElement();
            distortionBand.replaceChildren();
            cloneElement = null;
            scrollParent?.removeEventListener("scroll", requestPositionUpdate);
            resizeObserver?.disconnect();
            scrollParent = null;
            resizeObserver = null;

            if (!sourceElement) {
                return;
            }

            scrollParent = sourceElement.closest(".page-container");
            scrollParent?.addEventListener("scroll", requestPositionUpdate, { passive: true });
            cloneElement = sourceElement.cloneNode(true);
            cloneElement.classList.add("site-nav-distortion-clone");
            cloneElement.dataset.navDistortionClone = "true";
            cloneElement.setAttribute("aria-hidden", "true");
            cloneElement.setAttribute("inert", "");
            cloneElement.querySelector(".cursor-distortion-layer")?.remove();
            cloneElement.querySelectorAll("img").forEach((image) => {
                image.loading = "eager";
            });
            distortionBand.appendChild(cloneElement);

            if ("ResizeObserver" in window) {
                resizeObserver = new ResizeObserver(requestPositionUpdate);
                resizeObserver.observe(sourceElement);
                resizeObserver.observe(document.body);
            }

            requestPositionUpdate();
        };

        const scheduleCloneRebuild = () => {
            window.clearTimeout(rebuildTimerId);
            rebuildTimerId = window.setTimeout(buildDistortionClone, 80);
        };

        buildDistortionClone();
        scheduleCloneRebuild();

        window.addEventListener("scroll", requestPositionUpdate, { passive: true });
        window.addEventListener("resize", scheduleCloneRebuild);
        window.addEventListener("load", scheduleCloneRebuild);

        return () => {
            window.clearTimeout(rebuildTimerId);
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            window.removeEventListener("scroll", requestPositionUpdate);
            window.removeEventListener("resize", scheduleCloneRebuild);
            window.removeEventListener("load", scheduleCloneRebuild);
            scrollParent?.removeEventListener("scroll", requestPositionUpdate);
            resizeObserver?.disconnect();
            distortionBand.replaceChildren();
        };
    }, [location.pathname]);

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/");
    };

    return (
        <div className="site-nav-shell fade-in">
            <svg className="site-nav-distortion-filter" aria-hidden="true" focusable="false">
                <filter id="site-nav-wave-distortion" x="-140%" y="-180%" width="380%" height="460%">
                    <feImage
                        ref={distortionWaveImageRef}
                        href={WAVE_DISPLACEMENT_MAP}
                        x="0"
                        y="0"
                        width="1"
                        height={DISTORTION_WAVE_HEIGHT}
                        preserveAspectRatio="none"
                        result="navWaveMap"
                    />
                    <feTile in="navWaveMap" result="tiledNavWaveMap" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="tiledNavWaveMap"
                        scale="158"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="primaryWaveDistortion"
                    />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.045 0.18"
                        numOctaves="2"
                        seed="9"
                        result="irregularPixelMap"
                    />
                    <feDisplacementMap
                        in="primaryWaveDistortion"
                        in2="irregularPixelMap"
                        scale="9"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="irregularWaveDistortion"
                    />
                    <feGaussianBlur
                        in="irregularWaveDistortion"
                        stdDeviation="0.65 0.9"
                    />
                </filter>
            </svg>
            <div className="site-nav-distortion-band" ref={distortionBandRef} aria-hidden="true"></div>
            <div className="site-nav-glass">
                {/* Logo */}
                <Link to="/" className="site-nav-brand-link">
                    <div className="site-logo logo bold pink">
                        Isabella Wang
                    </div>
                </Link>
                <div className="site-nav-actions" aria-label="Contact links">
                    <a
                        href="https://www.linkedin.com/in/isabella-wang-310181149/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-nav-icon-link"
                        aria-label="LinkedIn"
                    >
                        <img src={Linkedin} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href="mailto:wangxbella0108@gmail.com"
                        className="site-nav-icon-link"
                        aria-label="Email Isabella Wang"
                    >
                        <img src={Email} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-nav-link bold pink"
                        aria-label="Resume"
                    >
                        Resume
                    </a>
                </div>
            </div>

            {!isHomePage && (
                <button
                    type="button"
                    onClick={goBack}
                    className="icon backbtn back-btn-fixed"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back
                </button>
            )}
        </div>
    );
};

export default React.memo(NavigationBar);
