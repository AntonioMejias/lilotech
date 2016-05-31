/* global _*/
'use strict'

angular
	.module('lilotech')
    .service("MockService", MockService);

MockService.$inject = [];

function MockService(ApiService, $q) {
	var vm = this;

	vm.elements = [
        {
            label : "Cocina",
            class : ""
        },
        {
            label : "Salón",
            class : ""
        },
        {
            label : "",
            class : ""
        },
        {
            label : "",
            class : ""
        },
        {
            label : "Dormitorio",
            class : "activate"
        },
        {
            label : "Baño",
            class : ""
        },
        {
            label : "",
            class : ""
        },
        {
            label : "Lavadero",
            class : ""
        }
    ];

    //Elementos de detalles
    vm.elementsD = [
        {
            label : "Enchufe 1",
            image: "img/enchufe_1.png"
        },
        {
            label : "Bombilla",
            image: "img/bombilla_.png"
        },
        {
            label : "Enchufe",
            image: "img/enchufe.png"
        }
    ];


	
}
