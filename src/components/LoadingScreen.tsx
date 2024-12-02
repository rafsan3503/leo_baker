import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
  const { progress } = useProgress()
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: progress === 100 ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5em',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      Loading... {progress.toFixed(0)}%
    </div>
  )
} 