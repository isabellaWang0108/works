// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// function FloatingNetwork() {
//   const nodesRef = useRef([]);
//   const linesRef = useRef([]);

//   // Define fixed node positions
//   const positions = useMemo(() => [
//     new THREE.Vector3(-10, 0, 0),
//     new THREE.Vector3(-2, 6, 0),
//     new THREE.Vector3(-6, -6, 0),
//   ], []);

//   // Define edges by index pairs
//   const links = useMemo(() => [
//     [0, 1], [1, 2], [2, 3], [0, 2]
//   ], []);

//   // Store animation parameters per node
//   const floatParams = useMemo(() => positions.map(() => ({
//     speed: 0.5 + Math.random(),
//     amplitude: 0.3 + Math.random() * 0.2,
//     phase: Math.random() * Math.PI * 2
//   })), [positions]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     // Update nodes
//     nodesRef.current.forEach((mesh, i) => {
//       if (!mesh) return;
//       const base = positions[i];
//       const { speed, amplitude, phase } = floatParams[i];
//       mesh.position.set(base.x, base.y + Math.sin(t * speed + phase) * amplitude, base.z);
//     });

//     // Update lines to match floating nodes
//     linesRef.current.forEach((line, i) => {
//       const [startIdx, endIdx] = links[i];
//       const start = nodesRef.current[startIdx]?.position;
//       const end = nodesRef.current[endIdx]?.position;
//       if (start && end && line) {
//         line.geometry.setFromPoints([start, end]);
//         line.geometry.verticesNeedUpdate = true;
//       }
//     });
//   });

//   return (
//     <>
//       {/* Nodes */}
//       {positions.map((pos, i) => (
//         <mesh
//           key={i}
//           ref={el => nodesRef.current[i] = el}
//           position={pos}
//         >
//           <sphereGeometry args={[0.5, 16, 16]} />
//           <meshBasicMaterial color="white" />
//         </mesh>
//       ))}

//       {/* Links */}
//       {links.map(([i, j], idx) => (
//         <line
//           key={idx}
//           ref={el => linesRef.current[idx] = el}
//         >
//           <bufferGeometry />
//           <lineBasicMaterial color="#888888" />
//         </line>
//       ))}
//     </>
//   );
// }

// export default function Animation3D() {
//   return (
//     <>

//       <ambientLight />
//       <FloatingNetwork />
//     </>

//   );
// }


// Old animation
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


