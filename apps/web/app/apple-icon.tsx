import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Apple touch icon — compass, antique brass (Visit Florence brand)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#14110E',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Outer ring */}
          <circle cx="60" cy="60" r="55" stroke="#C9A96E" strokeWidth="5" fill="none" />
          {/* Inner accent ring */}
          <circle cx="60" cy="60" r="44" stroke="#C9A96E" strokeWidth="1" fill="none" strokeOpacity="0.3" />
          {/* North arrow (gold, prominent) */}
          <path d="M60 10 L68 46 L60 40 L52 46 Z" fill="#C9A96E" />
          {/* South arrow (burgundy accent) */}
          <path d="M60 110 L52 74 L60 80 L68 74 Z" fill="#8B1A2F" />
          {/* East arrow (dim brass) */}
          <path d="M110 60 L74 52 L80 60 L74 68 Z" fill="#C9A96E" fillOpacity="0.5" />
          {/* West arrow (dim brass) */}
          <path d="M10 60 L46 68 L40 60 L46 52 Z" fill="#C9A96E" fillOpacity="0.5" />
          {/* Center jewel */}
          <circle cx="60" cy="60" r="8" fill="#C9A96E" />
          <circle cx="60" cy="60" r="4" fill="#14110E" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
