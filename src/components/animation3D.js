import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Animation3D() {
  const meshRef = useRef();

  // Reuse a single temporary Object3D for updating instance transforms.
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Use a cube grid of 8 x 8 x 8 for a perfect cube (512 instances).
  const gridCount = 8;
  const instanceCount = gridCount * gridCount * gridCount;

  // Create a color array with instanceCount RGB triplets.
  const colorArray = useMemo(() => {
    const array = new Float32Array(instanceCount * 3);
    const tempColor = new THREE.Color();
    const colors = ["#DBDBDB", "#757474", "#757474", "#161219", "#FF8CC4"];
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
      // Update overall mesh position and rotation.
      meshRef.current.position.x = Math.sin(time / 8) * 2;
      meshRef.current.position.y = Math.sin(time / 2);
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.002;

      let i = 0;
      // Create an 8x8x8 cube grid.
      for (let x = 0; x < gridCount; x++) {
        for (let y = 0; y < gridCount; y++) {
          for (let z = 0; z < gridCount; z++) {
            // Center the grid by subtracting half the gridCount.
            tempObject.position.set(
              x - gridCount / 2,
              y - gridCount / 2,
              z - gridCount / 2
            );
            // Optionally, scale the positions based on time.
            tempObject.position.multiplyScalar(Math.sin(time) / 10 + 1.6);
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
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="white" />
    </instancedMesh>
  );
}

export default Animation3D;