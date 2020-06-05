const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',

    entry: path.resolve(__dirname, 'resources', 'service-worker.js'),

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'service-worker.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
});
