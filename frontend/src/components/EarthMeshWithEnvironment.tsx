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

import { 
    DEFAULT_SUN_DIRECTION,
    EARTH_VERTEX_SHADER,
    EARTH_FRAGMENT_SHADER,
    earthRadius,
    FRESNEL_VERTEX_SHADER,
    FRESNEL_FRAGMENT_SHADER,
    fresnelRimHex,
    fresnelFacingHex,
    NebulaSpriteMaterialConfigs,
    numberOfStars,
    twinklingThreshold,
} from "@/const";
import { useLoader } from "@react-three/fiber";

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

interface getSpriteProps extends THREE.SpriteMaterialParameters {
    path: string;
    position: THREE.Vector3;
    size: number;
}

const getSprite = ({ fog, color, opacity, path, position, size }: getSpriteProps) => {
    const textureMap = useLoader(THREE.TextureLoader, path);
  
    const spriteMaterial = new THREE.SpriteMaterial({
        color,
        fog: fog,
        map: textureMap,
        transparent: true,
        opacity,
    });
    spriteMaterial.color.offsetHSL(0, 0, Math.random() * 0.2 - 0.1);
    const sprite = new THREE.Sprite(spriteMaterial);
    
    // set sprite parameters
    sprite.position.set(position.x, -position.y, position.z);
    size += Math.random() - 0.5;
    sprite.scale.set(size, size, size);
    sprite.material.rotation = 0;
    return sprite;
}

const getSprites = () => {
    const { fog, hue, numSprites, opacity, path, radius, saturation, size, z } = NebulaSpriteMaterialConfigs;
    
    const layerGroup = Array.from({ length: numSprites }, (_, i) => i).reduce((acc, curr) => {
        // compute parameters
        const angle = (curr / numSprites) * Math.PI * 2;
        const position = new THREE.Vector3(
            Math.cos(angle) * Math.random() * radius,
            Math.sin(angle) * Math.random() * radius,
            z + Math.random()
        );
        const color = new THREE.Color().setHSL(hue, 1, saturation);
        
        // create sprite and add to group
        const sprite = getSprite({ fog, color, opacity, path, position, size });
        acc.add(sprite);
        return acc;
    }, new THREE.Group());

    return layerGroup;
}

const NebulaBackground: React.FC = () => {
    const sprites = getSprites();
    return <primitive object={sprites} />;
}

interface SpherePoint {
    position: THREE.Vector3;
    updateStar: (time: number) => number;
    minimumDistance: number;
    hue: number;
}

const getRandomSpherePoint = (): SpherePoint => {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    // random variables for light twinkling
    const twinklingRate = Math.random() * 1;
    const probabilityOfTwinkling = Math.random();
    const baseLightness = Math.random();

    const updateStar = (time: number) => {
      const updatedLightness = probabilityOfTwinkling > twinklingThreshold ? baseLightness + Math.sin(time * twinklingRate) * 1 : baseLightness;
      return updatedLightness;
    }

    return {
      position: new THREE.Vector3(x, y, z),
      updateStar,
      minimumDistance: radius,
      hue: Math.random() * 0.1 + 0.6  // bluish stars with hue between 0.5 - 0.7
    };
}

const getStars = () => {
    const starsData = Array.from({ length: numberOfStars }, (_, i) => i).reduce((acc: { vertex: number[]; colors: number[]; positions: SpherePoint[] }, _) => {
        const spherePoint = getRandomSpherePoint();
        const { position, hue } = spherePoint;

        const starColor = new THREE.Color().setHSL(hue, 0.2, Math.random());
        return {
            vertex: [...acc.vertex, position.x, position.y, position.z],
            colors: [...acc.colors, starColor.r, starColor.g, starColor.b],
            positions: [...acc.positions, spherePoint],
        };
    }, { vertex: [], colors: [], positions: []});

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsData.vertex, 3));
    bufferGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starsData.colors, 3));
  
    const starMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        map: new THREE.TextureLoader().load(
        "./circle.png"
        ),
    });
    const stars = new THREE.Points(bufferGeometry, starMaterial);
    
    
    const updateAllStars = (time: number) => {
        stars.rotation.y -= 0.0002;

        const newColors = starsData.positions.reduce((acc: number[], starData) => {
            const { updateStar } = starData;
            const updatedLightness = updateStar(time);
            const newColor = new THREE.Color().setHSL(0.6, 0.2, updatedLightness);
            return [...acc, newColor.r, newColor.g, newColor.b];
        }, []);

        bufferGeometry.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
        bufferGeometry.attributes.color.needsUpdate = true;
    }
    
    stars.userData = { updateAllStars };
    return stars;
}

const Starfield: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const points = getStars();
  
  useFrame((state) => {
    const { clock } = state;
    
    if (ref.current) {
        ref.current.userData.updateAllStars(clock.elapsedTime);
    }
  });
  
  return <primitive object={points} ref={ref}/>
}

const EarthMeshWithEnvironment: React.FC = () => {
    return (
        <Canvas
            style={{ position: "absolute", inset: 0, left: "26%" }}
            camera={{ position: [0, 0.1, 5]}}
            gl={{ toneMapping: THREE.NoToneMapping }}
        >
            <EarthMesh />
            <NebulaBackground />
            <Starfield />
            <OrbitControls />
        </Canvas>
    );
}

export default EarthMeshWithEnvironment;