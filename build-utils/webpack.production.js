const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"}
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].css"}),
        new OptimizeCSSAssetsPlugin({}),
        new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		})
    ]    
});