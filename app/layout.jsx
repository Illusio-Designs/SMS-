import './globals.css'
import { AppProvider } from '@/components/AppContext'

export const metadata = {
  title: 'Scholr — School Management System by Illusio',
  description:
    'Scholr — a web-first School Management System for a single school in India. Frontend demo with mock data.',
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
