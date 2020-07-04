const merge = require('webpack-merge');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
});
