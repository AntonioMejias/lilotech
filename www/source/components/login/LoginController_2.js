/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController_2", LoginController_2);

LoginController_2.$inject = ['LoginService_2', '$state' ,'$scope'];

function LoginController_2(LoginService_2, $state, $scope) {

    var vm = this;
    constructor();

    function constructor() {
        var manillaElement;
        vm.user = {};
        vm.animate = {
            "cerradura": '',
            "puerta": '',
            "manilla": ''
        }

        manillaElement = document.getElementById('manillaButton');
        manillaElement.addEventListener("transitionend", _animateTheDoor, true);
        vm.onClickLogin = _onClickLogin;
    }

    function _onClickLogin() {

         LoginService_2
            .validateEmptyInput(vm.user)
            .then(function(success) { //success
                console.log("campos bien");
                vm.animate.manilla = 'manillaAnimate';
            }, function(response) { // error
                /*$cordovaToast.show(response.message, 'short', 'bottom').then(function(success) {
                    console.log("The toast was shown");
                }, function(error) {
                    console.log("The toast was not shown due to " + error);
                });*/

                console.log(response.message);
            }) 
    }

    function _login(){
        LoginService_2.login({
            "username": vm.username,
            "password": vm.password
        }).then(
            function(success) {
                $state.go('home');
                
            },
            function(error) {
                console.log(error);
            }
        );

        /* var request = {
                url: 'https://device.lilotechnology.com/api/login',
                data: vm.user,
                config: {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            }

            //self.animate.manilla = 'cerraduraAnimate';

            $http
                .post(request.url, request.data, request.config)
                .then(function(response) { // success callback
                    console.log(response);
                    },
                    function(response) { // failure callback

                    })*/
    }

    function _animateTheDoor(argument) {
        console.log("termino la transition");
        $scope.$apply(function() {
            vm.animate.puerta = "openingDoor";
            setTimeout(function() {
                $scope.$apply(function() {
                    _login()
                });
            }, 750)
        });
    }
}