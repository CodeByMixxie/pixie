import { useState } from 'react'

const CATEGORIES = ['kurti', 'jeans', 'tops', 'shirts', 'pants', 'trousers', 'skirts']

function UploadModal({ onClose, onSave }) {
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [category, setCategory] = useState('')

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!photo || !category) return
    onSave({ id: Date.now(), preview, category })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(87, 85, 39, 0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'var(--warm-fog)',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}>

        <h2 style={{ color: 'var(--soldier)', fontWeight: '500', fontSize: '1.2rem' }}>
          add to your closet ✨
        </h2>

        {/* photo upload */}
        <div
          onClick={() => document.getElementById('fileInput').click()}
          style={{
            border: '2px dashed var(--koubai)',
            borderRadius: '12px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            backgroundColor: 'var(--berry-good)',
          }}>
          {preview
            ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <p style={{ color: 'var(--koubai)', fontSize: '0.9rem' }}>tap to upload photo 📸</p>
          }
        </div>
        <input id="fileInput" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />

        {/* category picker */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                border: '1px solid var(--koubai)',
                backgroundColor: category === cat ? 'var(--koubai)' : 'transparent',
                color: category === cat ? 'var(--warm-fog)' : 'var(--koubai)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.2s ease',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* buttons */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button
            onClick={onClose}
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
            cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: '0.8rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: (!photo || !category) ? 'var(--berry-good)' : 'var(--koubai)',
              color: 'var(--warm-fog)',
              cursor: (!photo || !category) ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
            }}>
            save ✨
          </button>
        </div>

      </div>
    </div>
  )
}

export default UploadModal