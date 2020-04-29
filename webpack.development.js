const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',

    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },

    watch: true,

    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-')
            }
        })
    ]
});
