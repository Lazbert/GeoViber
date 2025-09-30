import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import {
    twinklingThreshold,
    numberOfStars,
} from "@/const";

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
      hue: Math.random() * 0.1 + 0.6  // between 0.5 - 0.7
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

export default Starfield;