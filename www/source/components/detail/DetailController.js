/* global */
'use strict';

angular
    .module('lilotech')
    .controller("DetailController", DetailController);

DetailController.$inject = [];

function DetailController() {

    var vm = this;
    constructor();

    function constructor(){
    	
    	/*---Mock---*/
        vm.elements = MockService.elements;
    }
}