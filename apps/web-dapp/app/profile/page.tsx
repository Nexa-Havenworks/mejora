import { ProfileForm } from '@/components/forms/ProfileForm'
import Worldcoin from '@/components/worldcoin'

const WORLDCOIN_APP_ID = process.env.WORLDCOIN_APP_ID as string

export default function Profile() {
    return (
        <div>
            <h1 className='mb-8 text-5xl font-semibold'>Creating a profile</h1>
            <Worldcoin appId={WORLDCOIN_APP_ID} />
            <ProfileForm />
        </div>
    )
}
