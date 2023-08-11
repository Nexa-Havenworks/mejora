import Link from 'next/link'

import { Button } from '@/components/ui/button'

const menuLinks = [
    { text: 'Home', path: '/' },
    { text: 'Profile', path: '/profile/create' },
    { text: 'Governance', path: '/governance' },
    { text: 'Become a Mentor', path: '/mentor' }
]

export const NavBar = () => {
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
            <div className='flex'>
                <Button className='text-base font-semibold text-[#4542B2]' variant='ghost'>
                    Sign up
                </Button>
                <Button className='items-baseline rounded-full bg-[#4542B2] px-8 text-base font-semibold text-white'>
                    Connect
                </Button>
            </div>
        </nav>
    )
}
