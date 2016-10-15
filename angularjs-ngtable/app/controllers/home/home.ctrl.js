/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', '$window',function ($scope,$window) {
    var vm = this;
    /*var data = [{name: "Moroni", age: 50}, {name: "zhangjk", age: 24}];
     vm.tableParams = new NgTableParams({}, {dataset: data});*/

    vm.showTable = false;



    console.log(document.getElementById('img').width);
    var tableData = [
        {name: "zhangjk", age: 10, image: "images/002.png"},
        {name: "zhangjk", age: 10, image: "images/002.png"},
        {name: "zhangjk", age: 10, image: "images/002.png"},
        {name: "zhangjk", age: 10, image: "images/002.png"},
        {name: "zhangjk", age: 10, image: "images/002.png"}
    ];

    $scope.gridOptions = {
        enableColumnMenus: false,
        enableAutoFitColumns: true,
        resizable: true


    };

    $scope.gridOptions.columnDefs = [
        {name: 'name', width: 80, pinnedLeft: true, enableSorting: false, enableCellEdit: false},
        {name: 'age', width: 80, pinnedLeft: true, enableSorting: false,},
        /*{ name:'address', width: "*",   cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'}*/
        {
            name: 'image',
            width: "*",
            enableSorting: false,
            enableCellEdit: false,
            resizable: true,
            cellTemplate: '<div><img src="{{row.entity.image}}" height="40"></div>'
        }
    ];

    $scope.gridOptions.data = tableData;
    vm.showTable = true;

    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;


    for (var i = 0; i < tableData.length; i++) {
        singleData = tableData[i];
        imgReady(singleData.image, function () {
            this.width = this.width * 40 / this.height;
            if (this.width > maxImgWidth) {

                maxImgWidth = this.width;
            }
            trackProcess();
        })
    }


    function defTables() {
        console.log(2222);

    }


    function trackProcess() {
        imageNums++;
        if (imageNums == tableData.length) {
            defTables();
        }
    }


    /* $scope.gridOptions.columnDefs[2].width = 500;*/

}]);