export default function Template({ children }: { children: React.ReactNode }) {
    console.log('template rendered')
    return <>{children}</>
}
