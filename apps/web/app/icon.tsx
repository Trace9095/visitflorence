import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Compass favicon — antique brass on dark bg (Visit Florence brand)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#14110E',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {/* Compass ring */}
          <circle cx="11" cy="11" r="9.5" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
          {/* North arrow (gold, pointing up) */}
          <path d="M11 3 L13.5 9.5 L11 8 L8.5 9.5 Z" fill="#C9A96E" />
          {/* South arrow (dim) */}
          <path d="M11 19 L8.5 12.5 L11 14 L13.5 12.5 Z" fill="#C9A96E" fillOpacity="0.4" />
          {/* East arrow (dim) */}
          <path d="M19 11 L12.5 8.5 L14 11 L12.5 13.5 Z" fill="#C9A96E" fillOpacity="0.4" />
          {/* West arrow (dim) */}
          <path d="M3 11 L9.5 13.5 L8 11 L9.5 8.5 Z" fill="#C9A96E" fillOpacity="0.4" />
          {/* Center pivot */}
          <circle cx="11" cy="11" r="1.5" fill="#C9A96E" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
