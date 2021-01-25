const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
    module: {
      rules: [
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
          filename: "style.css",
          path: path.resolve(__dirname, "docs")
        })
      ],
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs")
      }
  };