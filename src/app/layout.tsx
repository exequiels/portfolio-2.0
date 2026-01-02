import type { Metadata } from 'next'
import './globals.css'
import 'primereact/resources/themes/mira/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export const metadata: Metadata = {
  title: 'Exequiel Sabatié - Portfolio',
  description:
    'My personal portfolio website showcasing my projects and skills.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
