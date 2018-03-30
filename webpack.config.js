'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

const paths = {
  dist: resolveApp('dist'),
  client: resolveApp('src/client'),
  clientIndex: resolveApp('src/client/index.jsx'),
  publicHtml: resolveApp('public/index.html'),
  polyfills: resolveApp('polyfills.js'),
  serverIndex: resolveApp('src/server/server.js')
};

module.exports = [
  {
    name: 'WEBPACK:SERVER',
    entry: [paths.serverIndex],
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(png|jpeg|jpg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    output: {
      path: paths.dist,
      pathinfo: true,
      filename: 'build.server.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    }
  }, {
    name: 'WEBPACK:CLIENT',
    entry: [
      paths.clientIndex, paths.polyfills
    ],
    context: paths.client,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react']
          }
        }, 
        {
          test: /\.(sass|scss|css)$/,
          use: [
            { loader: 'style-loader' }, 
            { loader: 'css-loader' }
          ]
        }, {
          test: /\.(png|jpeg|jpg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.publicHtml,
        inject: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      })],
    output: {
      path: paths.dist,
      pathinfo: true,
      filename: 'build.client.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.html', '.json']
    }
  }
];