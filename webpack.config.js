//webpack.config.js
const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: "./typescript/index.ts",
  },
  output: {
    path: path.resolve(__dirname, 'dist','js'),
    filename: "index.js", // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};