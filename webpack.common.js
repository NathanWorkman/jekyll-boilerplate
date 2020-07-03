const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, '_assets', 'index.js')
  },

  output: {
    path: path.join(__dirname, '_site')
  },

  module: {
    rules: [
      {
        test: /\.((png)|(jpg)|(jpeg)|(ico)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: false, // webpack@1.x
              disable: false, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 90
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },

      {test: /\.json$/, loader: 'json-loader'},

      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '_assets/images/',
    //       to: 'images/',
    //       flatten: true
    //     }
    //   ]
    // })

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './_assets/fonts/',
    //       to: 'fonts/',
    //       flatten: true
    //     },
    //     {
    //       from: './_assets/videos/',
    //       to: 'videos/',
    //       flatten: true
    //     }
    //   ]
    // })
  ]
};
