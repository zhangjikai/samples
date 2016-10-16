/**
 * Created by ZhangJikai on 2016/10/16.
 */
$scope.gridOptions = {
    angularCompileRows: true,
    rowHeight: 45,
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: 'multiple',
    enableColResize: true,
    onGridReady: resizeTable
};