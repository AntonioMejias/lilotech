/* global */
'use strict';

angular
    .module('lilotech')
    .controller("DetailController", DetailController);

DetailController.$inject = ['MockService','UtilService'];

function DetailController(MockService,UtilService) {

    var vm = this;
    constructor();

    function constructor(){
    	
    	/*---Mock---*/
        vm.elements = MockService.elements;

        vm.elementsD = MockService.elementsD;
        //vm.message = UtilService.prueba;
    }


}