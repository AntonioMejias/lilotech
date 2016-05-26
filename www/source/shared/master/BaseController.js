/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = ['SubItems'];

function BaseController(SubItems) {

    var vm = this;
    constructor();

    function constructor(){
    	if(SubItems === null){
    		vm.classHeader = "bar-header-lg";
    	}else{
    		vm.elements = SubItems;
    	}

    	console.log("base");
    }
}