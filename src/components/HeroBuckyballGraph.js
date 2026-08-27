import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DATA_LABELS = [
  "AI", "UX", "DATA", "B2B", "B2C", "OPS", "CS", "ML", "DESIGN", "TECH",
  "RESEARCH", "STRATEGY", "SYSTEMS", "AUTOMATION", "INSIGHTS", "PRODUCT", "USER",
];

const NODE_COORDS = [
  [0, -1.42, 0.42], [0.82, -1.16, 0.66], [1.36, -0.54, 0.74], [1.42, 0.28, 0.58],
  [0.98, 1.02, 0.46], [0.26, 1.44, 0.38], [-0.58, 1.32, 0.5], [-1.24, 0.74, 0.68],
  [-1.48, -0.08, 0.54], [-1.12, -0.88, 0.62], [-0.42, -1.32, 0.58],
  [0.42, -1.32, -0.58], [1.12, -0.88, -0.62], [1.48, -0.08, -0.54], [1.24, 0.74, -0.68],
  [0.58, 1.32, -0.5], [-0.26, 1.44, -0.38], [-0.98, 1.02, -0.46], [-1.42, 0.28, -0.58],
  [-1.36, -0.54, -0.74], [-0.82, -1.16, -0.66],
  [0, -0.64, 1.32], [0.74, 0, 1.22], [0, 0.7, 1.28], [-0.76, 0, 1.2],
  [0, -0.7, -1.28], [0.76, 0, -1.2], [0, 0.64, -1.32], [-0.74, 0, -1.22],
];

const EDGES = [
  [0, 1, "outer"], [1, 2, "outer"], [2, 3, "outer"], [3, 4, "outer"], [4, 5, "outer"],
  [5, 6, "outer"], [6, 7, "outer"], [7, 8, "outer"], [8, 9, "outer"], [9, 10, "outer"], [10, 0, "outer"],
  [11, 12, "rear"], [12, 13, "rear"], [13, 14, "rear"], [14, 15, "rear"], [15, 16, "rear"],
  [16, 17, "rear"], [17, 18, "rear"], [18, 19, "rear"], [19, 20, "rear"], [20, 11, "rear"],
  [0, 11, "inner"], [1, 12, "inner"], [2, 13, "inner"], [3, 14, "inner"], [4, 15, "inner"],
  [5, 16, "inner"], [6, 17, "inner"], [7, 18, "inner"], [8, 19, "inner"], [9, 20, "inner"],
  [21, 22, "inner"], [22, 23, "inner"], [23, 24, "inner"], [24, 21, "inner"],
  [25, 26, "rear"], [26, 27, "rear"], [27, 28, "rear"], [28, 25, "rear"],
  [0, 21, "inner"], [2, 22, "inner"], [5, 23, "inner"], [8, 24, "inner"],
  [11, 25, "rear"], [13, 26, "rear"], [16, 27, "rear"], [19, 28, "rear"],
  [0, 22, "signal"], [1, 21, "signal"], [3, 22, "signal"], [4, 23, "signal"], [6, 24, "signal"],
  [7, 23, "signal"], [9, 21, "signal"], [10, 24, "signal"], [12, 25, "signal"], [14, 26, "signal"],
  [15, 27, "signal"], [17, 28, "signal"], [18, 27, "signal"], [20, 25, "signal"],
  [21, 26, "cross"], [22, 27, "cross"], [23, 28, "cross"], [24, 25, "cross"],
  [0, 14, "cross"], [2, 16, "cross"], [4, 18, "cross"], [6, 20, "cross"], [8, 12, "cross"], [10, 13, "cross"],
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

  const pulseEdges = edges
    .map((edge, index) => [edge, index])
    .filter(([[, , variant]], index) => variant === "signal" || index % 17 === 0)
    .map(([, index]) => index)
    .slice(0, 10);

  return { points, edges, pulseEdges };
}

