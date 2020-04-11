const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.scss',
            '.css'
        ]
    },

    target: 'web',

    entry: path.resolve(__dirname, 'resources', 'admin', 'index.js'),

    output: {
        path: path.resolve(__dirname, 'public', 'backend')
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin()
    ]
};
