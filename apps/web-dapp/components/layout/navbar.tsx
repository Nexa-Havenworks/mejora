'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'

const menuLinks = [
    { text: 'Home', path: '/' },
    { text: 'Profile', path: '/profile/create' },
    { text: 'Governance', path: '/governance' },
    { text: 'Become a Mentor', path: '/mentor' }
]

export const NavBar = () => {
    const LoginDynamic = dynamic(() => import('@/components/web3login').then(module => module.Web3Login), {
        loading: () => <Spinner />,
        ssr: false
    })

    return (
        <nav className='mb-8 flex items-baseline justify-between'>
            <ul className='flex space-x-8'>
                {menuLinks.map(link => {
                    return (
                        <li key={link.text}>
                            <Link href={link.path}>{link.text}</Link>
                        </li>
                    )
                })}
            </ul>

            <Suspense>
                <LoginDynamic />
            </Suspense>
        </nav>
    )
}
