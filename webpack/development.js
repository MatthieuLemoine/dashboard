const path = require('path');
const webpack = require('webpack');
const UnusedWebpackPlugin = require('unused-webpack-plugin');

const PORT = process.env.PORT || 4000;

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    compress: true,
    port: PORT,
    historyApiFallback: true,
    stats: {
      children: false,
      colors: true,
      hash: false,
      version: false,
    },
    proxy: {
      '/graphql': {
        target: 'http://localhost:3888/graphql',
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, '..', 'client')],
      root: path.join(__dirname, '..'),
      exclude: ['index.html'],
    }),
  ],
};
