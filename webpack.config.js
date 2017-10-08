const path = require('path');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const development = require('./webpack/development');
const production = require('./webpack/production');

const base = {
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'client')],
        use: ['cache-loader', 'babel-loader'],
      },
      // Fonts
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          publicPath: '/',
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          publicPath: '/',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          publicPath: '/',
        },
      },
      {
        test: /\.eot(\?v =\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
        },
      },
      // Copy ico and json in assets e.g favicon/manifest
      {
        test: /.*assets.*\.(ico|json|xml)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/',
        },
      },
      // Images & icons
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          mimetype: 'image/svg+xml',
          publicPath: '/',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      // Copy index.html in output folder
      {
        from: path.join(__dirname, 'client', 'index.html'),
      },
    ]),
  ],
  stats: {
    children: false,
    colors: true,
    hash: false,
    version: false,
  },
};

const config = process.env.NODE_ENV === 'production' ? production : development;

module.exports = webpackMerge(base, config);
