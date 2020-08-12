const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const webpackDevConfig = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bunlde.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      { 
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    contentBase: './dist',
    hot: true,
    open: false,
    compress: true
  },
  devtool: 'source-map',
}

module.exports = merge(baseConfig, webpackDevConfig)