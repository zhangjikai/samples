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
```
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
