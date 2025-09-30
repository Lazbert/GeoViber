import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import {
    NebulaSpriteMaterialConfigs
} from "@/const";

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

const getSprites = (): THREE.Group<THREE.Object3DEventMap> => {
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

export default NebulaBackground;