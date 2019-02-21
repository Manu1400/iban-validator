const webpack = require("webpack");
const path = require("path");

let config = {
  resolve: {
    alias: {
      'uri-js': path.resolve('.', 'node_modules', 'uri-js', 'dist', 'es5', 'uri.all.js'),
      'uk-modulus-checking': path.resolve('.', 'node_modules', 'uk-modulus-checking', 'src', 'index.js'),
    }
  },
  entry: {
    isValid: "./webpack-isValid.js",
    fetchAccountNumber: "./webpack-fetchAccountNumber.js",
    test: "./webpack-test.js"
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
    },
    // node_modules/uk-modulus-checking/src/data/valacdos-v530-updated.txt
    // TODO: remove the reader -> prefee require json
    // const content = fs.readFileSync(`${__dirname}/data/valacdos-v540-updated.txt`, 'utf8');
    {
      test: /\.(png|jpg|gif|txt)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    },
    {
       type: 'javascript/auto',
       test: /\.json$/,
       use: [{
         loader: 'file-loader',
         options: {
           name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }
            return '[hash].[ext]';
          },
         },
       }],
      // include: /\.\/config/  // for e.g, but better to only copy particular JSON files (not all)
    }
    /* {
      test: /\.(png|jpg|gif|json)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    }, */
    /*{
      test: /test\.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/
    }*/
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  plugins: [
  ],
}

module.exports = config;
