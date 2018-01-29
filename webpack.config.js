const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const globalStyleLoader = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 2,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
        },
    },
];
const componentStyleLoader = [
    ...globalStyleLoader,
]
componentStyleLoader[0] = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]-[local]_[hash:base64:5]',
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
                    'babel-loader',
                    'eslint-loader',
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve('src/style'),
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: globalStyleLoader,
                }),
            },
            {
                test: /\.scss$/,
                include: path.resolve('src/components'),
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
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
        new CleanWebpackPlugin('./dist'),
        new ExtractTextPlugin({
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            /* TODO minify only while production build
            minify: {
                collapseWhitespace: true,
            }, */
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
            'BACKEND_URL': '"http://localhost:3000"',
        }),
        new StyleLintPlugin(),
    ],

    devtool: 'source-map',

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
    },
}
