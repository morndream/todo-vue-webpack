const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==='development'
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config={
    target:"web",
    // mode: 'production',  //产品模式，输出文件会进行压缩
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.jsx$/,loader:'babel-loader'},
          
            {test: /\.(gif|jpg|jpeg|png|svg)/,
             use:[
                {
              loader:'url-loader',
              options:{
                  limit:1024,
                  name:'[name]-aaa.[ext]'
                  }
                 }
                 ]
           },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          'process.env':{
              NODE_ENV:isDev?'"development"':'"production"'
          }
        }),
        new HTMLPlugin()
    ]
}
if(isDev){
    confit.module.rules.push({
            test:/\.styl/,
            use:[
                'style-loader',
                'css-loader',
                {
                  loader:'postcss-loader',
                  options:{
                      sourceMap:true
                  }
                },
                'stylus-loader'
            ]

    })
  config.devtool='#cheap-module-eval-source-map'
  config.devServer={
      port:8000,
      host:'0.0.0.0',
      overlay:{
          errors:true,
      },
      hot:true
  }
  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
}else{
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push(
    {
        test:/\.styl/,
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                 loader:'postcss-loader',
                 options:{
                    sourceMap:true
                 } 
                },
                'stylus-loader'
            ]
        })
    }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[hash:8].css'),
    ),
    config.optimization={
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}


module.exports=config;
