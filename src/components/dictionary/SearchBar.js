'use client';

export default function SearchBar({ value, onChange, placeholder = 'Search products…' }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="search"
        className="input input-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        spellCheck={false}
        // Extend right padding when clear button is visible
        style={value ? { paddingRight: '2.5rem' } : undefined}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1,
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ×
        </button>
      )}
    </div>
  );
}
