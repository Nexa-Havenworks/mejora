'use client'
import { ChainId } from '@biconomy/core-types'
import SmartAccount from '@biconomy/smart-account'
import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'

interface Web3LoginProps {
    smartAccountOptions: {
        activeNetworkId: number
        supportedNetworksIds: number[]
        networkConfig: {
            chainId: number
            dappAPIKey: string
            providerUrl: string
        }[]
    }
}

export const Web3Login = ({ smartAccountOptions }: Web3LoginProps) => {
    const router = useRouter()
    const { toast } = useToast()
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
    const [account, setAccount] = useState<string>()
    const [, /*smartAccount*/ setSmartAccount] = useState<SmartAccount | null>(null)
    const [scwAddress, setScwAddress] = useState('')
    const [, /*scwLoading*/ setScwLoading] = useState(false)
    const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(null)

    const connectWeb3 = useCallback(async () => {
        if (typeof window === 'undefined') return

        console.log('socialLoginSDK', socialLoginSDK)

        if (socialLoginSDK?.provider) {
            const web3Provider = new ethers.providers.Web3Provider(socialLoginSDK.provider)

            setProvider(web3Provider)

            const accounts = await web3Provider.listAccounts()
            setAccount(accounts[0])
            return
        }
        if (socialLoginSDK) {
            socialLoginSDK.showWallet()
            return socialLoginSDK
        }
        const sdk = new SocialLogin()
        const signature3 = await sdk.whitelistUrl('http://localhost:3000')
        const signature2 = await sdk.whitelistUrl('https://verify.walletconnect.com')
        const signature1 = await sdk.whitelistUrl('https://mejora.vercel.app')
        await sdk.init({
            chainId: ethers.utils.hexValue(ChainId.GOERLI),
            // network: 'testnet',
            whitelistUrls: {
                'http://localhost:3000': signature3,
                'https://verify.walletconnect.com': signature2,
                'https://mejora.vercel.app': signature1
            }
        })
        setSocialLoginSDK(sdk)
        sdk.showWallet()
        // {account && (
        //     <div>
        //         <h2>EOA Address</h2>
        //         <p>{account}</p>
        //     </div>
        // )}

        // {scwLoading && <h2>Loading Smart Account...</h2>}

        // {scwAddress && (
        //     <div>
        //         <h2>Smart Account Address</h2>
        //         <p>{scwAddress}</p>
        //     </div>
        // )}
        return socialLoginSDK
    }, [socialLoginSDK])

    // if wallet already connected close widget
    useEffect(() => {
        if (account) {
            console.log('hiding wallet and redirecting')
            if (socialLoginSDK && socialLoginSDK.provider) {
                socialLoginSDK.hideWallet()
            }
            router.push('/profile')
        }
    }, [account, socialLoginSDK, router])

    // after metamask login -> get provider event
    useEffect(() => {
        const interval = setInterval(async () => {
            if (account) {
                clearInterval(interval)
            }
            if (socialLoginSDK?.provider && !account) {
                connectWeb3()
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [account, connectWeb3, socialLoginSDK])

    useEffect(() => {
        scwAddress &&
            toast({
                title: 'Your Web3 account is ready.',
                description: (
                    <>
                        We&apos;ve created your account for you.
                        <br />
                        Your Smart Account Address is:
                        <br />
                        <span className='font-mono font-bold'>{scwAddress}</span>
                    </>
                ),
                action: <ToastAction altText='confetti'>Yay! 🎉</ToastAction>
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scwAddress])

    const handleLogout = () => {
        if (!socialLoginSDK || !socialLoginSDK.web3auth) {
            console.error('Web3Modal not initialized.')
            return
        }
        socialLoginSDK.logout()
        socialLoginSDK.hideWallet()
        setProvider(undefined)
        setAccount(undefined)
        setScwAddress('')
    }

    useEffect(() => {
        async function setupSmartAccount() {
            setScwAddress('')
            setScwLoading(true)
            const smartAccount = new SmartAccount(provider as ethers.providers.Web3Provider, smartAccountOptions)
            await smartAccount.init()
            const context = smartAccount.getSmartAccountContext()
            setScwAddress(context.baseWallet.getAddress())
            setSmartAccount(smartAccount)
            setScwLoading(false)
        }
        if (!!provider && !!account) {
            setupSmartAccount()
            console.log('Provider...', provider)
        }
    }, [account, provider, smartAccountOptions])

    return (
        <div className='flex items-center'>
            {!account && (
                <Button className='text-base font-semibold text-[#4542B2]' variant='ghost'>
                    Sign up
                </Button>
            )}

            <div>
                {account ? (
                    <UserNav address={scwAddress} logout={handleLogout} />
                ) : (
                    <Button
                        className='items-baseline rounded-full bg-[#4542B2] px-8 text-base font-semibold text-white'
                        onClick={connectWeb3}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    )
}
