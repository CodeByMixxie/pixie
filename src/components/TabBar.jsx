function TabBar({ activeTab, setActiveTab }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      backgroundColor: 'var(--warm-fog)',
      borderTop: '1px solid var(--berry-good)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0.8rem 0 1.2rem',
      zIndex: 50,
    }}>
      <button
        onClick={() => setActiveTab('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontFamily: 'var(--font-sans)',
        }}>
        <span style={{ fontSize: '1.4rem' }}>🏠</span>
        <span style={{
          fontSize: '0.7rem',
          color: activeTab === 'home' ? 'var(--koubai)' : 'var(--meadow)',
          fontWeight: activeTab === 'home' ? '500' : '300',
        }}>
          home
        </span>
      </button>

      <button
        onClick={() => setActiveTab('saved')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontFamily: 'var(--font-sans)',
        }}>
        <span style={{ fontSize: '1.4rem' }}>✨</span>
        <span style={{
          fontSize: '0.7rem',
          color: activeTab === 'saved' ? 'var(--koubai)' : 'var(--meadow)',
          fontWeight: activeTab === 'saved' ? '500' : '300',
        }}>
          saved fits
        </span>
      </button>
    </div>
  )
}

export default TabBar