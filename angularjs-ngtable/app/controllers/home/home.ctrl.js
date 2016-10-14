/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', 'NgTableParams', function ($scope, NgTableParams) {
    var vm = this;
    var data = [{name: "Moroni", age: 50} /*,*/];
    vm.tableParams = new NgTableParams({}, { dataset: data});

}]);