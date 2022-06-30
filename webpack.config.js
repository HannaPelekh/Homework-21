const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/app.js",
  mode: "development",
  output: {
      filename: "app.js",
      path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 4200,        
  },   
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html"
  })], 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}