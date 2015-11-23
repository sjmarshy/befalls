module.exports = {
  context: __dirname + "/assets/js",
  entry: "./app.js",
  output: {

    path: "public/js",
    filename: "index.js"
  },
  module: {
    loaders: [{ 

      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"}
    ]
  },
  debug: true
};
