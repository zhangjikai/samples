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

    $scope.gridOptions.data = [
        {name: "zhangjk", age: 10, image: "images/002.png"}
    ];

    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;
    for (var i = 0; i < $scope.gridOptions.data.length; i++) {
        singleData = $scope.gridOptions.data[i];
        imgReady(singleData.image, function () {
            if (this.width > maxImgWidth) {
                console.log(this.width);
                maxImgWidth = this.width;
                trackProcess();
                /*$scope.gridOptions.columnDefs[2].width = this.width;*/
            }
        })
    }

    function defTables() {
        $scope.gridOptions.columnDefs = [
            {name: 'name', width: 80, pinnedLeft: true, enableSorting: false, enableCellEdit: false},
            {name: 'age', width: 80, pinnedLeft: true, enableSorting: false,},
            /*{ name:'address', width: "*",   cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'}*/
            {
                name: 'image',
                width: maxImgWidth,
                enableSorting: false,
                enableCellEdit: false,
                cellTemplate: '<img src="{{row.entity.image}}" height="40">'
            }
        ];
    }


    function trackProcess() {
        imageNums++;
        if (imageNums == $scope.gridOptions.data.length) {
            defTables();
        }
    }


    /* $scope.gridOptions.columnDefs[2].width = 500;*/

}]);