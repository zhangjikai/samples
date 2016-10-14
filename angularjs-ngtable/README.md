# AngularJs NgTable
[地址](https://github.com/esvit/ng-table)

## 基本示例
1. 引入相关文件
2. 声明 `module`
```js
angular.module("angularjs-ngtable", ["ngTable"]);
```
3. html template
```html
<table ng-table="home.tableParams" class="table" show-filter="true">
    <tr ng-repeat="user in $data">
        <td title="'Name'" filter="{ name: 'text'}" sortable="'name'">
            {{user.name}}</td>
        <td title="'Age'" filter="{ age: 'number'}" sortable="'age'">
            {{user.age}}</td>
    </tr>
</table>
```
4. js controller
```js
angular.module('app.core').controller('HomeCtrl', ['$scope', 'NgTableParams', function ($scope, NgTableParams) {
    var self = this;
    var data = [{name: "Moroni", age: 50} /*,*/];
    self.tableParams = new NgTableParams({}, { dataset: data});
}]);

```
