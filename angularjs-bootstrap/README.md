# AngularJs Bootstrap

<!-- toc -->

- [Model](#model)
  * [使用](#%E4%BD%BF%E7%94%A8)
  * [Model 设置](#model-%E8%AE%BE%E7%BD%AE)
    + [垂直居中](#%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD)

<!-- tocstop -->

## Model
[地址](https://angular-ui.github.io/bootstrap/#/modal)
### 使用
* 引入模块
```
angular.module('app.core', ['ngSanitize', 'ui.bootstrap', 'ngAnimate']);
```
* 使用 `$uibModal` 打开Model
```js
angular.module('app.core').controller('HomeCtrl', ['$scope', '$uibModal',function($scope, $uibModal) {
    var vm = this;
    vm.name = "zhangjk";
    vm.open = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'app/controllers/home/model.tpl.html',
            controller: 'ModelCtrl as model',
            size: "middle"
        });
    }
}]);
```
* Html template
```html
<div class="modal-header">
    <h4 class="modal-title" id="modal-title">Title</h4>
</div>
<div class="modal-body">
    This is body
</div>
<div class="modal-footer">
    <button class="btn btn-primary" type="button" ng-click="model.ok()">OK</button>
    <button class="btn btn-warning" type="button" ng-click="model.cancel()">Cancel</button>
</div>
```
* Controller
```js
angular.module('app.core').controller('ModelCtrl', ['$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
    var vm = this;
    vm.ok = function() {
        $uibModalInstance.close();
    }
    vm.cancel = function() {
        $uibModalInstance.dismiss();
    }
}]);
```
### Model 设置
#### 垂直居中
使用下面的css
```css
.modal {
  text-align: center;
  padding: 0 !important;
}
.modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
```


## 导航
* html
```html
<nav class="navbar navbar-default navbar-inner navbar-custom" role="navigation" ng-controller="NavCtrl as nav">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" ng-click="isNavCollapsed = !isNavCollapsed">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">DEMO</a>
    </div>
    <div class="collapse navbar-collapse" uib-collapse="isNavCollapsed">
        <ul class="nav navbar-nav">
            <li><a href="#">菜单</a></li>
        </ul>
    </div>
</nav>
```
* js
```js
angular.module('app.core').controller('NavCtrl', ['$scope', function ($scope) {
    var vm = this;
}]);
```
* css (仿照FlatUI)
```css
.navbar-inner {
  -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.175);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.175);
}
.navbar-custom .navbar-brand {
  font-family: Orbitron;
  font-size: 30px;
  font-weight: 900;
  color: #FFF;
}
.navbar-custom .navbar-brand:hover {
  color: #FFF;
}
.navbar-custom .navbar-nav li > a {
  color: #FFF;
  font-family: "Microsoft YaHei", "Tahoma", arial;
  font-weight: bold;
  font-size: 14px;
}
.navbar-custom .navbar-nav li > a:hover {
  color: #48CFAD;
}
.navbar {
  border-radius: 0px;
}
.navbar-custom {
  background: #34495e;
  border-color: #34495e;
}
```
