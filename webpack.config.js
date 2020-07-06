const path = require('path');
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
  plugins = [assetPlugin];
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
  // optimization: {
  //   // removeAvailableModules: true,
  //   // removeEmptyChunks: true,
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendors: {
  //         // test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor'
  //         // priority: -40,
  //         // enforce: true,
  //       }
  //     }
  //   }
  // },
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
  plugins
};

module.exports = config;
