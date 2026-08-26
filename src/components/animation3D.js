import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Animation3D() {
  const meshRef = useRef();

  // Reuse a single temporary Object3D for updating instance transforms.
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const gridCount = 8;
  const instanceCount = gridCount * gridCount * gridCount;

  // Create a color array with instanceCount RGB triplets.
  const colorArray = useMemo(() => {
    const array = new Float32Array(instanceCount * 3);
    const tempColor = new THREE.Color();
    const colors = ["#e8eef7", "#91bdff", "#757474", "#2d2634", "#ff8cc4"];
    for (let i = 0; i < instanceCount; i++) {
      tempColor.set(colors[Math.floor(Math.random() * colors.length)]);
      tempColor.toArray(array, i * 3);
    }
    return array;
  }, [instanceCount]);

  const instanceColorAttribute = useMemo(
    () => new THREE.InstancedBufferAttribute(colorArray, 3),
    [colorArray]
  );

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceColor = instanceColorAttribute;
    }
  }, [instanceColorAttribute]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = 2.9 + Math.sin(time / 10) * 1.1;
      meshRef.current.position.y = -0.4 + Math.sin(time / 7) * 0.45;
      meshRef.current.position.z = -1.8;
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.0014;
      meshRef.current.rotation.z += 0.00045;

      let i = 0;
      // Create a soft cube grid of points.
      for (let x = 0; x < gridCount; x++) {
        for (let y = 0; y < gridCount; y++) {
          for (let z = 0; z < gridCount; z++) {
            tempObject.position.set(
              x - gridCount / 2,
              y - gridCount / 2,
              z - gridCount / 2
            );
            const wave = Math.sin(time * 0.55 + x * 0.7 + y * 0.35 + z * 0.25);
            tempObject.position.multiplyScalar(1.42 + wave * 0.06);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i++, tempObject.matrix);
          }
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, instanceCount]}
      instanceColor={instanceColorAttribute}
    >
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color="#f2f0ed" transparent opacity={0.62} roughness={0.76} />
    </instancedMesh>
  );
}

export default Animation3D;
