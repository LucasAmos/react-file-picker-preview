const webpack = require('webpack')
const projectPaths = require('./projectPaths')

module.exports = {
  mode: 'production',
  entry: projectPaths.entry,
  output: {
    path: projectPaths.buildDir,
    filename: 'index.js',
    library: 'react-file-picker-preview',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|.test?)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }]
  },
  resolve: {
    extensions: ['*', '.jsx', '.js']
  },
  externals: { react: 'react' }
}
