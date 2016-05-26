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
    /*.state('index', {
        url: '/login',
        views : {
            "login": {
                templateUrl: "source/components/login/loginView.html",
                controller : "LoginController as login"
            }
        }
    })*/

    .state('home', {
        url: '/home',
        views : {
            "navbar": {
                templateUrl: "source/shared/master/_navbar.html",
                controller : "BaseController as base",
                resolve : {
                    SubItems: function () {
                        return null;
                    }
                }
            },
            "home": {
                templateUrl: "source/components/home/homeView.html",
                controller : "HomeController as home"
            }
        }
    })

    .state('detail', {
        url: '/detail',
        views : {
            "navbar": {
                templateUrl: "source/shared/master/_navbarsub.html",
                controller : "BaseController as base",
                resolve : {
                    SubItems: function (MockService) {
                        return MockService.elements;
                    }
                }
            },
            "home": {
                templateUrl: "source/components/detail/detailView.html",
                controller : "DetailController as detail"
            }
        }
    })


});