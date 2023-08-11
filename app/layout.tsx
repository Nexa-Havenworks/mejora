import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { NavBar } from '@/components/layout/navbar'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600']
})

export const metadata: Metadata = {
    title: 'Mejora',
    description: 'Unlock Mentorship success'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
            </head>
            <body className={`${poppins.className} mx-auto max-w-7xl px-4 py-8 subpixel-antialiased sm:px-8 md:px-12`}>
                <NavBar />
                {children}
            </body>
        </html>
    )
}
