/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = ['SubItems' ,'$state'];

function BaseController(SubItems,$state) {
    var vm = this;
    constructor();

    function constructor(){
        vm.onClickBack = _onClickBack;
        
    	if(SubItems === null){
    		vm.classHeader = "bar-header-lg";
    	}else{
    		vm.elements = SubItems;
    	}
        
    	console.log("base");
    }

    function _onClickBack(){

        $state.go('home');
       
    }
}