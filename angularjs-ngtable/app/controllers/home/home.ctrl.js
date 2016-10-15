/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) {
    var vm = this;
    /*var data = [{name: "Moroni", age: 50}, {name: "zhangjk", age: 24}];
    vm.tableParams = new NgTableParams({}, {dataset: data});*/


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

   /* $scope.gridOptions.columnDefs[2].width = 500;*/

}]);