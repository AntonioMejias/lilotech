(function() {
	'use strict';

	angular
		.module('lilotech')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$http'];

	function AuthService($http) {
		var vm = this;
		vm.Authenticate = Authenticate;

		function Authenticate(data) {
			var Headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};
			console.log('vamos a hacerlo');
			return $http({
				method: 'POST',
				headers: Headers,
				url: 'https://device.lilotechnology.com/api/login',
				transformRequest: _transformRequest,
				data: data,

			}); //Devuelve la promesa con la respuesta del servidor

			function _transformRequest(obj) {
				var str = [];
				for (var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			} //Codifica el JSON al formato x-www-form-urlencoded 
		}
	}

}());