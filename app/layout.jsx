import './globals.css'
import { AppProvider } from '@/components/AppContext'

export const metadata = {
  title: 'Illusio School Management System',
  description:
    'Web-first School Management System for a single school in India — frontend demo with mock data.',
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
