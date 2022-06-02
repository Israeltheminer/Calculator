const path = require("path");

module.exports = {
  entry: {
    main: "./src/scripts/index.js",
    style: "./src/scripts/style.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/scripts")
  },
  target: 'node',
  externals: {
    express: 'express',
  },
  stats: {
    errorDetails: true
  }
};