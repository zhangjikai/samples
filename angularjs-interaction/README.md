# AngularJs Communication

<!-- toc -->


## 使用 `$broadcast` 和 `$on` 
`$broadcast` 会将事件广播给所有的controller，`$on` 注册事件
**`Controller` 向 `Directive` 传递消息**
```js
// Controller
angular.module('app.core').controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var vm = this;
    vm.click = function() {
        $rootScope.$broadcast("ctrlValue", [2,3])
    };
    
}]);

// Service
angular.module('app.core').directive('helloDrct', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function($scope, $element, $attr, $ngModel) {
            $scope.$on("ctrlValue", function(event, mass) {
                console.log(mass);
            });
        }
    }
});
```
**`Directive` 向 `Controller`传递消息**
```js
// Controller
angular.module('app.core').controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var vm = this;
    $scope.$on("drctValue", function(event, mass) {
        console.log(mass);
    });
}]);

//Service
angular.module('app.core').directive('helloDrct', function($rootScope) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function($scope, $element, $attr, $ngModel) {
            $element.bind('click', function() {
                $rootScope.$broadcast("ctrlValue", [7,8])
            });
        }
    }
});
```