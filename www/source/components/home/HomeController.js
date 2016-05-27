/* global */
'use strict';

angular
    .module('lilotech')
    .controller("HomeController", HomeController);

HomeController.$inject = ['MockService','$state'];

function HomeController(MockService, $state) {

    var vm = this;
    constructor();

    function constructor(){
    	console.log("home");
        vm.onClickDetail = _onClickDetail;
        /*---Mock---*/
        vm.elements = MockService.elements;
    }

    function _onClickDetail(){
    	
    	$state.go('detail');
       
    }
}