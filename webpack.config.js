const webpack = require("webpack");
const webpackMerge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const loadPresets = require("./build-utils/loadPresets");
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}.js`)(env);

module.exports = ({ mode, presets } = {mode: "production", presets: [] }) => {
  console.log( mode, presets );

  return webpackMerge({
    entry: {
      app: './src/App.js'
    },
    mode,
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ],
    },
    stats: {
      colors: true
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].[contenthash].js'
    },
    plugins: [
      new HtmlWebpackPlugin(), 
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: './dist',
      hot: true
    }
  }, modeConfig({mode, presets}), loadPresets({mode, presets}))
}
