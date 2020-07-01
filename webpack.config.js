const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /(.js)|(.jsx)$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      })
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'ts', '.tsx']
  }
}
