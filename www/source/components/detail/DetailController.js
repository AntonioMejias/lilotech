/* global */
'use strict';

angular
    .module('lilotech')
    .controller("DetailController", DetailController);

DetailController.$inject = ['MockService'];

function DetailController(MockService) {

    var vm = this;
    constructor();

    function constructor(){
    	
    	/*---Mock---*/
        vm.elements = MockService.elements;

        vm.elementsD = MockService.elementsD;

    }


}