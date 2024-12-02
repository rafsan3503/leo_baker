import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material | THREE.MeshStandardMaterial
  }
}

export default function Scene() {
  const group = useRef<THREE.Group>(null)
  const studioGroup = useRef<THREE.Group>(null)

  // Load the models
  const gltf = useGLTF('/baker.glb') as GLTFResult
  const studioGltf = useGLTF('/studio.glb') as GLTFResult
  const { nodes, materials, animations } = gltf
  const { actions, names } = useAnimations(animations, group)

  // Adjust materials
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach(material => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = 0.8
          material.metalness = 0.1
          material.envMapIntensity = 1
        }
      })
    }
  }, [materials])

  // Start animation when component mounts
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      const action = actions[names[0]]
      action?.reset()
        .setLoop(THREE.LoopRepeat, Infinity)
        .play()
    }
  }, [actions, names])

  return (
    <>
      {/* Enhanced Lighting for better skin rendering */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Key light for skin */}
      <pointLight position={[2, 2, 2]} intensity={0.4} color="#fff1e6" />
      {/* Fill light */}
      <pointLight position={[-2, 1, -1]} intensity={0.2} color="#ffd1b3" />
      {/* Rim light */}
      <pointLight position={[-1, 3, -2]} intensity={0.3} color="#ffffff" />

      {/* Studio model */}
      <group ref={studioGroup} position={[0, -0.5, -3]} scale={[0.8, 0.8, 0.8]}>
        <primitive 
          object={studioGltf.scene}
          dispose={null}
          receiveShadow
        />
      </group>

      {/* Baker model with enhanced materials */}
      <group ref={group} position={[0, 2.1, 0]} scale={[1.3, 1.3, 1.3]} rotation={[0, 0, 0]}>
        <primitive 
          object={nodes.Scene} 
          dispose={null}
          castShadow
          receiveShadow
        />
      </group>
    </>
  )
}

// Preload models
useGLTF.preload(['/baker.glb', '/studio.glb'])