const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProductionBuild = process.argv.indexOf('-p') !== -1
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1
const styleNameSyntax = isProductionBuild ? '_[hash:base64:5]' : '[name]-[local]'

const globalStyleLoader = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProductionBuild,
            importLoaders: 2,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isProductionBuild,
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: !isProductionBuild,
        },
    },
];
const componentStyleLoader = [
    ...globalStyleLoader,
]
componentStyleLoader[0] = {
    loader: 'css-loader',
    options: {
        sourceMap: !isProductionBuild,
        modules: true,
        localIdentName: styleNameSyntax,
        importLoaders: 2,
    },
}

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: '[name]-[chunkhash].js',
        publicPath: '/',
    },

    resolve: {
        extensions: [
            '.js',
            '.jsx',
        ],
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['react-css-modules', {
                                    generateScopedName: styleNameSyntax,
                                    filetypes: {
                                        '.scss': {
                                            syntax: 'postcss-scss',
                                        },
                                    },
                                }],
                            ],
                        },
                    },
                    'eslint-loader',
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve('src/style'),
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: globalStyleLoader,
                }),
            },
            {
                test: /\.scss$/,
                include: path.resolve('src/components'),
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: componentStyleLoader,
                }),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },

    plugins: [
        !isDevServer ? new CleanWebpackPlugin('./dist') : { apply: () => {} },
        new ExtractTextPlugin({
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.context && module.context.includes('node_modules'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new webpack.DefinePlugin({
            BACKEND_URL: '"http://localhost:3000"',
        }),
        new StyleLintPlugin(),
    ],

    devtool: isProductionBuild ? '' : 'source-map',

    devServer: {
        host: '0.0.0.0',
        port: '8080',
        disableHostCheck: true,
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000,
        },
        stats: {
            modules: false,
        },
    },
}
