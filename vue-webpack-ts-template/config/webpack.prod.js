import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import WebpackBar from 'webpackbar'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import Dotenv from 'dotenv-webpack'

export default merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new Dotenv({
      path: './.env.production'
    }),
  ]
})
