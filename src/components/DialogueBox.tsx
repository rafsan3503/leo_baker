import React, { useEffect, useState } from 'react'

export default function DialogueBox() {
  const [currentVerse, setCurrentVerse] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const lyrics = [
    "Hey there, I'm Leo, your digital baker friend,\nMixing code and dough, where tradition meets trend!",
    "In my virtual kitchen, I'm cooking up a storm,\nWith pixels and flour, I'm breaking the norm!",
    "Bytes of chocolate, megabytes of fun,\nBaking in the cloud till the coding's done!",
    "Digital delights, fresh from my screen,\nThe tastiest treats you've ever seen!",
    "Virtual pastries with a high-tech twist,\nJoin the future of baking, you don't wanna miss!"
  ]

  useEffect(() => {
    const startSinging = setTimeout(() => {
      setIsPlaying(true)
      singVerse(0)
    }, 2000)

    return () => clearTimeout(startSinging)
  }, [])

  const singVerse = (verseIndex: number) => {
    if (verseIndex >= lyrics.length) {
      setIsPlaying(false)
      return
    }

    setCurrentVerse(verseIndex)

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(lyrics[verseIndex])
      utterance.rate = 0.9
      utterance.pitch = 1.1
      
      utterance.onend = () => {
        setTimeout(() => singVerse(verseIndex + 1), 500)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isPlaying) return null

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
      {lyrics[currentVerse]}
    </div>
  )
} 