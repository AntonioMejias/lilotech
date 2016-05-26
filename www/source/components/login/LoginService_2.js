/* global _*/
'use strict'

angular
	.module('lilotech')
	.service("LoginService_2", LoginService_2);

LoginService_2.$inject = ['ApiService', '$q'];

function LoginService_2(ApiService, $q) {
	var urlBase = "/api/status/";
	var vm = this;

	/*Metodo para login*/
	vm.login = function(data) {
		var deferred = $q.defer();

		deferred.resolve(true);

		return deferred.promise;
	}

	/*Metodo para validar si los campos de un usario estan vacios || Devuelve una promesa */
	vm.validateEmptyInput = function(userData) {
		var deferred = $q.defer();

		if (!userData.email || !userData.password) {
			deferred.reject({
				message: 'Debe rellenar todos los campos'
			})
		} else {
			deferred.resolve(true)
		}

		return deferred.promise;
	}
}