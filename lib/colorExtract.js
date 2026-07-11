// Extract a dominant-colour palette from an image (data URL) using a canvas.
// Browser-only. Returns a Promise of hex strings, most prominent first.

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function dist(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b)
}

export function extractPalette(src, max = 5) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const size = 64
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0, size, size)
      let data
      try {
        data = ctx.getImageData(0, 0, size, size).data
      } catch (e) {
        reject(e)
        return
      }

      const buckets = new Map()
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
        if (a < 125) continue // skip transparent
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
        if (mx > 244 && mn > 244) continue // skip near-white
        if (mx < 14) continue // skip near-black
        const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
        const e = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 }
        e.r += r; e.g += g; e.b += b; e.n++
        buckets.set(key, e)
      }

      let colors = [...buckets.values()].map((e) => {
        const r = Math.round(e.r / e.n), g = Math.round(e.g / e.n), b = Math.round(e.b / e.n)
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
        const sat = mx === 0 ? 0 : (mx - mn) / mx
        return { r, g, b, n: e.n, score: e.n * (0.45 + sat) }
      })
      colors.sort((a, b) => b.score - a.score)

      // De-duplicate visually-similar colours.
      const picked = []
      for (const c of colors) {
        if (picked.every((p) => dist(p, c) > 60)) picked.push(c)
        if (picked.length >= max) break
      }
      if (picked.length === 0) { resolve(['#4f46e5']); return }
      resolve(picked.map((c) => rgbToHex(c.r, c.g, c.b)))
    }
    img.onerror = reject
    img.src = src
  })
}

// Lighten a hex toward white by amt (0..1) — for a gradient partner colour.
export function lighten(hex, amt = 0.22) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const m = (c) => Math.round(c + (255 - c) * amt)
  return rgbToHex(m(r), m(g), m(b))
}
