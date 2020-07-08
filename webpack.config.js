const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const resolve = path.resolve.bind(path, __dirname);

const assetPlugin = new AssetsPlugin({
  filename: 'webpack.json',
  path: path.join(process.cwd(), '_data'),
  processOutput: function (assets) {
    return `[${JSON.stringify(assets)}]`;
  },
  prettyPrint: true
});

const providePlugin = new webpack.ProvidePlugin({
  jQuery: 'jquery',
  $: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default']
});

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  output = {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: resolve('_site', 'assets'),
    publicPath: '/assets/'
  };
  optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash].css'
      }),

      new OptimizeCSSAssetsPlugin({})
    ]
  };
  plugins = [assetPlugin, providePlugin];
} else {
  mode = 'development';
  output = {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: resolve('_site', 'assets'),
    publicPath: '/assets/'
  };
  optimization = {};
  plugins = [
    assetPlugin,
    providePlugin,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ];
}

let config = {
  entry: {
    main: resolve('assets/index.js')
  },
  output,
  mode: mode,
  optimization,
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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)(\?v=[0-9.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ],
        include: [resolve('node_modules'), resolve('assets/images')]
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)(\?v=[0-9.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
        include: [resolve('node_modules'), resolve('assets/fonts')]
      }
    ]
  },
  plugins
};

module.exports = config;
