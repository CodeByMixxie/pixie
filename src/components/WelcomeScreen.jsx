import { useState, useEffect } from 'react'

function WelcomeScreen({ onReady }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--warm-fog)',
      padding: '2rem',
      textAlign: 'center',
    }}>

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
      }}>

        <p style={{
          fontSize: '1rem',
          color: 'var(--koubai)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          fontWeight: '300',
        }}>
          ✨ pixie
        </p>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: '400',
          color: 'var(--soldier)',
          lineHeight: '1.4',
          marginBottom: '0.5rem',
          maxWidth: '400px',
        }}>
          confused on today's fit?
        </h1>

        <h2 style={{
          fontSize: '1.1rem',
          fontWeight: '300',
          color: 'var(--meadow)',
          marginBottom: '3rem',
        }}>
          a lil pixie dust always helps.
        </h2>

        <button
          onClick={onReady}
          style={{
            backgroundColor: 'var(--koubai)',
            color: 'var(--warm-fog)',
            border: 'none',
            borderRadius: '50px',
            padding: '0.9rem 2.5rem',
            fontSize: '1rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: '400',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = 'var(--soldier)'}
          onMouseLeave={e => e.target.style.backgroundColor = 'var(--koubai)'}
        >
          ready? ✨
        </button>

      </div>
    </div>
  )
}

export default WelcomeScreen