// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false
            }
        }
        return config
    },
    async headers() {
        return [{ source: '/', headers: [{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }] }]
    }
}

module.exports = nextConfig
