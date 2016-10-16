/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) {

    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;

    var rowData = [

        {ratio: 0.8, image: "images/002.png", id: 0},
        {ratio: 0.05, image: "images/002.png", id: 1},
        {ratio: 0.15, image: "images/002.png", id: 2}

    ];


    var columnDefs = [
        {
            headerName: '',
            checkboxSelection: true,
            suppressSorting: true,
            suppressMenu: true,
            pinned: true,
            width: 30,
            cellClass: "custom-cell"
        },
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
        onGridReady: resizeTable,
        onSelectionChanged: selectionChange
    };

    function selectionChange() {
        var selectedRows = $scope.gridOptions.api.getSelectedRows();
        /*var selectIds = {};*/
        var map = new HashMap();

        var totalRatio = 0.0;
        var usedRatio = 0.0;
        var ratio2 = 0.0;
        selectedRows.forEach(function (selectedRow, index) {
            totalRatio += selectedRow.ratio;
        });

        console.log(totalRatio);

        selectedRows.forEach(function (selectedRow, index) {

            if (index == selectedRows.length - 1) {
                map.set(selectedRow.id, (100 - usedRatio * 100) / 100.0);

            } else {
                ratio2 = reCalRatio(totalRatio, selectedRow.ratio);
                // console.log(ratio2);
                usedRatio = (usedRatio * 100 + ratio2 * 100) / 100.0;
                map.set(selectedRow.id, ratio2);
                /*console.log(1 -usedRatio)*/
            }


        });

        /*map.forEach(function (value, key) {
         console.log(key + " : " + value);
         });*/

        /*rowData.forEach(function (data, index) {
            if(map.has(data.id)) {
                data.ratio = map.get(data.id);
            } else {
                data.ratio = -1;
            }
        });*/

        var updatedNodes = [];
        // look for all the 'Jillian' nodes
        $scope.gridOptions.api.forEachNode( function(node) {
            var data = node.data;
            if(map.has(data.id)) {
                data.ratio = map.get(data.id);
            } else {
                data.ratio = 0;
            }
            updatedNodes.push(node);
        });

        $scope.gridOptions.api.refreshCells(updatedNodes, ['ratio']);


        /*$scope.gridOptions.api.setRowData(rowData);*/




        /*var unSelectedRows = $scope.gridOptions.api.getUns
         console.log(selectedRows);*/
    }


    function reCalRatio(totalRatio, preRatio) {
        var ra = 0;
        ra = parseInt(preRatio / totalRatio * 100) / 100.0;
        return ra;
    }

    // 自适应images
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