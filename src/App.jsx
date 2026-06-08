import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import HomePage from './components/HomePage'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div>
      {!started ? (
        <WelcomeScreen onReady={() => setStarted(true)} />
      ) : (
        <HomePage />
      )}
    </div>
  )
}

export default App