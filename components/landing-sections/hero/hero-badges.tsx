import { Badge } from '@/components/ui/badge'

const badges = ['Relationship', 'Personal development', 'Web3', 'Frontend', 'Soft skills', 'UX design', 'Communication']

export const HeroBadges = () => {
    return (
        <div className='flex space-x-0.5 overflow-hidden'>
            {badges.map(badge => (
                <Badge className='whitespace-nowrap bg-[#F7F6FD] text-xs font-normal text-[#4E4D93]' key={badge}>
                    {badge}
                </Badge>
            ))}
        </div>
    )
}
