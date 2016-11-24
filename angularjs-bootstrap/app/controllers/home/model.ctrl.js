/**
 * Created by ZhangJikai on 2016/11/24.
 */

angular.module('app.core').controller('ModelCtrl', ['$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
    var vm = this;
    vm.ok = function() {
        $uibModalInstance.close();
    }
    vm.cancel = function() {
        $uibModalInstance.dismiss();
    }
}]);