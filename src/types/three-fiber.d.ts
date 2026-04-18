import * as THREE from 'three';
import { Object3DNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
    }
  }
}

export {};
