/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', function ($scope) {

    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;

    var rowData = [

        {ratio: 0.8, image: "images/001.png", id: 0},
        {ratio: 0.05, image: "images/002.png", id: 1},
        {ratio: 0.15, image: "images/003.png", id: 2}

    ];

    var ratioCopy = [];
    rowData.forEach(function (data, index) {
        ratioCopy[index] = data.ratio;
    });
    console.log(ratioCopy);


    var columnDefs = [
        {
            headerName: '',
            checkboxSelection: true,
            suppressSorting: true,
            suppressMenu: true,
            pinned: true,
            width: 30,
            cellClass: "custom-cell",
            headerCellTemplate: headerCellRendererFunc
            /*headerCellTemplate: "<span><input type='checkbox' id='picb' style='width:20px;'></span>"*/

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
        suppressRowClickSelection: true,
        enableColResize: true,
        onGridReady: resizeTable,
        onSelectionChanged: selectionChange
    };

    /*function headerCellRendererSelectAll(params) {
     var cb = document.createElement('input');
     cb.setAttribute('type', 'checkbox');
     cb.setAttribute('id', 'selectAllCheckbox');

     var eHeader = document.createElement('label');
     var eTitle = document.createTextNode(params.colDef.headerName);
     eHeader.appendChild(cb);
     eHeader.appendChild(eTitle);

     cb.addEventListener('change', function (e) {
     if ($(this)[0].checked) {
     _.forEach(vm.gridOptions.api.getModel().rowsAfterFilter, function (node) {
     node.setSelected(true);
     });
     } else {
     _.forEach(vm.gridOptions.api.getModel().rowsAfterFilter, function (node) {
     node.setSelected(false);
     });
     }
     });
     return eHeader;
     }*/


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

    function selectionChange() {
        var selectedRows = $scope.gridOptions.api.getSelectedRows();
        /*var selectIds = {};*/
        var map = new HashMap();

        var totalRatio = 0.0;
        var usedRatio = 0.0;
        var ratio2 = 0.0;
        selectedRows.forEach(function (selectedRow, index) {
            totalRatio = intAdd(totalRatio, ratioCopy[selectedRow.id]);
        });

        console.log("totalRatio: " + totalRatio);

        selectedRows.forEach(function (selectedRow, index) {
            if (index == selectedRows.length - 1) {
                map.set(selectedRow.id, (100 - usedRatio * 100) / 100.0);

            } else {
                ratio2 = reCalRatio(totalRatio, ratioCopy[selectedRow.id]);
                usedRatio = intAdd(usedRatio, ratio2);
                map.set(selectedRow.id, ratio2);

            }
        });


        var updatedNodes = [];
        // look for all the 'Jillian' nodes
        $scope.gridOptions.api.forEachNode(function (node) {
            var data = node.data;
            if (map.has(data.id)) {
                data.ratio = map.get(data.id);
            } else {
                data.ratio = 0;
            }
            updatedNodes.push(node);
        });

        $scope.gridOptions.api.refreshCells(updatedNodes, ['ratio']);


        var checkbox = document.getElementById("_check_all");
        if(selectedRows.length == ratioCopy.length) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }


    }

    function intAdd(a, b) {
        return Math.floor(a * 100 + b * 100) / 100.0;
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
        var area_width = document.getElementById("table_panel").clientWidth - 130;
        console.log(area_width);
        if (area_width > maxImgWidth) {
            maxImgWidth = area_width;
        }
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