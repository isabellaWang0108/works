import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DATA_LABELS = [
  "AI", "UX", "DATA", "B2B", "INFO", "MOBILE", "WEB", "APP", "B2C", "USERS",
  "CS", "ML", "DESIGN", "TECH", "RESEARCH", "STRATEGY", "SYSTEMS", "AUTOMATION",
  "INSIGHTS", "PRODUCT", "USER",
];

const STAR_POINTS = [
  [-1.7, -1.3, 0.2], [-1.45, 1.18, 0.98], [-0.82, -1.64, -0.52], [-0.36, 1.72, 0.62],
  [0.44, -1.68, 0.96], [0.9, 1.5, -0.66], [1.62, -0.72, -0.18], [1.7, 0.9, 0.5],
  [-1.84, 0.12, -0.92], [0.1, 1.86, -0.86], [1.28, -1.28, 0.2], [-1.2, -0.98, 1.14],
];

const SPARK_POINTS = [
  [-1.55, -0.54, 0.92], [-1.1, 1.42, -0.24], [-0.62, 0.48, 1.58], [-0.18, -1.72, 0.22],
  [0.18, 1.28, 1.14], [0.62, -0.86, -1.34], [1.08, 0.42, 1.1], [1.5, -0.18, -0.72],
  [-1.62, 0.78, 0.18], [-0.48, -1.28, -1.04], [0.76, 1.7, 0.08], [1.36, 1.02, -0.46],
];

const labelTextureCache = new Map();
let dotTexture = null;
const getStarColor = (index) => (index % 3 === 0 ? "#ff8cc4" : "#ff9ccc");
const getGlintColor = (index) => (index % 2 === 0 ? "#ffe2f2" : "#ff8cc4");

function makeSoftDotTexture() {
  if (dotTexture) {
    return dotTexture;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const size = 96;
  const center = size / 2;

  canvas.width = size;
  canvas.height = size;

  const gradient = context.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.94)");
  gradient.addColorStop(0.78, "rgba(255, 255, 255, 0.28)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  dotTexture = new THREE.CanvasTexture(canvas);
  dotTexture.colorSpace = THREE.SRGBColorSpace;
  dotTexture.minFilter = THREE.LinearFilter;
  dotTexture.magFilter = THREE.LinearFilter;
  dotTexture.generateMipmaps = false;
  dotTexture.needsUpdate = true;
  return dotTexture;
}

function createBuckyballTopology() {
  const geometry = new THREE.IcosahedronGeometry(1.44, 1);
  const positions = geometry.attributes.position;
  const index = geometry.index;
  const pointMap = new Map();
  const points = [];
  const faces = [];

  const getPointIndex = (vertexIndex) => {
    const point = new THREE.Vector3().fromBufferAttribute(positions, vertexIndex);
    const key = `${point.x.toFixed(4)},${point.y.toFixed(4)},${point.z.toFixed(4)}`;

    if (!pointMap.has(key)) {
      pointMap.set(key, points.length);
      points.push(point);
    }

    return pointMap.get(key);
  };

  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      faces.push([
        getPointIndex(index.getX(i)),
        getPointIndex(index.getX(i + 1)),
        getPointIndex(index.getX(i + 2)),
      ]);
    }
  } else {
    for (let i = 0; i < positions.count; i += 3) {
      faces.push([getPointIndex(i), getPointIndex(i + 1), getPointIndex(i + 2)]);
    }
  }

  const edgeMap = new Map();
  const addEdge = (a, b) => {
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    edgeMap.set(`${start}-${end}`, [start, end]);
  };

  faces.forEach(([a, b, c]) => {
    addEdge(a, b);
    addEdge(b, c);
    addEdge(c, a);
  });

  const edges = Array.from(edgeMap.values())
    .sort(([aStart, aEnd], [bStart, bEnd]) => (aStart - bStart) || (aEnd - bEnd))
    .map(([start, end], index) => {
      const midpointZ = (points[start].z + points[end].z) / 2;
      const variant = index % 7 === 0 ? "signal" : midpointZ < -0.54 ? "rear" : midpointZ > 0.54 ? "outer" : index % 5 === 0 ? "cross" : "inner";
      return [start, end, variant];
    });

  return { points, edges };
}

