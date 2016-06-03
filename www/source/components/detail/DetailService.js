/* global _*/
'use strict'

angular
	.module('lilotech')
	.service("DetailService", DetailService);

DetailService.$inject = ['ApiService', '$q'];

function DetailService(AuthService, $q) {
	var vm = this;

	
}