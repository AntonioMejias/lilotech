/* global */

'use strict';

angular.module('lilotech', ['ionic', 'ngResource', 'LocalStorageModule'])

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'source/components/login/login-view.html',
        controller : 'LoginController as login'

    })

    .state('home', {
        url: '/home',
        templateUrl: 'source/components/home/home-view.html',
        controller : 'HomeController as home'

    });


});