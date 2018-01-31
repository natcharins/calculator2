"use strict";
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin = require("ng-annotate-webpack-plugin");
var helpers = require("./helpers");
var WebpackOnBuildPlugin = require("on-build-webpack");
var commonLib = require("../common.lib");
var appConfig = require(commonLib.getWebConfigPath);
var webpackMerge = require("webpack-merge");

var config = {
    cache: false,
    devtool: "source-map",
    entry: {
        "app": "./src/index.ts",
        "vendor": "./src/vendor.ts"
    },
    output: {
        path: helpers.root(appConfig.distName),
        publicPath: appConfig.basePath,
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js"],
        modules: [
            helpers.root("src"),
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: helpers.root("node_modules"),
                use: "ts-loader"
            },
            {
                test: /\.json$/,
                exclude: /assets/,
                use: "json-loader"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                }),
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "../"
                    }
                }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: "raw-loader"
            },
            {
                test: /\.(png|jpg|ico)$/,
                use: "file?name=images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: {
                    glob: "src/**/*.html"
                }
            },
            {
                from: {
                    glob: "config/" + String(process.env.NODE_ENV) + "/*"
                }
            },
            {
                from: {
                    glob: "assets/**/*"
                }
            },
            {
                from: {
                    glob: "package.json"
                }
            }, {
                from: {
                    glob: "main.js"
                }
            }],
            {
                ignore: [
                    // Doesn"t copy Mac storage system files
                    ".DS_Store"
                ]
            }
        ),
        new ngAnnotatePlugin({
            add: true
            // other ng-annotate options here
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new WebpackOnBuildPlugin(function (stats) {
        }),
        new webpack.LoaderOptionsPlugin({
            tslint: {
                emitErrors: true,
                failOnHint: true
            }
        })
    ],
    node: {
        __dirname: false
    },
}

module.exports = config;