/**
 * COMMON WEBPACK CONFIGURATION
 */
const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

const miniCssExtractPluginConfig = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        // only enable hot in development
        hmr: process.env.NODE_ENV === 'development',
        // if hmr does not work, this is a forceful method.
        reloadAll: true,
    }
}

const postLoaderConfig = {
    loader: 'postcss-loader',
    options: {
        //exec: true,
        ident: 'postcss',
        plugins: loader => [
            require('cssnano')(),
            require('autoprefixer')
        ]
    }
};


const cssConfigNodeModule = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {

            importLoaders: 1,
            sourceMap: true
        }
    },
    { ...postLoaderConfig }
];


const cssConfigInAssets = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: true,
            camelCase: true,
            modules: true,
            hashPrefix: 'hash',
            localIdentName: '[name]__[local]__[hash:base64:10]'
            //url: false
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                // Add the plugin
                new IconfontWebpackPlugin({
                    resolve: loader.resolve,
                    fontNamePrefix: 'custom-',
                    //enforcedSvgHeight: 3000,
                    modules: false,
                })
            ]
        }
    }
];


module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
        {
            // Compile into js/build.js
            path: path.resolve(process.cwd(), 'build'),
            publicPath: '/',
        },
        options.output,
    ), // Merge with env dependent settings
    optimization: {
        ...options.optimization,
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: options.babelQuery,
                },
            },
            {
                // Preprocess our own .css files
                // This is the place to add your own loaders (e.g. sass/less etc.)
                // for a list of loaders, see https://webpack.js.org/loaders/#styling
                test: /\.css$/,
                exclude: /node_modules/,
                use: cssConfigInAssets,
            },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: cssConfigNodeModule,
            },
            // {
            // 	test: /\.(eot|svg|ttf|woff|woff2)$/,
            // 	loader: 'file-loader?name=/fonts/[name].[ext]'
            // },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                            noquotes: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                                // Try enabling it in your environment by switching the config to:
                                // enabled: true,
                                // progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ],
    },
    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; Terser will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/en$/),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
        }),
        new OpenBrowserPlugin({ url: `http://localhost:30001` }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]),
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
});
