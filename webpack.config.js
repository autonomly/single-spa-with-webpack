const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        'root-application': 'src/root-application/root-application.js',
        'common-dependencies': [
            // We want just one version of angular, so we put it into the common dependencies
            'core-js/client/shim.min.js',
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            'reflect-metadata',
            /* Just one version of react, too. react-router is fine to have multiple versions of,
             * though, so no need to put it in common dependencies
             */
            'react',
            'react-dom',
            /*vue common dependencies*/
            'vue'
        ],
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    optimization: {
        splitChunks: {
            name: 'common-dependencies.js',
        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, '../src')
        ),
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    externals: [],
    devServer: {
        historyApiFallback: true
    }
};