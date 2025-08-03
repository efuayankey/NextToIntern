import './globals.css'

export const metadata = {
  title: 'NextToIntern - Lehigh University',
  description: 'Connect, prepare, and succeed in your internship journey with fellow Lehigh students.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}