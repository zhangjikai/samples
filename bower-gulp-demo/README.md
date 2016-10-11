

<!-- toc -->

- [使用](#%E4%BD%BF%E7%94%A8)
- [Bower](#bower)
  * [安装](#%E5%AE%89%E8%A3%85)
  * [初始化](#%E5%88%9D%E5%A7%8B%E5%8C%96)
  * [使用](#%E4%BD%BF%E7%94%A8-1)
    + [安装类库](#%E5%AE%89%E8%A3%85%E7%B1%BB%E5%BA%93)
    + [更新类库](#%E6%9B%B4%E6%96%B0%E7%B1%BB%E5%BA%93)
    + [卸载类库](#%E5%8D%B8%E8%BD%BD%E7%B1%BB%E5%BA%93)
  * [配置](#%E9%85%8D%E7%BD%AE)
- [Gulp](#gulp)
  * [安装](#%E5%AE%89%E8%A3%85-1)
  * [错误处理](#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)
  * [配置WebServer](#%E9%85%8D%E7%BD%AEwebserver)
  * [编译Less](#%E7%BC%96%E8%AF%91less)
- [Gulp集成Bower](#gulp%E9%9B%86%E6%88%90bower)

<!-- tocstop -->

## 使用
```
npm install
bower install
gulp move
```

## Bower
### 安装
```bash
npm install -g bower
```
### 初始化
```bash
bower init
```
之后会提示输入一些初始化信息
### 使用
####  安装类库
添加 `--save` 会将类库名称写入 `bower.json` 文件中  
```bash
bower install <lib> --save
```
#### 更新类库
```bash
bower update <lib> 
```

#### 卸载类库
```bash
bower uninstall <lib>
```
### 配置
新建一个 `.bowerrc` 文件，在该文件里写相关配置 ，例如 bower 的默认下载文件夹
```json
{
	"directory": "lib"
}
```
## Gulp
### 安装
1. 创建 `package.json`，填入一些初始化信息
```
npm init 
```
2. 安装gulp
```
npm install --save-dev gulp
```
3. 创建 `gulpfile.js`文件
4. 运行gulp
```
gulp <task name>
```

### 错误处理
使用 `gulp-plumber` 插件  
使用示例
```js
var gulp = require('gulp');  
var less = require('gulp-less');  
var csso = require('gulp-csso');  
var plumber = require('gulp-plumber');

gulp.task('less', function() {  
  return gulp.src('less/app.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(csso())
      .pipe(gulp.dest('./dist'))
});
```

### 配置WebServer
**安装 [`gulp-connect`](https://github.com/avevlad/gulp-connect) 插件**
```bash
npm install --save-dev gulp-connect
```

**定义web服务**
```js
var connect = require("gulp-connect");

gulp.task("webServer", function() {
    connect.server({
        port: 80
    });
});
```

**配置实时刷新**
```js
gulp.task("webServer", function () {
    connect.server({
        port: 80,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task("watch", function () {
    gulp.watch("./*.html", ["html"])
});

gulp.task('default', ['webServer', 'watch']);
```

### 编译Less
**安装gulp-less插件**
```bash
npm install --save-dev gulp-less
```
**配置**
```js
var less = require("gulp-less");

gulp.task('less', function() {
   gulp.src("less/*.less")
       .pipe(less())
       .pipe(gulp.dest("css"))
       .pipe(connect.reload());
});

gulp.task("watch", function () {
    gulp.watch("./less/*.less", ["less"]);
});


gulp.task('default', ['webServer', 'watch', 'less']);
```

## Gulp集成Bower
可以试试下面几个插件
* [main-bower-files](https://www.npmjs.com/package/main-bower-files)
* [gulp-bower](https://www.npmjs.com/package/gulp-bower)
* [How can I integrate Bower with Gulp.js?](http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js)

如果上述不能满足需求，可以直接将对应的类库拷贝一下，下面是一个示例
```js
var gulp = require("gulp");

gulp.task("move", function() {
    return gulp.src(
        ['./bower_components/bootstrap/dist/js/**/*bootstrap*js',
            './bower_components/bootstrap/dist/css/**/*bootstrap*css',
            './bower_components/bootstrap/dist/fonts/**/*'],
        {
            base:'./bower_components'
        }
    ).pipe(gulp.dest('lib'))
});
```
