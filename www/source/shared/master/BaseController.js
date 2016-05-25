/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = [];

function BaseController() {

    var vm = this;
    constructor();

    function constructor(){
    	console.log("base");
    }
}