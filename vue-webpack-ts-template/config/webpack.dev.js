import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import Dotenv from 'dotenv-webpack'

export default merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8080,
    open: true,
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      },
      onProxyReq: (proxyReq) => {
        if (proxyReq.method === 'OPTIONS') {
          proxyReq.method = 'GET'
        }
      }
    }]
  },
  plugins: [
    new Dotenv({
      path: './.env.development'
    })
  ]
})
