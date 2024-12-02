import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

export default function Studio() {
  const studioRef = useRef<THREE.Group>(null)
  const studio = useGLTF('/studio.glb') as GLTFResult

  return (
    <group ref={studioRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} rotation={[0, 0, 0]}>
      <primitive object={studio.scene} />
    </group>
  )
}

useGLTF.preload('/studio.glb') 