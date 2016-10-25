angular.module('app.core').directive('helloDrct', function($rootScope) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function($scope, $element, $attr, $ngModel) {
            $element.bind('click', function() {
                 /* alert("click");*/
                $rootScope.$broadcast("ctrlValue", [7,8])
            })

            $scope.$on("ctrlValue", function(event, mass) {
                console.log(mass);
            });
        }
    }
});
