const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const config = {
  entry: ['babel-polyfill', `${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  mode: 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
          'url-loader?limit=10000',
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
    new CleanWebpackPlugin(BUILD_DIR),
    new CopyWebpackPlugin([
      {
        from: `${PUBLIC_DIR}/**/*`,
        to: BUILD_DIR,
      },
    ]),
    new ExtractTextPlugin('bundle.[hash].css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${APP_DIR}/index.html`,
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.jsx?$|\.s?css$/,
      minRatio: 0.8,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
