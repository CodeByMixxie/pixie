import { useState, useEffect } from 'react'
import ClothingCard from './ClothingCard'
import UploadModal from './UploadModal'

const CATEGORIES = ['kurti', 'jeans', 'tops', 'shirts', 'pants', 'trousers', 'skirts']

function HomePage() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pixie-clothes')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const handleSave = (newItem) => {
    const updated = [...items, newItem]
    setItems(updated)
    localStorage.setItem('pixie-clothes', JSON.stringify(updated))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--warm-fog)', padding: '2rem 1.5rem' }}>

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
                <ClothingCard key={item.id} item={item} />
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