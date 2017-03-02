var path = require('path');
var webpack = require('webpack');

module.exports = {
  context:path.resolve(__dirname,'./src'),
  entry:{
    index:'./index.js'
  },
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'./dist'),
    publicPath:'/',
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'commons',
      filename:'common.js',
      minChunks:2,
    }),
    new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  devtool: "cheap-eval-source-map",
  devServer:{
    contentBase:path.resolve(__dirname,'./dev'),
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:['es2015','react'],
            plugins: [["import", {
              "libraryName": "antd",
              "style": 'css',   // or 'css'
            }]]
          },
        }],
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
        exclude:/bootstrap.css/,
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      } ,
      {
        test:/\.html$/,
        use:['html-loader'],
      },
      {
        test:/\.hbs$/,
        use:['handlebars-loader'],
      }
    ]
  }
};
