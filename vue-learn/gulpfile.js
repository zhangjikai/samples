/**
 * Created by ZhangJikai on 2017/2/19.
 */
var gulp = require("gulp");
//var webpack = require("webpack-stream");
//var webpackConfig = require('./webpack.config.js');
var webpack = require("webpack");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var browserSync = require('browser-sync');
var path = require("path")


gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: '.'
        },
        port: 80
    })
});


gulp.task("webpack", function (callback) {
    // run webpack
    //webpack(webpackConfig);

    //webpack配置文件
    var config = {
        watch: true,
        plugins: [commonsPlugin, new ExtractTextPlugin("../css/[name].css")],
        entry: {
            index: __dirname + '/src/js/index.js'
        },
        output: {
            path: __dirname + '/dist/js',
            filename: '[name].js'
        },


        module: {
            loaders: [
                {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
                },

                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            ]
        },

        resolve: {
            alias: {
                vue: path.join(__dirname, "/node_modules/vue/dist/vue.min.js")

            },
            extensions: ['.js', '.json', '.less']
        }
    };
    webpack(config, function (err, stats) {
        console.log(stats.toString());
    });
});

gulp.task("watch", function () {
    gulp.watch("./**/*.html", browserSync.reload);
    gulp.watch("dist/**/*.js", browserSync.reload);
    gulp.watch("dist/**/*.css", browserSync.reload);

});


gulp.task('default', ['browserSync', 'watch', 'webpack']);