# Vue 学习记录


## Webpack
使用可以参考下面的两篇文章：

[使用webpack](http://www.cnblogs.com/vajoy/p/4650467.html)

[webpack 教程](https://www.zfanw.com/blog/webpack-tutorial.html)

### 和 gulp 集成
在 `gulpfile.js` 里编写 webpack 的配置即可。例如下面的形式：
```js
var gulp = require("gulp");
var webpack = require("webpack");

gulp.task("webpack", function (callback) {
    //webpack配置文件
    var config = {
        watch: true,
        entry: {

            index: __dirname + '/src/js/index.js'
        },
        output: {
            path: __dirname + '/dist/js',
            filename: '[name].js'
        }
        //........
    };
    webpack(config, function (err, stats) {
        console.log(stats.toString());
    });
});

gulp.task('default', [ 'webpack']);
```
在配置里加上 `watch: true`，就可以使 webpack 监听文件的变化。这里使用 `browserSync` 来作为 web 服务器，为了实现文件改动自动刷新网页，只需要使用 gulp 监听 webpack 生成的文件，然后调用 `browserSync.reload` 即可，下面是配置：
```js
gulp.task("watch", function () {
    gulp.watch("./**/*.html", browserSync.reload);
    gulp.watch("dist/**/*.js", browserSync.reload);
    gulp.watch("dist/**/*.css", browserSync.reload);

});
gulp.task('default', ['browserSync', 'watch', 'webpack']);
```

### 提取 css 文件

使用 [`extract-text-webpack-plugin`](https://github.com/webpack-contrib/extract-text-webpack-plugin) 插件，不过安装使需要注意 webpack 1 和 2的安装方式不同：
 ```
 # for webpack 1
 npm install --save-dev extract-text-webpack-plugin
 # for webpack 2
 npm install --save-dev extract-text-webpack-plugin@beta
 ```
webpack 2 配置的时候也略有不同：
```
{
    plugins: [commonsPlugin, new ExtractTextPlugin("../css/[name].css")],

    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!less-loader"
            })
        }
    },
}
```
