module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
    ],
    "compact": true,
    plugins: [
        'styled-components',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', { "legacy": true }],
        ['@babel/plugin-proposal-class-properties', { "loose": true }],
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    env: {
        production: {
            only: ['app'],
            plugins: [
                'lodash',
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
        },
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'dynamic-import-node',
            ],
        },
    },
};
