'use strict';

const webpack = require('webpack');
const path = require('path');
// const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  externals: {
    angular: 'angular',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[name].chunk.[chunkhash].js',
  },
  recordsPath: path.resolve(__dirname, '.webpack-records.json'),

  devtool: 
   'inline-source-map',

  resolve: {
    root: [
      path.join(__dirname, "src"),
      path.join(__dirname, "static/bower_components"),
      path.join(__dirname, "node_modules"),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
  },
  plugins: plugins,
  postcss: postcssInit,

  devServer: {
    port: 5000,
    inline: true,
    // hot: true,
    quiet: true,
    host: "0.0.0.0",
    historyApiFallback: { index: '/' },
    // proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
  },

  module: {
    preLoaders: [
       // loaders.tslint,
    ],
    loaders: [
      { loader: 'exports?window.angular', test: require.resolve('angular') },
      loaders.ts,
      loaders.html,
      loaders.vendoredCss,
      loaders.rawCss,
      loaders.css,
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      loaders.otf,
      { loader: 'ify', test: /node_modules/ },
    ],
  },
};