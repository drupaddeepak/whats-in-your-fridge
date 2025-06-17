import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "What's in Fridge",
  description: 'Discover recipes based on ingredients in your fridge',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
