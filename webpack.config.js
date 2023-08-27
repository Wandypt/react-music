const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: ["./src/index.js", "./src/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "chunks/[name].[chunkhash].js",
    assetModuleFilename: "media/[name][hash][ext][query]",
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: true,
      forOf: true,
      optionalChaining: true,
      templateLiteral: true,
    },
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },

      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          limit: 8900,
          outputPath: "img",
        },
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", "..."],
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 4,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devtool: "source-map",
};
