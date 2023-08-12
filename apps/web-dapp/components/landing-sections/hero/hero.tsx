import Image from 'next/image'

import { HeroBadges } from './hero-badges'
import { HeroSearch } from './hero-search'

export const Hero = () => {
    return (
        <section className='flex items-center space-x-10'>
            <div className='flex w-1/2 flex-col space-y-4 overflow-hidden'>
                <h1 className='mb-6 font-semibold leading-[120%] sm:text-3xl md:text-4xl lg:text-5xl'>
                    Unlock <span className='text-[#4542B2]'>Mentorship</span> success with Mejora
                </h1>
                <h2 className='mb-6 leading-[120%] sm:text-lg md:text-xl lg:text-2xl'>
                    A platform encompassing community, industry, and global betterment
                </h2>
                <HeroSearch />
                <HeroBadges />
            </div>
            <div className='w-1/2 min-w-[275px]'>
                <Image src='/hero.svg' alt='hero image' height='517' width='550' priority />
            </div>
        </section>
    )
}
