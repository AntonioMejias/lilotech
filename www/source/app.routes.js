/* global */

'use strict';

angular.module('lilotech')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'source/components/login/loginView.html',
        controller : 'LoginController as login'
    })

    .state('home', {
        url: '/home',
        templateUrl: 'source/components/home/homeView.html',
        controller : 'HomeController as home'

    });


});