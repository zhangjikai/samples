/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', 'Upload',function ($scope, Upload) {

    $scope.submitSingle = function () {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    $scope.submitMultiple = function () {
        if ($scope.files && $scope.files.length) {
            $scope.uploadFiles($scope.files);
        }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        //console.log(2222);
        Upload.upload({
            url: 'http://localhost:8080/uploadSingleFile',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            alert("Upload Success");
            $scope.file = undefined;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


    $scope.uploadFiles = function (files) {
        console.log(files);
        /*Upload.upload({
            url: 'http://localhost:8080/uploadMultipleFile',
            data: {file: files }
        }).then(function (resp) {
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            alert("Upload Success");
            $scope.files= [];
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });*/


        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'http://localhost:8080/uploadSingleFile',
                data: {file: file}
            });

            file.upload.then(function (response) {
                console.log("success")
                alert("success");
                $scope.files= [];
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });

    }
    /*console.log(111)*/
    // for multiple files:


}]);