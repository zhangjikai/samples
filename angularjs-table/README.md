#ag-Grid
[ag Grid](https://www.ag-grid.com/)

<!-- toc -->

- [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
- [使用](#%E4%BD%BF%E7%94%A8)
  * [函数](#%E5%87%BD%E6%95%B0)
  * [GridOptions 参数](#gridoptions-%E5%8F%82%E6%95%B0)
  * [ColumnDefs 参数](#columndefs-%E5%8F%82%E6%95%B0)
  * [更新部分数据](#%E6%9B%B4%E6%96%B0%E9%83%A8%E5%88%86%E6%95%B0%E6%8D%AE)

<!-- tocstop -->

## 基本使用
* 引入文件
```html
<link rel="stylesheet" href="lib/ag-grid/dist/styles/ag-grid.css">
<link rel="stylesheet" href="lib/ag-grid/dist/styles/theme-fresh.css">
<script type="text/javascript" src="lib/ag-grid/dist/ag-grid.min.js"></script>
```
* 加载module
```js
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('app.core', ['ngSanitize', 'ui.bootstrap', 'ngAnimate', "agGrid"]);
```
* Html Template
```js
<div ag-grid="gridOptions" class="ag-fresh" style="height:200px;"></div>
```
* Js Controller
```js
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) {
    var rowData = [
        {make: "Toyota", model: "Celica", image: "images/002.png"},
        {make: "Ford", model: "Mondeo", image: "images/002.png"},
        {make: "Porsche", model: "Boxter", image: "images/002.png"}
    ];
    var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {
            headerName: "image",
            field: "image",
            template: '<div><img src="{{data.image}}"  height="100"></div>'
        }
    ];
    $scope.gridOptions = {
        angularCompileRows: true,
        rowHeight: 45,
        columnDefs: columnDefs,
        rowData: rowData,
        enableColResize: true
    };
}
```

## 使用
### 函数

```js
// 设置表格定义
$scope.gridOptions.api.setColumnDefs(columnDefs);
// 设置表格数据
$scope.gridOptions.api.setRowData(rowData2);
// 全选
$scope.gridOptions.api.selectAll();
// 取消全选
$scope.gridOptions.api.deselectAll();
// 获得选中的行
$scope.gridOptions.api.getSelectedRows();
```
### GridOptions 参数
```js
$scope.gridOptions = {
    // column的有angularjs参数时要加此参数
    angularCompileRows: true,
    rowHeight: 45,
    // 行高
    columnDefs: columnDefs,
    rowData: rowData,
    // 数据选择模式
    rowSelection: 'multiple',
    enableColResize: true,
    // 表格加载完成事件
    onGridReady: function
    // 表格选择内容变化
    onSelectionChanged: function
};
```
### ColumnDefs 参数
```js
var columnDef = {
    // 单元格格式
    cellClass: "custom-cell",
    // 是否是checkbox，如果只想要checkbox，可以设置 headerName: '',
    checkboxSelection: true,
}
```
### 更新部分数据
```js
var updatedNodes = [];
// look for all the 'Jillian' nodes
$scope.gridOptions.api.forEachNode( function(node) {
    var data = node.data;
    data.ratio = 0;
    updatedNodes.push(node);
});

$scope.gridOptions.api.refreshCells(updatedNodes, ['ratio']);
```

