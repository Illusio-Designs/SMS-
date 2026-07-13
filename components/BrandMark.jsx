'use client'

// Illusio SMS brand mark. `BrandGlyph` is the white mortarboard for use inside
// the themed gradient containers (sidebar/login). `BrandMark` is the full
// self-contained badge (fixed brand colours) for standalone use.

export function BrandGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M196 250 L316 250 L316 300 Q316 334 256 334 Q196 334 196 300 Z" fill="#ffffff" opacity="0.72" />
      <path d="M256 150 L406 214 L256 278 L106 214 Z" fill="#ffffff" />
      <circle cx="256" cy="214" r="14" fill="rgba(15,18,40,0.22)" />
      <path d="M406 214 L406 308" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
      <circle cx="406" cy="322" r="16" fill="#10B981" />
    </svg>
  )
}

export function BrandMark({ size = 44, radius = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Illusio SMS">
      <defs>
        <linearGradient id="bm-g" x1="40" y1="40" x2="472" y2="472" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx={radius * (512 / size)} fill="url(#bm-g)" />
      <path d="M196 250 L316 250 L316 300 Q316 334 256 334 Q196 334 196 300 Z" fill="#C7C9F7" />
      <path d="M256 150 L406 214 L256 278 L106 214 Z" fill="#ffffff" />
      <circle cx="256" cy="214" r="14" fill="#4F46E5" />
      <path d="M406 214 L406 308" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
      <circle cx="406" cy="322" r="16" fill="#10B981" />
    </svg>
  )
}