function makeLabelTexture(label, isRear = false) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = label.length > 8 ? 620 : label.length > 4 ? 500 : 340;
  const height = 190;
  const centerY = 95;

  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(width * 0.18, centerY - 22, width * 0.82, centerY + 18);
  if (isRear) {
    gradient.addColorStop(0, "#5B5964");
    gradient.addColorStop(0.5, "#554C58");
    gradient.addColorStop(1, "#664858");
  } else {
    gradient.addColorStop(0, "#C7BBC5");
    gradient.addColorStop(0.5, "#AA98A8");
    gradient.addColorStop(1, "#B77C98");
  }

  context.font = "400 30px SuisseIntl-Regular, Inter, Helvetica Neue, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = "1.4px";
  context.lineWidth = 1.8;
  context.strokeStyle = isRear ? "#080A0E" : "#05070D";
  context.shadowColor = isRear ? "#3D343A" : "#7A6470";
  context.shadowBlur = isRear ? 24 : 48;
  context.strokeText(label, width / 2, centerY);
  context.fillStyle = gradient;
  context.fillText(label, width / 2, centerY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function LabelSprite({ label, position }) {
  const spriteRef = useRef();
  const materialRef = useRef();
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const frontTexture = useMemo(() => makeLabelTexture(label, false), [label]);
  const rearTexture = useMemo(() => makeLabelTexture(label, true), [label]);
  const width = label.length > 8 ? 0.98 : label.length > 4 ? 0.79 : 0.54;

  useFrame(() => {
    if (!spriteRef.current || !materialRef.current) return;
    spriteRef.current.getWorldPosition(worldPosition);
    const nextTexture = worldPosition.z >= CONNECTION_DEPTH_SPLIT ? frontTexture : rearTexture;
    if (materialRef.current.map !== nextTexture) {
      materialRef.current.map = nextTexture;
      materialRef.current.needsUpdate = true;
    }
  });

  return (
    <sprite ref={spriteRef} position={position} scale={[width, 0.3, 1]}>
      <spriteMaterial
        ref={materialRef}
        map={position.z >= CONNECTION_DEPTH_SPLIT ? frontTexture : rearTexture}
        transparent
        opacity={1}
        depthWrite={false}
        depthTest
        blending={THREE.NormalBlending}
        toneMapped={false}
      />
    </sprite>
  );
}

const CONNECTION_FRONT_COLOR = "#71848B";
const CONNECTION_REAR_COLOR = "#343A42";
const CONNECTION_DEPTH_SPLIT = 0;
const CONNECTION_DOT_SPACING = 0.086;
const CONNECTION_DOT_SIZE = 0.022;

function ConnectionCloud({ points, edges }) {
  const { positions, colors } = useMemo(() => {
    const front = new THREE.Color(CONNECTION_FRONT_COLOR);
    const rear = new THREE.Color(CONNECTION_REAR_COLOR);
    const dotPositions = [];
    const dotColors = [];

    edges.forEach(([startIndex, endIndex]) => {
      const start = points[startIndex];
      const end = points[endIndex];
      const distance = start.distanceTo(end);
      const dotCount = Math.max(6, Math.round(distance / CONNECTION_DOT_SPACING));

      for (let index = 0; index < dotCount; index += 1) {
        const t = (index + 1) / (dotCount + 1);
        const position = start.clone().lerp(end, t);
        const color = position.z >= CONNECTION_DEPTH_SPLIT ? front : rear;

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
        size={CONNECTION_DOT_SIZE}
        vertexColors
        transparent
        opacity={0.82}
        depthWrite={false}
        depthTest
        toneMapped={false}
      />
    </points>
  );
}

function DataPulse({ start, end, offset }) {
  const ref = useRef();
  const coreRef = useRef();
  const haloRef = useRef();
  const direction = useMemo(() => end.clone().sub(start).normalize(), [start, end]);
  const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction), [direction]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.22 + offset) % 1;
    const tail = Math.max(0, t - 0.18);
    const pulseStart = start.clone().lerp(end, tail);
    const pulseEnd = start.clone().lerp(end, t);
    const midpoint = pulseStart.clone().add(pulseEnd).multiplyScalar(0.5);
    const length = Math.max(0.001, pulseStart.distanceTo(pulseEnd));

    ref.current.position.copy(midpoint);
    ref.current.quaternion.copy(quaternion);
    coreRef.current?.scale.set(1, length, 1);
    haloRef.current?.scale.set(1, length, 1);
  });

  return (
    <group ref={ref}>
      <mesh ref={haloRef}>
        <cylinderGeometry args={[0.018, 0.004, 1, 12]} />
        <meshBasicMaterial color="#ff8cc4" transparent opacity={0.17} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.008, 0.002, 1, 12]} />
        <meshBasicMaterial color="#ffe2f2" transparent opacity={0.56} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function StarSpeck({ position, index }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.16 + Math.max(0, Math.sin(clock.elapsedTime * 0.9 + index * 1.7)) * 0.42;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshBasicMaterial color={index % 3 === 0 ? "#ff8cc4" : "#ff9ccc"} transparent opacity={0.22} depthWrite={false} blending={THREE.NormalBlending} />
    </mesh>
  );
}

function SignalGlint({ position, index }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const glow = 0.5 + Math.sin(clock.elapsedTime * 1.4 + index * 1.13) * 0.5;
    ref.current.material.opacity = 0.05 + glow * glow * 0.27;
    ref.current.scale.setScalar(0.72 + glow * 0.52);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.015, 10, 10]} />
      <meshBasicMaterial color={index % 2 === 0 ? "#ffe2f2" : "#ff8cc4"} transparent opacity={0.18} depthWrite={false} blending={THREE.NormalBlending} />
    </mesh>
  );
}

function NodePoint({ label, position }) {
  return (
    <group position={position}>
      <LabelSprite label={label} position={[0, 0, 0]} />
    </group>
  );
}

function BuckyballScene({ labels }) {
  const groupRef = useRef();
  const { points, edges, pulseEdges } = useMemo(() => createBuckyballTopology(), []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.011 + pointer.x * 0.035;
    groupRef.current.rotation.x = -0.14 + pointer.y * 0.028;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.02) * 0.009;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <ConnectionCloud points={points} edges={edges} />
      {pulseEdges.map((edgeIndex, index) => {
        const [start, end] = edges[edgeIndex];
        return <DataPulse key={`pulse-${edgeIndex}`} start={points[start]} end={points[end]} offset={index / pulseEdges.length} />;
      })}
      {STAR_POINTS.map((point, index) => (
        <StarSpeck key={`star-${index}`} position={point} index={index} />
      ))}
      {SPARK_POINTS.map((point, index) => (
        <SignalGlint key={`glint-${index}`} position={point} index={index} />
      ))}
      {points.map((point, index) => (
        <NodePoint key={`node-${index}`} label={labels[index % labels.length]} position={point} />
      ))}
    </group>
  );
}

function HeroBuckyballGraph() {
  const normalizedLabels = DATA_LABELS;

  return (
    <div className="hero-buckyball" aria-hidden="true">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.04, 5.6], fov: 43 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.36} />
        <pointLight position={[2.8, 2.4, 3.6]} intensity={1.35} color="#ff8cc4" />
        <pointLight position={[-2.2, -1.2, 2.8]} intensity={1.05} color="#ff8cc4" />
        <spotLight position={[0.2, 2.6, 4.2]} angle={0.46} penumbra={0.72} intensity={0.92} color="#c7a7ff" />
        <BuckyballScene labels={normalizedLabels} />
      </Canvas>
    </div>
  );
}

export default React.memo(HeroBuckyballGraph);
