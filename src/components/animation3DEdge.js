import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Animation3DEdge() {
    const meshRef = useRef();
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    const gridCount = 6;
    const instanceCount = gridCount * gridCount * gridCount;

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
            // Superellipse path with reduced amplitude so the cluster stays
            // mostly on-screen and orbits through the mid-zone between center and edge.
            const t = time / 12;
            const cosT = Math.cos(t);
            const sinT = Math.sin(t);
            const n = 0.65;
            meshRef.current.position.x = 13 * Math.sign(cosT) * Math.pow(Math.abs(cosT), n);
            meshRef.current.position.y = 9 * Math.sign(sinT) * Math.pow(Math.abs(sinT), n);
            meshRef.current.position.z = 0;

            meshRef.current.rotation.x += 0.003;
            meshRef.current.rotation.y += 0.003;

            let i = 0;
            for (let x = 0; x < gridCount; x++) {
                for (let y = 0; y < gridCount; y++) {
                    for (let z = 0; z < gridCount; z++) {
                        tempObject.position.set(
                            x - gridCount / 2,
                            y - gridCount / 2,
                            z - gridCount / 2
                        );
                        tempObject.position.multiplyScalar(Math.sin(time) / 10 + 1.3);
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
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="white" />
        </instancedMesh>
    );
}

export default Animation3DEdge;
