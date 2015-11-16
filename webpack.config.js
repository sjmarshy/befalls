module.exports = {
  context: __dirname + "/assets/js",
  entry: "./app.js",
  output: {

    path: "public/js",
    filename: "index.js"
  },
  loaders: [{ 

    test: /\.js$/,
    loader: "babel-loader"}
  ],
  debug: true
};
