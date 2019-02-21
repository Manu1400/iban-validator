const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

let config = {
  resolve: {
    alias: {
      'uri-js': path.resolve('.', 'node_modules', 'uri-js', 'dist', 'es5', 'uri.all.js')
    }
  },
  entry: {
    isValid: "./webpack-isValid.js",
    fetchAccountNumber: "./webpack-fetchAccountNumber.js"
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./[name].js",
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'window',
    libraryExport: 'default',
    publicPath: './src/DE/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  plugins: [
  //  new CopyPlugin([
  //    { from: 'src/DE/blz.json', to: 'DE/blz.json' }
  //  ])
  ],
}

module.exports = config;
