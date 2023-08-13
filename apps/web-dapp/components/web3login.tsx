'use client'
import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

export const Web3Login = () => {
    const { toast } = useToast()
    const [provider, setProvider] = useState<any>()
    const [account, setAccount] = useState<string>()
    const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
    const [scwAddress, setScwAddress] = useState('')
    const [scwLoading, setScwLoading] = useState(false)
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
        const signature2 = await sdk.whitelistUrl('http://localhost:3000/')
        const signature1 = await sdk.whitelistUrl('https://mejora.vercel.app')
        await sdk.init({
            chainId: ethers.utils.hexValue(ChainId.GOERLI),
            network: 'testnet',
            whitelistUrls: {
                'http://localhost:3000/': signature2,
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
        console.log('hidelwallet')
        if (socialLoginSDK && socialLoginSDK.provider) {
            socialLoginSDK.hideWallet()
        }
    }, [account, socialLoginSDK])

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
                        We've created your account for you.
                        <br />
                        Your Smart Account Address is:
                        <br />
                        <span className='font-bold font-mono'>{scwAddress}</span>
                    </>
                ),
                action: <ToastAction altText='confetti'>Yay! 🎉</ToastAction>
            })
    }, [scwAddress])

    const disconnectWeb3 = async () => {
        if (!socialLoginSDK || !socialLoginSDK.web3auth) {
            console.error('Web3Modal not initialized.')
            return
        }
        await socialLoginSDK.logout()
        socialLoginSDK.hideWallet()
        setProvider(undefined)
        setAccount(undefined)
        setScwAddress('')
    }

    useEffect(() => {
        async function setupSmartAccount() {
            setScwAddress('')
            setScwLoading(true)
            const smartAccount: SmartAccount = new SmartAccount(provider, {
                activeNetworkId: ChainId.GOERLI as any,
                supportedNetworksIds: [ChainId.GOERLI] as any,
                networkConfig: [
                    {
                        chainId: ChainId.GOERLI as any,
                        dappAPIKey: process.env.WALLETCONNECT_DAPP_KEY
                    }
                ]
            })
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
    }, [account, provider])

    return (
        <div className='flex'>
            {!account && (
                <Button className='text-base font-semibold text-[#4542B2]' variant='ghost'>
                    Sign up
                </Button>
            )}
            <Button
                className='items-baseline rounded-full bg-[#4542B2] px-8 text-base font-semibold text-white'
                onClick={!account ? connectWeb3 : disconnectWeb3}>
                {!account ? 'Login' : 'Logout'}
            </Button>
        </div>
    )
}
