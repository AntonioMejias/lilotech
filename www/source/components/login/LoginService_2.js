/* global _*/
'use strict'

angular
	.module('lilotech')
    .service("LoginService_2", LoginService_2);

LoginService_2.$inject = ['ApiService', '$q'];

function LoginService_2(ApiService, $q) {
	var urlBase = "/api/status/";
	var vm = this;

	vm.login = function(data){
		var deferred = $q.defer();

		deferred.resolve(true);

		return deferred.promise;
	}
}