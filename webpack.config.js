const path = require("./src/");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    loaders: [{ test: /\.js|jsx$/, loaders: ["babel"] }],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};
