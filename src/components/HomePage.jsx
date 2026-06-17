import { useState, useEffect } from 'react'
import ClothingCard from './ClothingCard'
import UploadModal from './UploadModal'

const CATEGORIES = ['kurti', 'jeans', 'tops', 'shirts', 'pants', 'trousers', 'skirts']
const TOPS = ['kurti', 'tops', 'shirts']
const BOTTOMS = ['jeans', 'pants', 'trousers', 'skirts']

function HomePage() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [outfit, setOutfit] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('pixie-clothes')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const handleSave = (newItem) => {
    const updated = [...items, newItem]
    setItems(updated)
    localStorage.setItem('pixie-clothes', JSON.stringify(updated))
  }

  const handleDelete = (id) => {
    const updated = items.filter(item => item.id !== id)
    setItems(updated)
    localStorage.setItem('pixie-clothes', JSON.stringify(updated))
  }

  const generateOutfit = () => {
    const tops = items.filter(i => TOPS.includes(i.category))
    const bottoms = items.filter(i => BOTTOMS.includes(i.category))
    if (tops.length === 0 || bottoms.length === 0) {
      alert('you need at least one top and one bottom to generate an outfit!')
      return
    }
    const randomTop = tops[Math.floor(Math.random() * tops.length)]
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)]
    setOutfit({ top: randomTop, bottom: randomBottom })
  }

  const saveOutfit = () => {
    const saved = localStorage.getItem('pixie-saved-outfits')
    const existing = saved ? JSON.parse(saved) : []
    const updated = [...existing, { ...outfit, id: Date.now() }]
    localStorage.setItem('pixie-saved-outfits', JSON.stringify(updated))
    setOutfit(null)
    alert('outfit saved to your closet! 🧚')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--warm-fog)', padding: '2rem 1.5rem 6rem' }}>

      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--soldier)', fontWeight: '500', fontSize: '1.5rem' }}>
          ✨ pixie
        </h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: 'var(--koubai)',
            color: 'var(--warm-fog)',
            border: 'none',
            borderRadius: '50px',
            padding: '0.6rem 1.3rem',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
          }}>
          + upload
        </button>
      </div>

      {/* generate button */}
      {items.length > 0 && (
        <button
          onClick={generateOutfit}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--soldier)',
            color: 'var(--warm-fog)',
            border: 'none',
            borderRadius: '16px',
            fontSize: '1rem',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            marginBottom: '2rem',
            letterSpacing: '0.05em',
          }}>
          ✨ sprinkle some pixie dust
        </button>
      )}

      {/* outfit display */}
      {outfit && (
        <div style={{
          backgroundColor: 'var(--berry-good)',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--soldier)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            today's fit ✨
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <div>
              <ClothingCard item={outfit.top} />
              <p style={{ color: 'var(--soldier)', fontSize: '0.75rem', marginTop: '0.4rem' }}>{outfit.top.category}</p>
            </div>
            <div>
              <ClothingCard item={outfit.bottom} />
              <p style={{ color: 'var(--soldier)', fontSize: '0.75rem', marginTop: '0.4rem' }}>{outfit.bottom.category}</p>
            </div>
          </div>

          <p style={{ color: 'var(--soldier)', fontSize: '1rem', marginBottom: '1rem' }}>happy with this fit?</p>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={generateOutfit}
              style={{
                flex: 1, padding: '0.8rem',
                borderRadius: '50px',
                border: '1px solid var(--koubai)',
                backgroundColor: 'transparent',
                color: 'var(--koubai)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
              }}>
              regenerate 🔄
            </button>
            <button
              onClick={saveOutfit}
              style={{
                flex: 1, padding: '0.8rem',
                borderRadius: '50px',
                border: 'none',
                backgroundColor: 'var(--koubai)',
                color: 'var(--warm-fog)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
              }}>
              happy! 💛
            </button>
          </div>
        </div>
      )}

      {/* empty state */}
      {items.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p style={{ fontSize: '3rem' }}>🧺</p>
          <p style={{ color: 'var(--koubai)', marginTop: '1rem', fontSize: '1rem' }}>
            your closet is empty!
          </p>
          <p style={{ color: 'var(--meadow)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            upload your first piece to get started
          </p>
        </div>
      )}

      {/* clothing grid by category */}
      {CATEGORIES.map(cat => {
        const catItems = items.filter(item => item.category === cat)
        if (catItems.length === 0) return null
        return (
          <div key={cat} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              color: 'var(--soldier)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.8rem',
              fontWeight: '500',
            }}>
              {cat}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.8rem',
            }}>
              {catItems.map(item => (
                <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )
      })}

      {/* upload modal */}
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default HomePage