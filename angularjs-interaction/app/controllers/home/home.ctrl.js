/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var vm = this;
    vm.username= "zhangjikai";

    vm.click = function() {
        $rootScope.$broadcast("ctrlValue", [2,3])
    };

    $scope.$on("drctValue", function(event, mass) {
        console.log(mass);
    });
}]);