/* global _*/
'use strict'

angular
	.module('lilotech')
	.service("PrincipalService", PrincipalService);

PrincipalService.$inject = ['ApiService', '$q'];

function PrincipalService(AuthService, $q) {
	var vm = this;

	postconstructor();

	function postconstructor() {
		
	}
}