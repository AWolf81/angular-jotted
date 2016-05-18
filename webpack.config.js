var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'angular-jotted';

var plugins = [
  new ExtractTextPlugin(libraryName + ".css")
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
          test: /\.html$/,
          loader: "html"
      },
      {
          test: /\.css$/,
          // includePaths: [path.resolve(base, "node_modules")],
          loader: ExtractTextPlugin.extract("style", "css") //!postcss")
      },
      {
          test: /\.(md|txt)$/,
          loader: "raw"
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  externals: {
    angular: 'angular',
    jotted: 'jotted',
    codemirror: 'codemirror',
    marked: 'marked',
    'angular-marked': 'angular-marked',
    'angular-ui-bootstrap': 'angular-ui-bootstrap'
  },
  plugins: plugins
};

module.exports = config;
