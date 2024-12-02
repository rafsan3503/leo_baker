import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import Scene from './components/Scene'
import LoadingScreen from './components/LoadingScreen'
import DialogueBox from './components/DialogueBox'

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{
          position: [0, 5, 8],
          fov: 50
        }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#f0f0f0')
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="sunset" />
          <OrbitControls
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 2}
            minDistance={20}
            maxDistance={25}
            enableDamping={false}
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
      <LoadingScreen />
      <DialogueBox />
    </div>
  )
} 