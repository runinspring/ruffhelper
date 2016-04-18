var fs = require('fs');

var path = require('path');
var webpack = require("webpack");
var urlProject = fs.realpathSync('./');
//console.log("urlProject:",urlProject);
var node_modules = path.resolve(urlProject, 'node_modules');

config = {
    entry: {
        app: path.resolve(urlProject, 'src/Main.jsx'),
        vendors: ['react']
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx']
    },
    externals:{
        "shell": "require('shell')",
        "remote": "require('remote')",
        "electron": "require('electron')",
        "child_process": "require('child_process')",
        "fs": "require('fs')"
    },
    output: {
        path: path.resolve(urlProject, 'app/public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            { test: /\.jsx?$/, loader: "babel",
                include: /src/,
                exclude: [node_modules],
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            { test: /\.css$/, loader: "style!css"},
            { test: /\.scss$/, loader: "style!css!sass"},
            {
                test: /css(\\|\/)[^\.]+\.(png|jpg)/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

module.exports = config;
