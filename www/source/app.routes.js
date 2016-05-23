/* global */

'use strict';

angular.module('lilotech')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'source/components/login/login-view.html',
        controller : 'LoginController',
        controllerAs: 'login'
    })

    .state('home', {
        url: '/home',
        templateUrl: 'source/components/home/home-view.html',
        controller : 'HomeController as home'

    });


});