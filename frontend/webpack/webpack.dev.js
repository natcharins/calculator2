"use strict";
var webpackMerge = require("webpack-merge");
var webpack = require("webpack");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var commonLib = require("../common.lib");
var appConfig = require(commonLib.getWebConfigPath);

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",
    output: {
        path: helpers.root("output"),
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            baseHref: appConfig.basePath
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        stats: 'minimal',
        proxy: {
            '/api/': {
                target: appConfig.restUrl,
                pathRewrite: { '': '' },
                onProxyReq: function onProxyReq(proxyReq, req, res) {
                },
                secure: false
            }
        }
    }
});