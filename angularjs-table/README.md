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
    // 行高
    rowHeight: 45,
    // 设置只能通过checkbox选择
    suppressRowClickSelection: true,
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
    // 是否固定列，['left', 'right']
    pinned: true,
    表格标题模板
    headerCellTemplate: "<span><input type='checkbox' id='picb' style='width:20px;'></span>"
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

### 添加全选
* 配置 `columnDefs`
```js
var columnDefs = [
    {
        headerName: '',
        checkboxSelection: true,
        pinned: true,
        width: 30,
        cellClass: "custom-cell",
        headerCellTemplate: headerCellRendererFunc
    }
];
```

* 编写 `headerCellRendererFunc` 函数 (使用了jquery)
```js
function headerCellRendererFunc(params) {
    var cb = document.createElement('input');
    cb.setAttribute('type', 'checkbox');
    cb.setAttribute('checked', 'checked');
    cb.setAttribute('id', '_check_all');
    var eHeader = document.createElement('span');
    eHeader.setAttribute("class", "check_all")
    var eTitle = document.createTextNode(params.colDef.name);
    eHeader.appendChild(cb);
    eHeader.appendChild(eTitle);
    cb.addEventListener('change', function (e) {
        if ($(this)[0].checked) {
            $scope.gridOptions.api.selectAll();
        } else {
            $scope.gridOptions.api.deselectAll();
        }
    });
    return eHeader;
}
```

* 设置样式
```css
.custom-cell {
  line-height: 45px;
  font-family: "sans-serif";
  font-size: 14px;
  text-align: center;
}
.check_all {
  padding-right: 5px;
}
```

* 判断是否应该选中全选按钮
```js
function selectionChange() {
    ......
    var checkbox = document.getElementById("_check_all");
    if(selectedRows.length == ratioCopy.length) {
         checkbox.checked = true;
    } else {
         checkbox.checked = false;
    }
}
```