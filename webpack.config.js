const webpack = require("webpack");
const path = require("path");

let config = {
  resolve: {
    alias: {
      'uri-js': path.resolve('.', 'node_modules', 'uri-js', 'dist', 'es5', 'uri.all.js')
    }
  },
  entry: "./webpack.js", //"./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js",
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}

module.exports = config;
