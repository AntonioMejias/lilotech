/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController", LoginController);

LoginController.$inject = ['LoginService', '$state', '$scope'];

function LoginController(LoginService, $state, $scope) {

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
        LoginService
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

    function _login() {
        LoginService.login({
            "username": vm.username,
            "password": vm.password
        }).then(
            function(success) {
                console.log(success);
                $state.go('home');

            },
            function(error) {
                console.log(error);
            }
        );
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