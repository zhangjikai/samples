# AngularJs UI Grid
[Angular UI Grid](http://ui-grid.info/)

## 基本使用
1. 引入文件，并加入module
```js
angular.module('app.core', ['ngSanitize', 'ui.bootstrap', 'ngAnimate', 'ui.grid', 'ui.grid.pinning']);
```
2. Html文件
```html
<div class="row">
    <div class="col-md-3">
        <div ui-grid="gridOptions" class="grid"></div>
    </div>
</div>
```
3. Js 文件
```js
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) { 
    $scope.gridOptions = {
        enableColumnMenus: false,
        enableAutoFitColumns: true
    };
    $scope.gridOptions.columnDefs = [
        { name:'name', width:80, pinnedLeft:true, enableSorting: false,enableCellEdit: false },
        { name:'age', width:80, pinnedLeft:true, enableSorting: false,  },
        { name:'address', width: '*', enableSorting: false,enableCellEdit: false, cellTemplate: '<img src="{{row.entity.img}}" height="40">' }
    ];
    $scope.gridOptions.data = [
        {name: "zhangjk", age: 10, img: "images/002.png"}
    ];
}]);
```