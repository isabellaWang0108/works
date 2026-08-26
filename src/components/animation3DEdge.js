import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Animation3DEdge() {
    const meshRef = useRef();
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    const gridCount = 5;
    const instanceCount = gridCount * gridCount * gridCount;

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
            const t = time / 18;
            const cosT = Math.cos(t);
            const sinT = Math.sin(t);
            const n = 0.65;
            meshRef.current.position.x = 9 * Math.sign(cosT) * Math.pow(Math.abs(cosT), n);
            meshRef.current.position.y = 6 * Math.sign(sinT) * Math.pow(Math.abs(sinT), n);
            meshRef.current.position.z = -5;

            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.0012;

            let i = 0;
            for (let x = 0; x < gridCount; x++) {
                for (let y = 0; y < gridCount; y++) {
                    for (let z = 0; z < gridCount; z++) {
                        tempObject.position.set(
                            x - gridCount / 2,
                            y - gridCount / 2,
                            z - gridCount / 2
                        );
                        const wave = Math.sin(time * 0.45 + x * 0.8 + y * 0.4 + z * 0.25);
                        tempObject.position.multiplyScalar(1.1 + wave * 0.04);
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
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#f2f0ed" transparent opacity={0.48} roughness={0.85} />
        </instancedMesh>
    );
}

export default Animation3DEdge;
