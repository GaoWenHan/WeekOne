const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
