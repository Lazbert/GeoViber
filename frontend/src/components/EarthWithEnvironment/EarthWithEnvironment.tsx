/*
Huge shoutout to the GitHub repo bobbyroe/earth-with-react-three-fiber for the skeleton of the Earth
with hands-on tutorial on https://www.youtube.com/watch?v=LDKlZmAqpHw.

Refactored some of the code and styled the container to fit the rest of the design.
For some reasons, the hemisphereLight and directionalLight do not make a difference to the final mesh
*/

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { 
    DEFAULT_SUN_DIRECTION,
    EARTH_VERTEX_SHADER,
    EARTH_FRAGMENT_SHADER,
    earthRadius,
    FRESNEL_VERTEX_SHADER,
    FRESNEL_FRAGMENT_SHADER,
    fresnelRimHex,
    fresnelFacingHex,
} from "@/const";
import NebulaBackground from "./NebulaBackground";
import Starfield from "./Starfield";

// get the sun
const sunDirection = new THREE.Vector3(
    DEFAULT_SUN_DIRECTION.x,
    DEFAULT_SUN_DIRECTION.y,
    DEFAULT_SUN_DIRECTION.z
).normalize();

const getEarthMaterial = () => {
    // load textures
    const map = useLoader(
        THREE.TextureLoader, 
        "./textures/earth-daymap-4k.jpg"
    );
    const nightMap = useLoader(
        THREE.TextureLoader,
        "./textures/earth-nightmap-4k.jpg"
    );
    const cloudsMap = useLoader(
        THREE.TextureLoader,
        "./textures/earth-clouds-4k.jpg"
    );

    const uniforms = {
        dayTexture: { value: map },
        nightTexture: { value: nightMap },
        cloudsTexture: { value: cloudsMap },
        sunDirection: { value: sunDirection },
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: EARTH_VERTEX_SHADER,
        fragmentShader: EARTH_FRAGMENT_SHADER,
    });
    return material;
}

const getFresnelShaderArgs = () => {
  const uniforms = {
    color1: { value: new THREE.Color(fresnelRimHex) },
    color2: { value: new THREE.Color(fresnelFacingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const args = {
    uniforms: uniforms,
    vertexShader: FRESNEL_VERTEX_SHADER,
    fragmentShader: FRESNEL_FRAGMENT_SHADER,
    transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,
  };

  return args;
}

const EarthMesh: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null);
    
    // when the <mesh> component renders, R3F will assign the mesh instance to this ref
    const material = useMemo(() => getEarthMaterial(), []);
    const axialTiltInRadian = 23.4 * Math.PI / 180;

    // execute code before every rendered frame - changing rotation
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
        }
    });
    
    return (
        <group rotation-z={axialTiltInRadian}>
            {/* TODO: adjust the position of the Earth with position props instead of CSS */}
            <mesh ref={ref}>
                {/* args={[radius, detail]}, treat detail like Blender's subdivisions */}
                <icosahedronGeometry args={[earthRadius, 64]} />
                
                {/* earth surface */}
                <primitive object={material} />
                
                {/* atmospheric glow */}
                <mesh>
                    <icosahedronGeometry args={[earthRadius + 0.03, 32]} />
                    <shaderMaterial {...getFresnelShaderArgs()} />
                </mesh>
            </mesh>
        </group>
    )
}

const EarthWithEnvironment: React.FC = () => {
    return (
        <Canvas
            style={{ position: "absolute", inset: 0, left: "26%" }}
            gl={{ toneMapping: THREE.NoToneMapping }}
        >
            <EarthMesh />
            <NebulaBackground />
            <Starfield />
            <OrbitControls />  {/* allow interactions with the 3D mesh */}
        </Canvas>
    );
}

export default EarthWithEnvironment;