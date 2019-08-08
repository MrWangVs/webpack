const path = require('path');
// const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('mini-css-extract-plugin');

module.exports={
    entry:{//入口文件
        main:'./src/main.js',
        main2:'./src/main2.js',
    },
    output:{
        path:path.resolve(__dirname,'../dist'),//打包文件夹
        // filename:'main.js'//打包文件名
        //如果入口文件是两个，出口文件名是不能写死的
        filename:'[name].js'
    },
    //模式选择 生产模式和开发模式 production和devlopment
    mode:'development',
    //解读css图片转换压缩等
    module:{
        rules:[
            // {
            //     test:/\.css$/,//对css结尾的文件进行loader
            //     use:['style-loader','css-loader']
            // },
            {
                test:/\.css$/,
                use:[
                    extractTextPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.html$/i,
                use:['html-withimg-loader']
            },
            {
                test:/\.(jpg|png|gif|jpeg)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:500,
                            publicPath:'../image/',
                            outputPath:'image'
                        }
                    }
                ]
            },
            //jsx es6语法转义
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    //插件 用于生产模块和各项功能
    plugins:[
        // new uglify(),
        new htmlPlugin({//打包html文件
            minify:{//对html进行压缩
                removeAttributeQuotes:true,//去掉属性的双引号
            },
            hash:true,//为了js有缓存效果，添加hash去除缓存的效果
            template:'./src/index.html'//要打包的html的模版路径和文件名称
        }),
        new extractTextPlugin({
            filename:'./css/[name].css',
            chunkFilename:'[id].css'
        })
    ],
    //loader 转换器
    loader:{},
    //服务器配置
    devServer:{
        contentBase:path.resolve(__dirname,'../dist'),//设置项目的基本目录结构
        host:'localhost',//服务器IP配置
        port:'8000',//端口配置
        compress:true//服务器压缩是否开启
    }
}