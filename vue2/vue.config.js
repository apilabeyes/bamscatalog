const MiniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports = {
  publicPath:'',
  lintOnSave : true,
  productionSourceMap: process.env.NODE_ENV === 'production'? false :true,
  outputDir:process.env.NODE_ENV === 'production'? '../docs' :'debug',
  pages:{
    index:{
      entry: './src/main.js',      //メインとなるJSファイル
      template: 'public/index.html',     //ソースとなるhtmlファイル名
      filename: 'index.html'      //出力するhtmlファイル名
    }
  },
  chainWebpack: config => {

    if (process.env.NODE_ENV === 'production'){

      //チャンクファイルを生成しないようにする
      config.optimization.delete('splitChunks')

      //メインJSファイル名にハッシュ値をつけない
      config.output
        .filename('[name].js')


      //imagesに置く画像ファイル名にハッシュ値をつけない
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'img/[name].[ext]'
        })

      //svgのファイル名にハッシュ値をつけない
      config.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'img/[name].[ext]'
        })

      //mediaに置くメディアファイル名にハッシュ値をつけない
      config.module
        .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'media/[name].[ext]'
        })

      //fontsに置くフォントファイル名にハッシュ値をつけない
      config.module
        .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'fonts/[name].[ext]'
        })

      //CSSファイル名にハッシュ値をつけない
    config.plugin('extract-css')
        .use(MiniCssExtractPlugin, [{
          filename:'[name].css',
          chunkFilename:''
        }])

     //起動用htmlのminify設定を指定する
    config.plugin('html-index')
        .tap(args => {
          args[0].minify= {
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: false,
            collapseBooleanAttributes: false,
            removeScriptTypeAttributes: false
          };
          return args
        })
    }

    // 画像保存先フォルダを icons に変更
    config.module.rule('images').use('url-loader')
    .loader('file-loader') // replaces the url-loader
    .tap(options => Object.assign(options, {
      name: 'icons/[name].[ext]'
    }))
    config.module.rule('svg').use('file-loader')
    .tap(options => Object.assign(options, {
      name: 'icons/[name].[ext]'
    }))

  },
  configureWebpack:config => {
  },
}
