let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: [path.join(__dirname, '/app/resources/assets/js/index.js')],
    output: {
        path: __dirname + '/public/assets/js',
        filename: '[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                   // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                   // 'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};