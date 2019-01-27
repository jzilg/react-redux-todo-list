const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1
const filename = '[name]-[contenthash]'
const styleNameSyntax = '[name]-[local]'
const getStyleLoaders = config => [
    {
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: isDevServer,
            importLoaders: 2,
            modules: config.modules,
            localIdentName: styleNameSyntax,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevServer,
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: isDevServer,
        },
    },
]

module.exports = {
    mode: !isDevServer ? 'production' : 'development',
    devtool: !isDevServer ? '' : 'source-map',
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: `${filename}.js`,
        publicPath: isDevServer ? '/' : './',
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
        ],
    },
    module: {
        rules: [
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
                use: getStyleLoaders({ modules: false }),
            },
            {
                test: /\.scss$/,
                include: path.resolve('src/components'),
                exclude: /node_modules/,
                use: getStyleLoaders({ modules: true }),
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
    plugins: [
        !isDevServer ? new CleanWebpackPlugin('./dist') : null,
        !isDevServer ? new OptimizeCSSAssetsPlugin({}) : null,
        new StyleLintPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: `${filename}.css`,
            chunkFilename: `${filename}.css`,
        }),
    ].filter(Boolean),
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
            children: false,
            modules: false,
        },
    },
    stats: {
        entrypoints: false,
    },
}
