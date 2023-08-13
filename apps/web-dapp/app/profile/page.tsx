import Worldcoin from '@/components/worldcoin'

const WORLDCOIN_APP_ID = process.env.WORLDCOIN_APP_ID as string

export default function Profile() {
    return (
        <div className='flex h-full w-full items-center justify-center bg-red-500'>
            <Worldcoin appId={WORLDCOIN_APP_ID} />
        </div>
    )
}
