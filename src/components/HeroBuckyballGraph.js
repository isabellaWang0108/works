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

const PULSE_EDGES = [1, 4, 8, 21, 24, 28, 31, 39, 42, 46, 52, 58, 64];

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
    .filter(([[, , variant]], index) => variant === "signal" || index % 13 === 0)
    .map(([, index]) => index)
    .slice(0, 16);

  return { points, edges, pulseEdges };
}

function makeLabelTexture(label) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = label.length > 8 ? 620 : label.length > 4 ? 500 : 340;
  const height = 190;
  const centerY = 95;

  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);

  const glow = context.createRadialGradient(width / 2, centerY, 4, width / 2, centerY, width * 0.34);
  glow.addColorStop(0, "rgba(238, 247, 255, 0.18)");
  glow.addColorStop(0.28, "rgba(122, 197, 255, 0.12)");
  glow.addColorStop(0.62, "rgba(252, 34, 147, 0.06)");
  glow.addColorStop(0.84, "rgba(173, 143, 255, 0.03)");
  glow.addColorStop(1, "rgba(122, 197, 255, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  const gradient = context.createLinearGradient(width * 0.18, centerY - 22, width * 0.82, centerY + 18);
  gradient.addColorStop(0, "rgba(247, 251, 255, 0.94)");
  gradient.addColorStop(0.5, "rgba(190, 220, 255, 0.88)");
  gradient.addColorStop(1, "rgba(255, 154, 209, 0.82)");

  context.font = "400 30px SuisseIntl-Regular, Inter, Helvetica Neue, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = "1.4px";
  context.lineWidth = 1.8;
  context.strokeStyle = "rgba(5, 7, 13, 0.72)";
  context.shadowColor = "rgba(116, 196, 255, 0.34)";
  context.shadowBlur = 8;
  context.strokeText(label, width / 2, centerY);
  context.fillStyle = gradient;
  context.fillText(label, width / 2, centerY);

  context.shadowBlur = 4;
  context.strokeStyle = "rgba(122, 197, 255, 0.2)";
  context.lineWidth = 1.1;
  context.beginPath();
  context.moveTo(width * 0.32, centerY + 27);
  context.lineTo(width * 0.68, centerY + 27);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
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
        opacity={0.82}
        depthWrite={false}
        depthTest={false}
        blending={THREE.NormalBlending}
      />
    </sprite>
  );
}

function Connection({ start, end, variant }) {
  const color = variant === "outer" ? "#9fd3ff" : variant === "inner" ? "#b8a8ff" : variant === "signal" ? "#d6f5ff" : variant === "cross" ? "#ff9ccc" : "#7fb6ff";
  const opacity = variant === "outer" ? 0.58 : variant === "inner" ? 0.46 : variant === "signal" ? 0.54 : variant === "cross" ? 0.34 : 0.28;
  const dotSpacing = variant === "signal" ? 0.072 : variant === "cross" ? 0.095 : 0.085;
  const dotSize = variant === "signal" ? 0.01 : variant === "cross" ? 0.007 : 0.008;
  const dots = useMemo(() => {
    const distance = start.distanceTo(end);
    const dotCount = Math.max(6, Math.round(distance / dotSpacing));

    return Array.from({ length: dotCount }, (_, index) => {
      const t = (index + 1) / (dotCount + 1);
      return start.clone().lerp(end, t);
    });
  }, [dotSpacing, start, end]);

  return (
    <group>
      {dots.map((position, index) => (
        <mesh key={`${variant}-${index}`} position={position}>
          <sphereGeometry args={[dotSize, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataPulse({ start, end, offset }) {
  const ref = useRef();
  const coreRef = useRef();
  const glowRef = useRef();
  const headRef = useRef();
  const headGlowRef = useRef();
  const direction = useMemo(() => end.clone().sub(start).normalize(), [start, end]);
  const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction), [direction]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.28 + offset) % 1;
    const tail = Math.max(0, t - 0.22);
    const pulseStart = start.clone().lerp(end, tail);
    const pulseEnd = start.clone().lerp(end, t);
    const midpoint = pulseStart.clone().add(pulseEnd).multiplyScalar(0.5);
    const length = Math.max(0.001, pulseStart.distanceTo(pulseEnd));
    const headY = length / 2;
    const shimmer = 0.9 + Math.sin(clock.elapsedTime * 3.2 + offset * 8) * 0.04;

    ref.current.position.copy(midpoint);
    ref.current.quaternion.copy(quaternion);
    coreRef.current?.scale.set(1, length, 1);
    glowRef.current?.scale.set(1, length, 1);
    if (headRef.current) {
      headRef.current.position.set(0, headY, 0);
      headRef.current.scale.setScalar(shimmer);
    }
    if (headGlowRef.current) {
      headGlowRef.current.position.set(0, headY, 0);
      headGlowRef.current.scale.setScalar(shimmer);
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={glowRef}>
        <cylinderGeometry args={[0.016, 0.002, 1, 12]} />
        <meshBasicMaterial color="#9fd3ff" transparent opacity={0.13} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.0065, 0.0012, 1, 12]} />
        <meshBasicMaterial color="#d6f5ff" transparent opacity={0.54} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={headGlowRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#9fd3ff" transparent opacity={0.14} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={headRef}>
        <sphereGeometry args={[0.013, 16, 16]} />
        <meshBasicMaterial color="#f2fbff" transparent opacity={0.66} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function StarSpeck({ position, index }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.12 + Math.max(0, Math.sin(clock.elapsedTime * 0.9 + index * 1.7)) * 0.34;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshBasicMaterial color={index % 3 === 0 ? "#9fd3ff" : "#ff9ccc"} transparent opacity={0.16} depthWrite={false} blending={THREE.NormalBlending} />
    </mesh>
  );
}

function SignalGlint({ position, index }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const glow = 0.5 + Math.sin(clock.elapsedTime * 1.4 + index * 1.13) * 0.5;
    ref.current.material.opacity = 0.03 + glow * glow * 0.2;
    ref.current.scale.setScalar(0.72 + glow * 0.52);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.015, 10, 10]} />
      <meshBasicMaterial color={index % 2 === 0 ? "#d6f5ff" : "#b8a8ff"} transparent opacity={0.13} depthWrite={false} blending={THREE.NormalBlending} />
    </mesh>
  );
}

function NodePoint({ label, position, index }) {
  const ref = useRef();

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.1 + index * 0.62) * 0.045;
    const cursorLift = 1 + Math.max(0, 1 - Math.hypot(pointer.x, pointer.y)) * 0.06;
    ref.current.scale.setScalar(pulse * cursorLift);
  });

  return (
    <group ref={ref} position={position}>
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
      {edges.map(([start, end, variant], index) => (
        <Connection key={`edge-${index}`} start={points[start]} end={points[end]} variant={variant} />
      ))}
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
        <NodePoint key={`node-${index}`} label={labels[index % labels.length]} position={point} index={index} />
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
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.36} />
        <pointLight position={[2.8, 2.4, 3.6]} intensity={1.35} color="#91bdff" />
        <pointLight position={[-2.2, -1.2, 2.8]} intensity={1.05} color="#ff8cc4" />
        <spotLight position={[0.2, 2.6, 4.2]} angle={0.46} penumbra={0.72} intensity={0.92} color="#c7a7ff" />
        <BuckyballScene labels={normalizedLabels} />
      </Canvas>
    </div>
  );
}

export default React.memo(HeroBuckyballGraph);
