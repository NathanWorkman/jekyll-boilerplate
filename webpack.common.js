const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const resolve = path.resolve.bind(path, __dirname);

module.exports = {
  entry: {
    main: resolve('assets/index.js')
  },

  output: {
    path: resolve('_site/assets/')
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
  ]
};
