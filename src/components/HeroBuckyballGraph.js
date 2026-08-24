import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DATA_LABELS = ["UX", "UI", "DATA", "B2B", "B2C", "AI", "OPS", "Technology", "CS", "ML", "Design"];

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
];

const PULSE_EDGES = [1, 8, 21, 24, 31, 39, 42];

function makeLabelTexture(label) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = label.length > 4 ? 260 : 160;
  const height = 72;

  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  context.font = "600 24px Courier, monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = "rgba(252, 34, 147, 0.55)";
  context.shadowBlur = 16;
  context.fillStyle = "rgba(255, 245, 251, 0.92)";
  context.fillText(label.toUpperCase(), width / 2, height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function LabelSprite({ label, position }) {
  const texture = useMemo(() => makeLabelTexture(label), [label]);
  const width = label.length > 4 ? 0.72 : 0.44;

  return (
    <sprite position={position} scale={[width, 0.2, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.78} depthWrite={false} />
    </sprite>
  );
}

function Connection({ start, end, variant }) {
  const lineRef = useRef();
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints([start, end]), [start, end]);
  const color = variant === "outer" ? "#fff1f8" : variant === "inner" ? "#ff8cc4" : "#91bdff";
  const opacity = variant === "outer" ? 0.32 : variant === "inner" ? 0.22 : 0.13;

  React.useEffect(() => {
    lineRef.current?.computeLineDistances();
  }, []);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial
        color={color}
        transparent
        opacity={opacity}
        dashSize={0.045}
        gapSize={0.055}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

function DataPulse({ start, end, offset }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.18 + offset) % 1;
    ref.current.position.lerpVectors(start, end, t);
    const scale = 0.65 + Math.sin(t * Math.PI) * 0.38;
    ref.current.scale.setScalar(scale);
    ref.current.material.opacity = 0.12 + Math.sin(t * Math.PI) * 0.78;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 16, 16]} />
      <meshBasicMaterial color="#fff4fb" transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function NodePoint({ label, position, index }) {
  const ref = useRef();

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.4 + index * 0.62) * 0.08;
    const cursorLift = 1 + Math.max(0, 1 - Math.hypot(pointer.x, pointer.y)) * 0.08;
    ref.current.scale.setScalar(pulse * cursorLift);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshStandardMaterial
          color="#fff2f8"
          emissive="#fc2293"
          emissiveIntensity={0.52}
          roughness={0.34}
          metalness={0.18}
        />
      </mesh>
      <LabelSprite label={label} position={[0, 0.12, 0.02]} />
    </group>
  );
}

function BuckyballScene({ labels }) {
  const groupRef = useRef();
  const points = useMemo(() => NODE_COORDS.map((point) => new THREE.Vector3(...point)), []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.105 + pointer.x * 0.08;
    groupRef.current.rotation.x = -0.18 + pointer.y * 0.04;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.035;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.72, 48, 48]} />
        <meshBasicMaterial color="#fc2293" transparent opacity={0.025} depthWrite={false} />
      </mesh>
      {EDGES.map(([start, end, variant], index) => (
        <Connection key={`edge-${index}`} start={points[start]} end={points[end]} variant={variant} />
      ))}
      {PULSE_EDGES.map((edgeIndex, index) => {
        const [start, end] = EDGES[edgeIndex];
        return <DataPulse key={`pulse-${edgeIndex}`} start={points[start]} end={points[end]} offset={index / PULSE_EDGES.length} />;
      })}
      {points.map((point, index) => (
        <NodePoint key={`node-${index}`} label={labels[index % labels.length]} position={point} index={index} />
      ))}
    </group>
  );
}

function HeroBuckyballGraph({ labels = DATA_LABELS }) {
  return (
    <div className="hero-buckyball" aria-hidden="true">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.04, 5.6], fov: 43 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[2.8, 2.4, 3.6]} intensity={1.8} color="#ff8cc4" />
        <pointLight position={[-2.2, -1.2, 2.8]} intensity={0.95} color="#91bdff" />
        <BuckyballScene labels={labels} />
      </Canvas>
    </div>
  );
}

export default React.memo(HeroBuckyballGraph);
