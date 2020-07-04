// const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const resolve = path.resolve.bind(path, __dirname);

module.exports = {
  entry: {
    main: resolve('_assets/index.js')
  },

  output: {
    path: resolve('_site/')
  },

  module: {
    rules: [
      {test: /\.json$/, loader: 'json-loader'},

      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(process.cwd(), '_data'),
      processOutput: function (assets) {
        return `[${JSON.stringify(assets)}]`;
      },
      prettyPrint: true
    })
    // new CleanWebpackPlugin()
  ]
};
