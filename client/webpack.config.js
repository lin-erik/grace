const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const SRC_DIR = path.join(__dirname, '/src')
const DIST_DIR = path.join(__dirname, '/dist')

module.exports = {
  entry: [`${SRC_DIR}/index.jsx`],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test:/\.css$/,
        include: SRC_DIR,
        loader: ['style-loader','css-loader']
      },
    ]
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: './index.html'
    })
  ]
}