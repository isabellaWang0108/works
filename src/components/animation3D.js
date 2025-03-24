import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

function Animation3D() {
  const meshRef = useRef();

  // Create a color array of 1000 RGB triplets
  const colorArray = useMemo(() => {
    const array = new Float32Array(1000 * 3);
    const tempColor = new THREE.Color();
    const colors = ["#DBDBDB", "#757474", "#757474", "#161219", "#FF8CC4"];
    for (let i = 0; i < 1000; i++) {
      // Pick a random color and copy its components into the array
      tempColor.set(colors[Math.floor(Math.random() * colors.length)]);
      tempColor.toArray(array, i * 3);
    }
    return array;
  }, []);

  const instanceColorAttribute = useMemo(
    () => new THREE.InstancedBufferAttribute(colorArray, 3),
    [colorArray]
  );

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);
    }
  }, [colorArray]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Update the overall mesh position and rotation
      meshRef.current.position.x = Math.sin(time / 8) * 2;
      meshRef.current.position.y = Math.sin(time / 2);
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.002;

      let i = 0;
      const tempObject = new THREE.Object3D();
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          for (let z = 0; z < 10; z++) {
            tempObject.position.set(5 - x, 5 - y, 5 - z);
            tempObject.position.multiplyScalar(Math.sin(time) / 10 + 1.2);
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
      args={[null, null, 1000]}
    instanceColor={instanceColorAttribute} // Pass color array directly here
    >
      <sphereGeometry args={[0.3, 30, 30]} />
      <meshStandardMaterial color="white" />
    </instancedMesh>
  );
}

export default Animation3D;