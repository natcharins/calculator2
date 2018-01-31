"use strict";
var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.common.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var commonLib = require("../common.lib");
var appConfig = require(commonLib.getWebConfigPath);

module.exports = webpackMerge(commonConfig, {

    devtool: "cheap-module-source-map",
    target: "electron",

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("dev")
            }
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            baseHref: appConfig.basePath
        }),
        new webpack.optimize.UglifyJsPlugin(
            {
                beautify: false,
                compress: {
                    warnings: false
                },
                comments: false,
                minimize: true,
                sourceMap: false,
                mangle: false
            })

    ]
});
