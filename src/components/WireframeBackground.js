import React, { useEffect, useMemo, useState } from "react";

const BASE_WIDTH = 1440;
const BASE_HEIGHT = 900;
const CENTER_RECT_RATIO = 400 / BASE_WIDTH;
const MAIN_STROKE = "#3E454C";
const INNER_STROKE = "#171C20";
const LINE_WIDTH = 1;
const RECTANGLE_COUNT = 4;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getCenterRectRatio = (viewportAspect) => {
  if (viewportAspect < 0.72) return 0.42;
  if (viewportAspect < 1) return 0.36;
  if (viewportAspect < 1.35) return 0.31;
  if (viewportAspect > 2.1) return 0.25;
  return CENTER_RECT_RATIO;
};

const createLineThroughPoint = (center, point, width, height) => {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const scaleX = dx === 0 ? 0 : (dx > 0 ? width - center.x : -center.x) / dx;
  const scaleY = dy === 0 ? 0 : (dy > 0 ? height - center.y : -center.y) / dy;
  const scale = Math.max(scaleX, scaleY);

  return {
    x1: center.x + dx * scale,
    y1: center.y + dy * scale,
    x2: center.x,
    y2: center.y,
  };
};

const getResponsiveWireframe = (width, height) => {
  const center = { x: width / 2, y: height / 2 };
  const viewportAspect = width / height;
  const rectRatio = getCenterRectRatio(viewportAspect);
  const rectWidth = clamp(width * rectRatio, 150, width * 0.54);
  const rectHeight = clamp(height * rectRatio, 150, height * 0.54);
  const rect = {
    x: center.x - rectWidth / 2,
    y: center.y - rectHeight / 2,
    width: rectWidth,
    height: rectHeight,
  };

  const points = [];
  const addPoint = (x, y) => {
    const key = `${Math.round(x * 100) / 100}:${Math.round(y * 100) / 100}`;
    if (!points.some((point) => point.key === key)) {
      points.push({ key, x, y });
    }
  };

  [0, 1].forEach((xSide) => {
    [0, 1].forEach((ySide) => {
      addPoint(rect.x + rect.width * xSide, rect.y + rect.height * ySide);
    });
  });

  [1 / 5, 2 / 5, 3 / 5, 4 / 5].forEach((step) => {
    addPoint(rect.x + rect.width * step, rect.y);
    addPoint(rect.x + rect.width * step, rect.y + rect.height);
  });

  [1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7].forEach((step) => {
    addPoint(rect.x, rect.y + rect.height * step);
    addPoint(rect.x + rect.width, rect.y + rect.height * step);
  });

  const maxRectScale = Math.min(width / rect.width, height / rect.height) * 0.76;
  const rectangleScales = Array.from({ length: RECTANGLE_COUNT }, (_, index) => {
    const progress = index / (RECTANGLE_COUNT - 1);
    return 1 + (maxRectScale - 1) * Math.pow(progress, 1.15);
  });

  const rectangles = rectangleScales.map((scale, index) => ({
    x: center.x - (rect.width * scale) / 2,
    y: center.y - (rect.height * scale) / 2,
    width: rect.width * scale,
    height: rect.height * scale,
    stroke: index === 0 ? INNER_STROKE : MAIN_STROKE,
  }));

  return {
    center,
    rect,
    lines: points.map((point) => createLineThroughPoint(center, point, width, height)),
    rectangles: [
      { x: 0, y: 0, width, height, stroke: MAIN_STROKE },
      ...rectangles.reverse(),
    ],
  };
};

const WireframeBackground = () => {
  const instanceId = useMemo(() => `wireframe-${Math.random().toString(36).slice(2)}`, []);
  const gradientId = `${instanceId}-center-ray-fade`;
  const maskId = `${instanceId}-fade-rays-to-center`;
  const [viewport, setViewport] = useState({
    width: typeof window === "undefined" ? BASE_WIDTH : window.innerWidth,
    height: typeof window === "undefined" ? BASE_HEIGHT : window.innerHeight,
  });

  useEffect(() => {
    let frameId;

    const updateViewport = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const wireframe = useMemo(
    () => getResponsiveWireframe(viewport.width, viewport.height),
    [viewport.width, viewport.height],
  );

  return (
    <svg
      className="wireframe-background"
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx={wireframe.center.x}
          cy={wireframe.center.y}
          r={Math.max(wireframe.rect.width, wireframe.rect.height) * 0.55}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${wireframe.center.x} ${wireframe.center.y}) scale(1 0.62) translate(${-wireframe.center.x} ${-wireframe.center.y})`}
        >
          <stop offset="0" stopColor="black" />
          <stop offset="0.26" stopColor="black" />
          <stop offset="0.58" stopColor="#6A6A6A" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <mask id={maskId}>
          <rect x="-12%" y="-12%" width="124%" height="124%" fill="white" />
          <rect x="-12%" y="-12%" width="124%" height="124%" fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <g stroke={MAIN_STROKE} strokeLinecap="square" strokeLinejoin="miter">
        <g mask={`url(#${maskId})`}>
          {wireframe.lines.map((line, index) => (
            <line
              key={`ray-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              strokeWidth={LINE_WIDTH}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
        {wireframe.rectangles.map((rect, index) => (
          <rect
            key={`rect-${index}`}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke={rect.stroke}
            strokeWidth={LINE_WIDTH}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
};

export default WireframeBackground;
