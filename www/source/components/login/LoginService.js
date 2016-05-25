/* global _*/
'use strict'

angular
	.module('lilotech')
    .service("LoginService", LoginService);

LoginService.$inject = ['ApiService', '$q'];

function LoginService(ApiService, $q) {
	var urlBase = "/api/status/";
	var vm = this;

	vm.login = function(data){
		var deferred = $q.defer();

		deferred.resolve(true);

		return deferred.promise;
	}
}