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
