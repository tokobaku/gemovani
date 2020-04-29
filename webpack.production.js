const common = require('./webpack.common');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',

    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-')
            }
        })
    ]
});
