import { useState, useEffect } from 'react'
import ClothingCard from './ClothingCard'

function SavedFits() {
  const [outfits, setOutfits] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('pixie-saved-outfits')
    if (saved) setOutfits(JSON.parse(saved))
  }, [])

  const deleteOutfit = (id) => {
    const updated = outfits.filter(o => o.id !== id)
    setOutfits(updated)
    localStorage.setItem('pixie-saved-outfits', JSON.stringify(updated))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--warm-fog)', padding: '2rem 1.5rem 6rem' }}>

      <h1 style={{ color: 'var(--soldier)', fontWeight: '500', fontSize: '1.5rem', marginBottom: '2rem' }}>
        ✨ saved fits
      </h1>

      {outfits.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p style={{ fontSize: '3rem' }}>💛</p>
          <p style={{ color: 'var(--koubai)', marginTop: '1rem', fontSize: '1rem' }}>
            no saved fits yet!
          </p>
          <p style={{ color: 'var(--meadow)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            generate an outfit and click happy to save it here
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {outfits.map(outfit => (
          <div key={outfit.id} style={{
            backgroundColor: 'var(--berry-good)',
            borderRadius: '20px',
            padding: '1.2rem',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
              <div>
                <ClothingCard item={outfit.top} />
                <p style={{ color: 'var(--soldier)', fontSize: '0.75rem', marginTop: '0.4rem', textAlign: 'center' }}>
                  {outfit.top.category}
                </p>
              </div>
              <div>
                <ClothingCard item={outfit.bottom} />
                <p style={{ color: 'var(--soldier)', fontSize: '0.75rem', marginTop: '0.4rem', textAlign: 'center' }}>
                  {outfit.bottom.category}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteOutfit(outfit.id)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '50px',
                border: '1px solid var(--koubai)',
                backgroundColor: 'transparent',
                color: 'var(--koubai)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
              }}>
              remove fit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedFits