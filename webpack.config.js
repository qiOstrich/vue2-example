var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./index.html"//new 一个这个插件的实例，并传入相关的参数
    })
  ],
  devServer: {
    proxy: {
      "/operation-portal": {
        target: "http://localhost:8888",
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        // pathRewrite:{
        //   "/operation-portal":"/operation-test"
        // }
      }
    },
    historyApiFallback: true,
    noInfo: true,
    watchContentBase: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
