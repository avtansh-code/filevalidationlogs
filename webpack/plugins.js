'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');

const sourceMap = process.env.TEST
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ })]
  : [ ];

const __DEV__ = process.env.NODE_ENV !== 'production';
const __PRODUCTION__ = process.env.NODE_ENV === 'production';
const __TEST__ = JSON.stringify(process.env.TEST || false);

const basePlugins = [
  new DashboardPlugin(),
  new webpack.ProvidePlugin({
    'window.$': "jquery",
    $: "jquery",
    'window.jQuery': "jquery",
    jQuery: "jquery",
    '_': "underscore",
    'window.angular': 'angular',
    angular: "angular",
  }),
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
  }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
    { from: 'static', to: 'static'}, // TODO: Remove this after cleaning up static, primarily bower_components
  ]),
].concat(sourceMap);

const devPlugins = [
];

const prodPlugins = [
];

const nonTestPlugins = () => [
  new SplitByPathPlugin([
    {
      name: 'vendor',
      path: [
        path.join(__dirname, '../', '/node_modules/'),
        path.join(__dirname, '../static/bower_components/'),
      ]
    },
  ], {
    manifest: 'vendor'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    minCount: 2,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(true),
];


module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);