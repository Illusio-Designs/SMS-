/** @type {import('next').NextConfig} */

// Each school's Scholr instance is served under a `/school` path, so a school
// can keep its own website at the domain root and open the portal at
// e.g. https://sunrise.com/school (and /school/login, /school/dashboard, …).
// Override per deployment with BASE_PATH="" to serve at the domain root.
const basePath = process.env.BASE_PATH ?? '/school'

const nextConfig = {
  reactStrictMode: true,
  basePath: basePath || undefined,
  transpilePackages: ['@hugeicons/react', '@hugeicons/core-free-icons'],
}

export default nextConfig
