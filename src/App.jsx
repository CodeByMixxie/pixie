import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import HomePage from './components/HomePage'
import SavedFits from './components/SavedFits'
import TabBar from './components/TabBar'

function App() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div>
      {!started ? (
        <WelcomeScreen onReady={() => setStarted(true)} />
      ) : (
        <>
          {activeTab === 'home' ? <HomePage /> : <SavedFits />}
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  )
}

export default App