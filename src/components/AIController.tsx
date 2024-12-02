import { useState, useEffect, useCallback } from 'react'

type AIState = {
  currentAction: string
  dialogue: string
  timestamp: number
}

export default function AIController({ onStateChange }: { onStateChange: (state: string) => void }) {
  const [aiState, setAiState] = useState<AIState>({
    currentAction: 'idle',
    dialogue: '',
    timestamp: Date.now()
  })

  // Function to generate speech using browser's Web Speech API
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  // Function to update AI state based on time of day and previous actions
  const updateAIState = useCallback(async () => {
    try {
      // Simulate AI response for now - this would be replaced with actual API call
      const actions = ['kneading', 'cleaning', 'walking', 'idle']
      const dialogues = [
        "I'm kneading this dough to make fresh bread.",
        "Time to clean up the bakery!",
        "Let me check on the ovens.",
        "Just taking a moment to rest."
      ]
      
      const randomIndex = Math.floor(Math.random() * actions.length)
      const newState: AIState = {
        currentAction: actions[randomIndex],
        dialogue: dialogues[randomIndex],
        timestamp: Date.now()
      }

      setAiState(newState)
      onStateChange(newState.currentAction)
      speak(newState.dialogue)
    } catch (error) {
      console.error('Error updating AI state:', error)
    }
  }, [speak, onStateChange])

  // Update AI state periodically
  useEffect(() => {
    const interval = setInterval(updateAIState, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [updateAIState])

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      maxWidth: '80%',
      textAlign: 'center'
    }}>
      <p>{aiState.dialogue}</p>
    </div>
  )
} 