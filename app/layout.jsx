import './globals.css'
import { AppProvider } from '@/components/AppContext'

export const metadata = {
  title: 'Scholr — School Management System by Finvera',
  description:
    'Scholr — a web-first School Management System for a single school in India. Admissions to analytics, in one platform. Frontend demo with mock data.',
  openGraph: {
    title: 'Scholr — School Management System',
    description: 'One platform to run your entire school — by Finvera.',
    images: ['/brand/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scholr — School Management System',
    description: 'One platform to run your entire school — by Finvera.',
    images: ['/brand/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
