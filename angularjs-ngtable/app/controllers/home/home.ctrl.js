/**
 * Created by ZhangJikai on 2016/10/12.
 */
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


    this.change = function() {
        //$scope.gridOptions.api.sizeColumnsToFit();

        var columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {
                headerName: "image",
                field: "image",
                width: 1000,
                template: '<div><img src="{{data.image}}"  height="100"></div>'
            }
        ];


        var rowData2 = [
            {make: "111", model: "Celica", image: "images/002.png"},
            {make: "Ford", model: "Mondeo", image: "images/002.png"},
            {make: "Porsche", model: "Boxter", image: "images/002.png"}
        ];


        $scope.gridOptions.api.setColumnDefs(columnDefs);

        $scope.gridOptions.api.setRowData(rowData2);

    }




    var maxImgWidth = 0;
    var imageNums = 0;
    var singleData;



    var images = new Array(3), imageNums = 0;

    function loadImages() {
        for (var i = 0; i < images.length; i++) {
            images[i] = new Image();
            images[i].addEventListener("load", trackProcess, true);
            images[i].src = "images/002.png";
        }
    }

    function trackProcess() {
        imageNums++;
        if (imageNums == images.length) {
            defTables();
        }
    }

    loadImages();

    function defTables() {

        for (var i = 0; i < images.length; i++) {
            if(images[i].width > maxImgWidth) {
                maxImgWidth = images[i].width;
            }
        }

        var columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {
                headerName: "image",
                field: "image",
                width: maxImgWidth,
                template: '<div><img src="{{data.image}}"  height="100"></div>'
            }
        ];

        $scope.gridOptions.api.setColumnDefs(columnDefs);


    }

    for (var i = 0; i < rowData.length; i++) {
        singleData = rowData[i];
        imgReady(singleData.image, function () {
            this.width = this.width * 100 / this.height;
            if (this.width > maxImgWidth) {

                maxImgWidth = this.width;
            }
            trackProcess();
        })
    }

    function defTables() {
        console.log(maxImgWidth);
        var columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {
                headerName: "image",
                width: maxImgWidth,
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


    function trackProcess() {
        imageNums++;
        if (imageNums == rowData.length) {

            defTables();
        }
    }


    //var model = $scope.gridOptions.api.getModel();


    /* $scope.gridOptions.columnDefs[2].width = 500;*/

}]);