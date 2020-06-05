const webpack = require("webpack");
const webpackMerge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const entryFile = path.resolve(__dirname, "client", "src", "index.js");

const loadPresets = require("./build-utils/loadPresets");
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}.js`)(env);

module.exports = ({ mode, presets } = {mode: "production", presets: [] }) => {
  console.log( mode, presets );

  return webpackMerge({
    entry: entryFile,
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
      colors: true,
      reasons: true,
      chunks: false
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './client/src/index.html'
      }), 
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: "./dist",
      hot: true,
      proxy: {
        "/api": "http://localhost:3000"
      },
    },
  }, modeConfig({mode, presets}), loadPresets({mode, presets}))
}
