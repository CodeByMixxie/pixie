function ClothingCard({ item }) {
  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: 'var(--berry-good)',
      aspectRatio: '3/4',
      position: 'relative',
    }}>
      <img
        src={item.preview}
        alt={item.category}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '0.5rem',
        backgroundColor: 'rgba(87, 85, 39, 0.4)',
        backdropFilter: 'blur(4px)',
      }}>
        <p style={{
          color: 'var(--warm-fog)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {item.category}
        </p>
      </div>
    </div>
  )
}

export default ClothingCard