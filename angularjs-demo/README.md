# AngularJs Demo

<!-- toc -->

- [资源](#%E8%B5%84%E6%BA%90)
- [运行](#%E8%BF%90%E8%A1%8C)
- [使用](#%E4%BD%BF%E7%94%A8)
  * [配置路由](#%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1)

<!-- tocstop -->

## 资源
* [angularjs-style-guide](https://github.com/mgechev/angularjs-style-guide)

## 运行
```bash
npm install
bower install
gulp
```

## 使用
### 配置路由
AngularJs 可以对指定的 `ng-app` ，定义路由规则，然后通过不同的URL，告诉 `ng-app` 加载哪个页面，在渲染到 `ng-view` 中
**引入文件**
```html
<script type="text/javascript" src="assets/lib/angular/angular.min.js"></script>
<script type="text/javascript" src="assets/lib/angular-route/angular-route.min.js"></script>
```

**编写 template 文件 和 Controller **  
> home.tpl.html

```html
<div class="row" >
    <div class="col-md-12">

        <p>{{ home.username }}</p>
    </div>
</div>
```
> home.ctrl.js

```js
angular.module('app.core').controller('HomeCtrl', ['$scope', function($scope) {
    var vm = this;
    vm.username= "zhangjikai";
}]);
```

**定义路由规则**
```js
angular.module('app.routes', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl:'app/controllers/home/home.tpl.html',
            controller: 'HomeCtrl as home'
        })

};
```
