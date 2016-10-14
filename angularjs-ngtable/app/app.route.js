/**
 * Created by ZhangJikai on 2016/10/12.
 */
angular.module('app.routes', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl:'app/controllers/home/home.tpl.html',
            controller: 'HomeCtrl as home'
        })

};