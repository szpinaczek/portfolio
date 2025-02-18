import mdx from '@next/mdx';


const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack (config, options) {
        config.module.rules.push({
            test: /.*\.(glb|gltf)$/,
            use: {
            loader: 'file-loader',
            }
        })
        return config;
    },
    typescript: {
        ignoreBuildErrors: true
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);