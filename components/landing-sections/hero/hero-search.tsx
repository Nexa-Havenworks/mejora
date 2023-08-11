import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const HeroSearch = () => {
    return (
        <div className='flex flex-row items-center rounded-full border-2 bg-white px-2 py-1'>
            <MagnifyingGlassIcon className='ml-1 h-8 w-8' />
            <Input
                className='grow border-none bg-transparent placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent'
                placeholder='Search by community, role, or keyword'
                type='text'
            />
            <Button className='m-0.5 rounded-full bg-[#4542B2] px-8 text-base font-semibold text-white'>Search</Button>
        </div>
    )
}
