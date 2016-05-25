/* global */

'use strict';

angular.module('lilotech')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('index', {
        url: '/login',
        views : {
            "login": {
                templateUrl: "source/components/login/loginView.html",
                controller : "LoginController as login"
            }
        }
    })

    .state('home', {
        url: '/home',
        views : {
            "navbar": {
                templateUrl: "source/shared/master/_navbar.html",
                controller : "BaseController as base"
            },
            "home": {
                templateUrl: "source/components/home/homeView.html",
                controller : "HomeController as home"
            }
        }
    });


});