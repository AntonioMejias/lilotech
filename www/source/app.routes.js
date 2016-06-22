/* global */

'use strict';

angular.module('lilotech')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('index', {
            url: '/login',
            views: {
                "login": {
                    templateUrl: "source/components/login/loginView.html",
                    controller: "LoginController as login"
                }
            }
        })

    .state('home', {
        url: '/home',
        views: {
            "navbar": {
                templateUrl: "source/shared/master/_navbar.html",
                controller: "BaseController as base",
                resolve: {
                    Rooms: function() {
                        return null;
                    }
                }
            },
            "home": {
                templateUrl: "source/components/home/homeView.html",
                controller: "HomeController as home"
            }
        }
    })

    .state('principal', {
        url: '/principal/:idRoom',
        views: {
            "navbar": {
                templateUrl: "source/shared/master/_navbarsub.html",
                controller: "BaseController as base",
                params: {
                    'idRoom': null
                },
                resolve: {
                    Rooms: function(RoomService) {
                        /*if (localStorageService.get("rooms")) {
                            console.log("retornando desde el localStorageService");
                            return localStorageService.get("rooms");
                        }

                        localStorageService.set("rooms", RoomService.getRooms());
                        return localStorageService.get("rooms");*/

                        return RoomService.getRooms();
                    }

                }
            },
            "home": {
                templateUrl: "source/components/principal/principalView.html",
                params: {
                    'idRoom': null
                },
                controller: "PrincipalController as principal"
            }
        }
    })


});