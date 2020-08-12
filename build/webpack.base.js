const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]_[chunkhash:8]_bunlde.js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '_c': path.join(__dirname, 'src/components')
    },
    extensions: [".vue", ".js", ".less", ".css", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        // style-loader和MiniCssExtractPlugin.loader互斥
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-webpack-template',
      filename: 'index.html', // 打包之后的html文件名字
      // 这里有小伙伴可能会疑惑为什么不是 '../public/index.html'
      // 我的理解是无论与要用的template是不是在一个目录，都是从根路径开始查找
      template: './public/index.html', // 以我们自己定义的html为模板生成，不然我们还要到打包之后的html文件中写script
      inject: 'body',// 在body最底部引入js文件，如果是head，就是在head中引入js
      minify: { // 压缩html文件
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
        minifyCSS: true,
        minifyJS: true
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
          global: 'Vue'
        }
      ]
    })
  ]
}