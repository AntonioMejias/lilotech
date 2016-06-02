/* global _*/
'use strict'

angular
	.module('lilotech')
	.service("LoginService", LoginService);

LoginService.$inject = ['AuthService', '$q'];

function LoginService(AuthService, $q) {
	var urlBase = "/api/status/";
	var vm = this;

	/*Metodo para login*/
	vm.login = function(data) {
		return AuthService.Authenticate(data); 
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