function makeLabelTexture(label) {
  const cacheKey = label;
  const cachedTexture = labelTextureCache.get(cacheKey);

  if (cachedTexture) {
    return cachedTexture;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = label.length > 8 ? 620 : label.length > 4 ? 500 : 340;
  const height = 190;
  const centerY = 95;

  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(width * 0.18, centerY - 22, width * 0.82, centerY + 18);
  gradient.addColorStop(0, "#C7BBC5");
  gradient.addColorStop(0.5, "#AA98A8");
  gradient.addColorStop(1, "#B77C98");

  context.font = "400 30px SuisseIntl-Regular, Inter, Helvetica Neue, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = "1.4px";
  context.lineWidth = 1.8;
  context.strokeStyle = "#05070D";
  context.shadowColor = "#7A6470";
  context.shadowBlur = 48;
  context.strokeText(label, width / 2, centerY);
  context.fillStyle = gradient;
  context.fillText(label, width / 2, centerY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  labelTextureCache.set(cacheKey, texture);
  return texture;
}

function LabelSprite({ label, position }) {
  const texture = useMemo(() => makeLabelTexture(label), [label]);
  const width = label.length > 8 ? 0.98 : label.length > 4 ? 0.79 : 0.54;

  return (
    <sprite position={position} scale={[width, 0.3, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={1}
        depthWrite={false}
        depthTest
        fog
        blending={THREE.NormalBlending}
        toneMapped={false}
      />
    </sprite>
  );
}

const CONNECTION_FRONT_COLOR = "#94A1A8";
const CONNECTION_SIGNAL_COLOR = "#F0BED3";
const CONNECTION_CROSS_COLOR = "#A9B8FF";
const CONNECTION_OUTER_COLOR = "#C8CFD5";
const CONNECTION_DOT_SPACING = 0.086;
const CONNECTION_FRONT_DOT_SIZE = 0.048;
const SCENE_TILT_X = -0.2;
const SCENE_TILT_Y = -0.42;
const SCENE_ROTATION_SPEED = 0.011;
const PULSE_COUNT = 4;
const PULSE_EDGE_STRIDE = 13;
const PULSE_SPEED = 0.24;
const PULSE_TRAIL_LENGTH = 0.28;
const PULSE_FADE_IN_END = 0.08;
const PULSE_NODE_FADE_START = 0.76;

function ConnectionCloud({ points, edges }) {
  const pointTexture = useMemo(() => makeSoftDotTexture(), []);
  const { positions, colors } = useMemo(() => {
    const baseFront = new THREE.Color(CONNECTION_FRONT_COLOR);
    const signal = new THREE.Color(CONNECTION_SIGNAL_COLOR);
    const cross = new THREE.Color(CONNECTION_CROSS_COLOR);
    const outer = new THREE.Color(CONNECTION_OUTER_COLOR);
    const color = new THREE.Color();
    const dotPositions = [];
    const dotColors = [];

    edges.forEach(([startIndex, endIndex, variant]) => {
      const start = points[startIndex];
      const end = points[endIndex];
      const distance = start.distanceTo(end);
      const dotCount = Math.max(6, Math.round(distance / CONNECTION_DOT_SPACING));

      for (let index = 0; index < dotCount; index += 1) {
        const t = (index + 1) / (dotCount + 1);
        const position = start.clone().lerp(end, t);

        color.copy(baseFront);

        if (variant === "signal") {
          color.lerp(signal, 0.42);
        } else if (variant === "cross") {
          color.lerp(cross, 0.26);
        } else if (variant === "outer") {
          color.lerp(outer, 0.18);
        }

        dotPositions.push(position.x, position.y, position.z);
        dotColors.push(color.r, color.g, color.b);
      }
    });

    return {
      positions: new Float32Array(dotPositions),
      colors: new Float32Array(dotColors),
    };
  }, [points, edges]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={pointTexture}
        size={CONNECTION_FRONT_DOT_SIZE}
        vertexColors
        transparent
        opacity={0.92}
        alphaTest={0.02}
        depthWrite={false}
        depthTest
        fog
        toneMapped={false}
      />
    </points>
  );
}

function PulseLayer({
  color,
  count,
  edgePaths,
  haloArgs,
  haloOpacity,
  coreArgs,
  coreOpacity,
  pathOffset = 0,
}) {
  const haloRef = useRef();
  const coreRef = useRef();
  const matrixObject = useMemo(() => new THREE.Object3D(), []);
  const pulseStart = useMemo(() => new THREE.Vector3(), []);
  const pulseEnd = useMemo(() => new THREE.Vector3(), []);
  const midpoint = useMemo(() => new THREE.Vector3(), []);
  const pulseOffsets = useMemo(() => (
    Array.from({ length: count }, (_, index) => index / count)
  ), [count]);

  const updatePulseMatrices = (elapsedTime) => {
    if (!haloRef.current || !coreRef.current) return;

    pulseOffsets.forEach((offset, index) => {
      const progress = elapsedTime * PULSE_SPEED + offset;
      const cycle = Math.floor(progress);
      const edgeProgress = progress % 1;
      const pathSpacing = Math.max(1, Math.floor(edgePaths.length / count));
      const edgeIndex = (cycle * PULSE_EDGE_STRIDE + pathOffset + index * pathSpacing) % edgePaths.length;
      const { start, end, quaternion } = edgePaths[edgeIndex];
      const fadeIn = THREE.MathUtils.smoothstep(edgeProgress, 0, PULSE_FADE_IN_END);
      const fadeOut = 1 - THREE.MathUtils.smoothstep(edgeProgress, PULSE_NODE_FADE_START, 1);
      const visibleRatio = Math.max(0.001, Math.min(fadeIn, fadeOut));
      const t = PULSE_TRAIL_LENGTH + edgeProgress * (1 - PULSE_TRAIL_LENGTH);
      const tail = Math.max(0, t - PULSE_TRAIL_LENGTH * visibleRatio);
      pulseStart.copy(start).lerp(end, tail);
      pulseEnd.copy(start).lerp(end, t);
      midpoint.copy(pulseStart).add(pulseEnd).multiplyScalar(0.5);
      const length = Math.max(0.001, pulseStart.distanceTo(pulseEnd));

      matrixObject.position.copy(midpoint);
      matrixObject.quaternion.copy(quaternion);

      matrixObject.scale.set(visibleRatio, length, visibleRatio);
      matrixObject.updateMatrix();
      haloRef.current.setMatrixAt(index, matrixObject.matrix);
      coreRef.current.setMatrixAt(index, matrixObject.matrix);
    });

    haloRef.current.instanceMatrix.needsUpdate = true;
    coreRef.current.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    updatePulseMatrices(0);
  });

  useFrame(({ clock }) => {
    updatePulseMatrices(clock.elapsedTime);
  });

  return (
    <>
      <instancedMesh ref={haloRef} args={[null, null, count]}>
        <cylinderGeometry args={haloArgs} />
        <meshBasicMaterial color={color} transparent opacity={haloOpacity} depthWrite={false} fog blending={THREE.AdditiveBlending} />
      </instancedMesh>
      <instancedMesh ref={coreRef} args={[null, null, count]}>
        <cylinderGeometry args={coreArgs} />
        <meshBasicMaterial color={color} transparent opacity={coreOpacity} depthWrite={false} fog blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </>
  );
}

function DataPulses({ points, edges }) {
  const edgePaths = useMemo(() => (
    edges.map(([startIndex, endIndex]) => {
      const start = points[startIndex];
      const end = points[endIndex];
      const direction = end.clone().sub(start).normalize();
      return {
        start,
        end,
        quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction),
      };
    })
  ), [edges, points]);

  return (
    <PulseLayer
      color="#fff2f8"
      count={PULSE_COUNT}
      edgePaths={edgePaths}
      haloArgs={[0.018, 0.0042, 1, 10]}
      haloOpacity={0.14}
      coreArgs={[0.0072, 0.002, 1, 8]}
      coreOpacity={0.38}
      pathOffset={11}
    />
  );
}

function TwinkleField({ points, opacity, speed, scaleMin, scaleMax, colorForIndex, geometryArgs }) {
  const ref = useRef();
  const matrixObject = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    points.forEach((position, index) => {
      matrixObject.position.set(position[0], position[1], position[2]);
      matrixObject.scale.setScalar(scaleMin);
      matrixObject.updateMatrix();
      ref.current.setMatrixAt(index, matrixObject.matrix);
      ref.current.setColorAt(index, new THREE.Color(colorForIndex(index)));
    });

    ref.current.instanceMatrix.needsUpdate = true;

    if (ref.current.instanceColor) {
      ref.current.instanceColor.needsUpdate = true;
    }
  }, [colorForIndex, matrixObject, points, scaleMin]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    points.forEach((position, index) => {
      const glow = Math.max(0, Math.sin(clock.elapsedTime * speed + index * 1.43));
      const scale = scaleMin + glow * (scaleMax - scaleMin);

      matrixObject.position.set(position[0], position[1], position[2]);
      matrixObject.scale.setScalar(scale);
      matrixObject.updateMatrix();
      ref.current.setMatrixAt(index, matrixObject.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, points.length]}>
      <sphereGeometry args={geometryArgs} />
      <meshBasicMaterial vertexColors transparent opacity={opacity} depthWrite={false} blending={THREE.NormalBlending} />
    </instancedMesh>
  );
}

function NodePoint({ label, position }) {
  return (
    <group position={position}>
      <LabelSprite label={label} position={[0, 0, 0]} />
    </group>
  );
}

function HeroRenderScheduler() {
  const invalidate = useThree((state) => state.invalidate);
  const rootRef = useRef(null);

  useEffect(() => {
    let isAnimating = true;
    const frameDelay = window.matchMedia("(max-width: 620px)").matches ? 80 : 50;

    const updateAnimationState = () => {
      isAnimating = !document.hidden && rootRef.current !== false;
      if (isAnimating) {
        invalidate();
      }
    };

    const frameTimer = window.setInterval(() => {
      if (isAnimating) {
        invalidate();
      }
    }, frameDelay);

    updateAnimationState();
    document.addEventListener("visibilitychange", updateAnimationState);

    const canvasRoot = document.querySelector(".hero-buckyball");
    const observer = "IntersectionObserver" in window && canvasRoot
      ? new IntersectionObserver(([entry]) => {
          rootRef.current = entry.isIntersecting;
          updateAnimationState();
        }, { rootMargin: "180px 0px" })
      : null;

    observer?.observe(canvasRoot);

    return () => {
      window.clearInterval(frameTimer);
      document.removeEventListener("visibilitychange", updateAnimationState);
      observer?.disconnect();
    };
  }, [invalidate]);

  return null;
}

function BuckyballScene({ labels }) {
  const groupRef = useRef();
  const { points, edges } = useMemo(() => createBuckyballTopology(), []);
  const nodeLabels = useMemo(
    () => points.map(() => labels[Math.floor(Math.random() * labels.length)]),
    [labels, points],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = SCENE_TILT_Y + clock.elapsedTime * SCENE_ROTATION_SPEED;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[SCENE_TILT_X, SCENE_TILT_Y, 0]}>
      <ConnectionCloud points={points} edges={edges} />
      <DataPulses points={points} edges={edges} />
      <TwinkleField
        points={STAR_POINTS}
        opacity={0.28}
        speed={0.9}
        scaleMin={0.8}
        scaleMax={1.34}
        colorForIndex={getStarColor}
        geometryArgs={[0.012, 8, 8]}
      />
      <TwinkleField
        points={SPARK_POINTS}
        opacity={0.22}
        speed={1.4}
        scaleMin={0.72}
        scaleMax={1.24}
        colorForIndex={getGlintColor}
        geometryArgs={[0.015, 10, 10]}
      />
      {points.map((point, index) => (
        <NodePoint
          key={`node-${index}`}
          label={nodeLabels[index]}
          position={point}
        />
      ))}
    </group>
  );
}

function HeroBuckyballGraph() {
  const canvasDpr = useMemo(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 620px)").matches) {
      return [1, 1.2];
    }

    return [1, 1.4];
  }, []);

  return (
    <div className="hero-buckyball" aria-hidden="true">
      <Canvas
        dpr={canvasDpr}
        frameloop="demand"
        camera={{ position: [0, 0.04, 5.6], fov: 43 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#030405", 4.75, 8.15]} />
        <HeroRenderScheduler />
        <BuckyballScene labels={DATA_LABELS} />
      </Canvas>
    </div>
  );
}

export default React.memo(HeroBuckyballGraph);
