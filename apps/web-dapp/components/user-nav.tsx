import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function UserNav({ address, logout }: { address: string; logout: () => void }) {
    const userName = 'Alex Smith'
    function getAvatarFallback(name: string, address: string) {
        if (!name && address) {
            return address.slice(2, 4).toUpperCase()
        }

        const parts = name.split(' ').slice(0, 2)
        return parts.map(part => part.charAt(0).toUpperCase()).join('')
    }

    const fallbackText = getAvatarFallback(userName, address) // Assume userName and address are defined

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex items-center'>
                    {/* Avatar */}
                    <div className='relative h-8 w-8 rounded-full'>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage src='/avatar.webp' alt='default avatar' />
                            <AvatarFallback>{fallbackText}</AvatarFallback>
                        </Avatar>
                    </div>
                    {/* User info */}
                    <div className='w-30 ml-2 flex flex-col items-start space-y-1'>
                        <p className='text-base font-semibold'>{userName}</p>

                        {/* Address */}
                        <p className='text-muted-foreground truncate font-mono text-xs'>
                            {address && '0x' + [...address.slice(2, 6), '...', ...address.slice(-4)].join('')}
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
