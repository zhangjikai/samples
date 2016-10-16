/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) {


    var rowData = [

        {ratio: 0.8, image: "images/002.png"},
        {ratio: 0.05, image: "images/002.png"},
        {ratio: 0.15, image: "images/002.png"}

    ];


    var columnDefs = [
        {headerName: '', checkboxSelection: true, suppressSorting: true, suppressMenu: true, pinned: true, width: 30, cellClass: "custom-cell"},
        {headerName: "Ratio", field: "ratio", pinned: 'left', width: 60, cellClass: "custom-cell"},
        {
            headerName: "image",
            field: "image",
            template: '<div><img src="{{data.image}}"  height="40"></div>'
        }
    ];

    $scope.gridOptions = {
        angularCompileRows: true,
        rowHeight: 45,
        columnDefs: columnDefs,
        rowData: rowData,
        rowSelection: 'multiple',
        enableColResize: true,
        onGridReady: resizeTable
    };

    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;


    function resizeTable() {
        for (var i = 0; i < rowData.length; i++) {
            singleData = rowData[i];
            imgReady(singleData.image, function () {
                this.width = this.width * 40 / this.height;
                if (this.width > maxImgWidth) {
                    maxImgWidth = this.width;
                }
                trackProcess();
            })
        }
    }

    function defTables() {
        columnDefs[2].width = maxImgWidth;
        $scope.gridOptions.api.setColumnDefs(columnDefs);
        $scope.gridOptions.api.selectAll();
    }


    function trackProcess() {
        imageNums++;
        if (imageNums == rowData.length) {
            defTables();
        }
    }



}]);