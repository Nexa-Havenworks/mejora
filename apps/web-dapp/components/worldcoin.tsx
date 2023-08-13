'use client'
import { IDKitWidget, useIDKit } from '@worldcoin/idkit'
import type { CredentialType } from '@worldcoin/idkit/build/src/types/index.d.ts'

import { Button } from '@/components/ui/button'

interface WorldcoinProps {
    appId: string
}

export default function Worldcoin({ appId }: WorldcoinProps) {
    const { /*open,*/ setOpen } = useIDKit()

    const onSuccess = (response: unknown) => {
        console.log('Success!', response)
        setTimeout(() => setOpen(false), 2000)
    }

    const handleVerify = (proof: unknown) => {
        console.log('Proof received:', proof)
        setTimeout(() => setOpen(false), 2000)
    }

    return (
        <IDKitWidget
            app_id={appId} // obtained from the Developer Portal
            action='verify-personhood' // this is your action name from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // optional callback when the proof is received
            credential_types={['orb', 'phone'] as CredentialType[]} // optional, defaults to ['orb']
            enableTelemetry // optional, defaults to false
        >
            {({ open }: { open: () => unknown }) => <Button onClick={open}>Verify with World ID</Button>}
        </IDKitWidget>
    )
}
