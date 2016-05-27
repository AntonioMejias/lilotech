/* global _*/
'use strict'

angular
	.module('lilotech')
	.service("LoginService_2", LoginService_2);

LoginService_2.$inject = ['AuthService', '$q'];

function LoginService_2(AuthService, $q) {
	var urlBase = "/api/status/";
	var vm = this;

	/*Metodo para login*/
	vm.login = function(data) {
		console.log('estoy aqui');
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