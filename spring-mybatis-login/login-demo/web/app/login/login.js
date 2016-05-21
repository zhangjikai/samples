/**
 * Created by ZhangJikai on 2016/5/14.
 */
function isEmpty(text) {
    if (text === null || text === undefined || text === "") {
        return true;
    } else {
        return false;
    }
}

function checkEqual(text1, text2) {
    if (text1 == text2) {
        return true;
    } else {
        return false;
    }
}

function checkLength(text, len) {
    if (text.length > len) {
        return true;
    } else {
        return false;
    }
}

function isEmail(text) {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(text)) {
        return true;
    } else {
        return false;
    }
}


var loginModule = angular.module('login', ['ngRoute', 'ui.bootstrap', 'toaster', 'ngAnimate']).controller('loginCtrl', ['$scope',  '$uibModal', '$rootScope','$http', 'toaster',  'ShowLoadService', function ($scope,$uibModal, $rootScope, $http, toaster,  ShowLoadService) {

    $scope.$watch(function(){
        return ShowLoadService.show
    }, function(newValue) {
        $scope.showWaiting = ShowLoadService.show;
    })

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/login/register_modal.html',
            controller: 'RegisterCtrl as reg',
            size: "middle",
            resolve:{
                toaster: function() {
                    return toaster;
                }
            }
        });
    };

    $scope.$watch("username", function(newValue) {
        $scope.unameErr = false;
        $scope.unameMsg = "";
    });

    $scope.$watch("password", function(newValue) {
        //console.log(newValue)
        $scope.passErr = false;
        $scope.passMsg = "";
    });

    $scope.submitLoginForm = function() {

        toaster.clear();

        if(isEmpty($scope.username)) {
            $scope.unameErr = true;
            $scope.unameMsg = "can't empty";
            return;
        }

        if(isEmpty($scope.password)) {
            $scope.passErr = true;
            $scope.passMsg = "can't empty";
            return;
        }

        var datas = {
            "userName" : $scope.username,
            "password" : $scope.password
        }
        var url = "userLogin"
        var p = $http({
            method: 'POST',
            url: url,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Data-Type": "json"
            },
            data: datas
        });

        p.success(function (response) {
            if(response == "username") {
                $scope.unameErr = true;
                $scope.unameMsg = "user doesn't exist";
            }
            if(response == "password") {
                $scope.passErr = true;
                $scope.passMsg = "wrong password";
            }
            if(response == "success") {
                toaster.pop('success', "Login Success");
            }
        });

        p.error(function(response) {
            toaster.pop('error', "Server Internal Error, please retry later");
        });
    }

}]);


loginModule.factory("ShowLoadService", function() {
    return {
        show: false
    }
});

/*loginModule.config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /!**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         *!/
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            console.log(query);
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
});*/



loginModule.controller('RegisterCtrl', ['$scope', 'toaster','$uibModalInstance', '$http', 'ShowLoadService', function ($scope, toaster,$uibModalInstance, $http, ShowLoadService) {

    var vm = this;

    vm.unameErr = false;
    vm.passErr = false;
    vm.passErr2 = false;
    vm.emailErr = false;

    vm.check = function (index) {}

    $scope.$watch('reg.username', function (newValue) {
        if ($scope.regForm.username.$dirty) {
            if (isEmpty(newValue) || !checkLength(newValue, 5)) {
                vm.unameErr = true;
                vm.unameMsg = "At lest 6 characters";
            } else {
                vm.unameErr = false;
                vm.unameMsg = "";
                var url = "checkUsername"
                var p = $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data:"username=" + newValue
                });

                p.success(function (response) {
                    if (response == "yes") {
                        vm.unameErr = true;
                        vm.unameMsg = "Username exists";
                    }

                });
            }

        }

    });

    $scope.$watch('reg.password', function (newValue) {

        if ($scope.regForm.password.$dirty) {
            if (isEmpty(newValue) || !checkLength(newValue, 7)) {
                vm.passErr = true;
                vm.passMsg = "At lest 8 characters";
            } else {
                vm.passErr = false;
                vm.passMsg = "";
            }
        }
    });

    $scope.$watch('reg.password2', function (newValue) {

        if ($scope.regForm.password2.$dirty) {

            if (!checkEqual(newValue, vm.password)) {
                vm.passErr2 = true;
                vm.passMsg2 = "password different";
            } else {
                vm.passErr2 = false;
                vm.passMsg2 = "";
            }
        }

    });

    $scope.$watch('reg.email', function (newValue) {

        if ($scope.regForm.email.$dirty) {

            if (!isEmail(newValue)) {
                vm.emailErr = true;
                vm.emailMsg = "Invaild email";
            } else {
                vm.emailErr = false;
                vm.emailMsg = "";

                var url = "isEmail"
                var p = $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "email=" + newValue
                });

                p.success(function (response) {
                    if (response == "yes") {
                        vm.emailErr = true;
                        vm.emailMsg = "Email exists";
                    }
                });
            }
        }

    });


    $scope.ok = function () {

        toaster.clear();

        $scope.regForm.username.$dirty = true;
        $scope.regForm.password.$dirty = true;
        $scope.regForm.password2.$dirty = true;
        $scope.regForm.email.$dirty = true;
        vm.username = (!isEmpty(vm.username)) ? (vm.username + " ").substr(0, vm.username.length) : "";
        vm.password = (!isEmpty(vm.password)) ? (vm.password + " ").substr(0, vm.password.length) : "";
        vm.password2 = (!isEmpty(vm.password2)) ? (vm.password2 + " ").substr(0, vm.password2.length) : "";
        vm.email = (!isEmpty(vm.email)) ? (vm.email + " ").substr(0, vm.email.length) : "";

        if(isEmpty(vm.username) || isEmpty(vm.password) || isEmpty(vm.password2) || isEmpty(vm.email)) {
            return;
        }
        if (vm.unameErr || vm.passErr || vm.passErr2 || vm.emailErr) {
            return;
        }

        // 显示等待
        ShowLoadService.show = true;

        var datas = {
                "userName": vm.username,
                "password": vm.password,
                "email": vm.email
        };

        var url = "register"
        var p = $http({
            method: 'POST',
            url: url,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Data-Type": "json"
            },
            data: datas
        });

        p.success(function (response) {
            ShowLoadService.show = false;
            toaster.pop('success', "Register Success");
            $uibModalInstance.close();
        });

        p.error(function(response) {
            ShowLoadService.show = false;
            toaster.pop('error', "Register Error");
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
