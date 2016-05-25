/* global */
'use strict';

angular
    .module('lilotech')
    .controller("HomeController", HomeController);

HomeController.$inject = ['MockService'];

function HomeController(MockService) {

    var vm = this;
    constructor();

    function constructor(){
    	console.log("home");

        /*---Mock---*/

        vm.elements = MockService.elements;
    }
}