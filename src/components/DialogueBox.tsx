import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function DialogueBox() {
  const [currentMessage, setCurrentMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const generateMessage = async () => {
    try {
      console.log('Generating message...')
      
      const response = await axios.post(
        'https://api.freedomgpt.com/api/generate',
        {
          prompt: `You are Leo, a baker in Astralis. Tweet about your personal life, your job, hallucinate about the secrets in the city of Astralis, and the weirdness of the Quasar universe. Don't use specific names for places, just use informal references or generalizations to the place you're talking about. Be spontaneous, witty, and a bit dark. Do not lead with 'today' or 'this morning' as pretext to your tweet, just tweet about whatever is happening to you as if it is happening to you at the present moment. Include relevant emojis and hashtags.`,
          api_key: 'fgpt-4808f58b-2c83-417d-a699-b352847cdf41',
          temperature: 0.9,
          max_tokens: 100
        }
      )

      console.log('API Response:', response.data)

      if (response.data && response.data.choices && response.data.choices[0]) {
        const message = response.data.choices[0].text.trim()
        console.log('Generated message:', message)
        setCurrentMessage(message)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error details:', error)
      setCurrentMessage("Strange lights in the bakery again... The dough seems to be glowing. Just another night shift in this quantum kitchen 🌌✨ #AstralisMystery")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('Component mounted, starting timer...')
    // Start after 2 seconds
    const startDelay = setTimeout(() => {
      setIsVisible(true)
      generateMessage()
    }, 2000)

    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    console.log('Setting up message interval...')
    // Generate new message every 15 seconds
    const messageInterval = setInterval(() => {
      generateMessage()
    }, 15000)

    return () => clearInterval(messageInterval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '15px',
      fontFamily: 'Arial',
      fontSize: '18px',
      maxWidth: '600px',
      whiteSpace: 'pre-line',
      textAlign: 'center',
      boxShadow: '0 0 20px rgba(0,255,255,0.3)',
      border: '1px solid rgba(0,255,255,0.3)',
      zIndex: 1000,
      pointerEvents: 'none',
      animation: 'fadeInOut 4s ease-in-out infinite'
    }}>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
        `}
      </style>
      {isLoading ? "Connecting to quantum stream..." : currentMessage}
    </div>
  )
} 