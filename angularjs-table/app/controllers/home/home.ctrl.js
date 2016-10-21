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

    var ratioCopy = [];
    for(var i = 0; i < rowData.length; i++) {
        ratioCopy[i] = rowData[i].ratio;
    }


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
        },
        {headerName: "Ratio", field: "ratio", pinned: 'left', width: 60, cellClass: "custom-cell"},
        {
            headerName: "image",
            field: "image",
            template: '<div><img src="{{data.image}}"  height="40"></div>'
        }
    ];


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

    function selectionChange() {
        var selectedRows = $scope.gridOptions.api.getSelectedRows();

        var map = new HashMap();

        selectedRows.forEach(function (selectedRow, index) {
            map.set(selectedRow.id, ratioCopy[selectedRow.id]);
        });

        var updatedNodes = [];

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

        console.log(selectedRows.length, ratioCopy.length);

        var checkbox = document.getElementById("_check_all");
        if(selectedRows.length == ratioCopy.length) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
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