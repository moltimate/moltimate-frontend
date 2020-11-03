const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ArchivePlugin = require("webpack-archive-plugin");
require("file-loader");

module.exports = {
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  // mode: "development",
  // devtool: "inline-source-map",
  // entry: "./src/basic-wrapper/ts/BasicWrapper.ts",
  // output: {
  //   filename: "bundle.js"
  // },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new ArchivePlugin({
      format: "tar"
    })
  ]
};
