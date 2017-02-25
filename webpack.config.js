const config = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: './client/public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      }
    ]
  }
  // ,
  // devtool: 'source-map'
};

module.exports = config;
