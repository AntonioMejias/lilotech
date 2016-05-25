/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController_2", LoginController_2);

LoginController_2.$inject = ['LoginService_2', '$state'];

function LoginController_2(LoginService_2, $state) {

    var vm = this;
    constructor();

    function constructor(){
    	vm.onClickLogin = _onClickLogin;
    }

    function _onClickLogin(){

        /*----Mock----*/

        LoginService_2.login({
            "username" : vm.username,
            "password" : vm.password
        }).then(
            function(success){
                $state.go('home');
            }, function(error){
                console.log(error);
            }
        );
    }
}