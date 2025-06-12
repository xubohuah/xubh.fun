import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'leisure lab',
  description: 'leisure lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8f9fa'
      }}>
        {children}
      </body>
    </html>
  )
}
