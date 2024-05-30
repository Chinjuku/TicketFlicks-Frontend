/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    webpack: (config, { isServer }) => {
        config.cache = false;
        return config;
    },
};

export default nextConfig;
