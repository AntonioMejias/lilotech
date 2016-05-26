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

        vm.animate.manilla = 'manillaAnimate';   
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
    }

    function _animateTheDoor(argument) {
        console.log("termino la transition");
        $scope.$apply(function() {
            //vm.animate.puerta = "openingDoor";
            setTimeout(function() {
                $scope.$apply(function() {
                    //_login()
                });
            }, 750)
        });
    }
}