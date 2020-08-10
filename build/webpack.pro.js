const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const ProConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './imgs/[name]_[hash:8].[ext]',
            limit: 10240
          }
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './imgs[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new optimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ],
  optimization: {
    splitChunks: {
      // 代码分割时默认对异步代码生效，all：所有代码有效，inital：同步代码有效
      chunks: 'async',
      // 代码分割最小的模块大小，引入的模块大于 20000B 才做代码分割
      minSize: 20000,
      // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
      maxSize: 0, 
      // 引入的次数大于等于1时才进行代码分割
      minChunks: 1,
      // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxAsyncRequests: 30,
      // 入口文件做代码分割最多分成 30 个 js 文件
      maxInitialRequests: 30, 
      // 文件生成时的连接符
      automaticNameDelimiter: '~', 
      enforceSizeThreshold: 5000,
      cacheGroups: {
        vendors: {
          // 位于node_modules中的模块做代码分割
          test: /[\\/]node_modules[\\/]/, 
          // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
          priority: -10 
        }, 
        // 既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
        default: { 
          // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
          //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
          priority: -20, 
           //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          reuseExistingChunk: true 
        }
      }
    }
  }
})

module.exports =  ProConfig