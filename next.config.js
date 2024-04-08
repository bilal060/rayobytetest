const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const withOptimizedImages = require('next-optimized-images');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = withBundleAnalyzer(
    withOptimizedImages({
        reactStrictMode: true,
        experimental: {
            largePageDataBytes: 8000 * 20000,
            optimizeFonts: true, // Optimize font loading
            optimizeImages: true, // Optimize image loading
        },
        optimization: {
            minimize: true,
            minimizer: ['...', new CssMinimizerPlugin()], // Include CssMinimizerPlugin for CSS minification
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    modern: {
                        name: 'modern',
                        test: /node_modules[\\/]/,
                        priority: -10,
                        enforce: true,
                        chunks: 'all',
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        async headers() {
            return [
                {
                    source: '/(.*)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=31536000, must-revalidate',
                        },
                    ],
                },
            ];
        },
        images: {
            deviceSizes: [320, 420, 768, 1024, 1200],
        },
    })
);
