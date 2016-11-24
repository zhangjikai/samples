/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.core').controller('HomeCtrl', ['$scope', '$uibModal',function($scope, $uibModal) {
    var vm = this;

    vm.open = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'app/controllers/home/model.tpl.html',
            controller: 'ModelCtrl as model',
            size: "middle"
        });
    }
}]);