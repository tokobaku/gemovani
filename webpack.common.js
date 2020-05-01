const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appRoot = path.resolve(__dirname, 'resources', 'app');

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.tsx',
            '.scss'
        ]
    },

    target: 'web',

    entry: path.resolve(__dirname, 'resources', 'app', 'index.tsx'),

    output: {
        path: path.resolve(__dirname, 'public', 'application')
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
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(appRoot, 'style', 'abstract', '_abstract.scss')
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    }
};
