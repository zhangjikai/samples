angular.module('app.core').directive('helloDrct', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function($scope, $element, $attr, $ngModel) {
            $element.bind('click', function() {
                  alert("click");
            })
        }
    }
});
