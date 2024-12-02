import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
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

type AnimationState = 'idle' | 'kneading' | 'walking' | 'cleaning'

// Map animation states to their respective GLB files
const animationFiles = {
  idle: '/baker.glb',
  kneading: '/baker-kneading.glb',
  walking: '/baker-walking.glb',
  cleaning: '/baker-cleaning.glb'
}

export default function MultiModelScene() {
  const group = useRef<THREE.Group>(null)
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>('idle')
  
  // Load all models
  const models = Object.entries(animationFiles).reduce((acc, [key, path]) => {
    acc[key] = useGLTF(path) as GLTFResult
    return acc
  }, {} as Record<string, GLTFResult>)

  // Get current model and its animations
  const currentModel = models[currentAnimation]
  const { actions, names } = useAnimations(currentModel.animations, group)

  // Handle animation changes
  useEffect(() => {
    if (actions && names.length > 0) {
      const action = actions[names[0]]
      action?.reset().fadeIn(0.5).setLoop(THREE.LoopRepeat, Infinity).play()
    }
  }, [currentAnimation, actions, names])

  // Demo: Cycle through animations
  useEffect(() => {
    const animationStates: AnimationState[] = ['idle', 'kneading', 'walking', 'cleaning']
    const interval = setInterval(() => {
      setCurrentAnimation(prev => {
        const currentIndex = animationStates.indexOf(prev)
        const nextIndex = (currentIndex + 1) % animationStates.length
        return animationStates[nextIndex]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Baker model */}
      <group ref={group} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <primitive object={currentModel.nodes.Scene} />
      </group>

      {/* Animation state indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'Arial'
      }}>
        Current Animation: {currentAnimation}
      </div>
    </>
  )
}

// Preload all models
Object.values(animationFiles).forEach(path => useGLTF.preload(path)) 