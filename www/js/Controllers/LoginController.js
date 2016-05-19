(function() {
	angular.module('lilotech')
		.controller('LogiCtrl', ['$scope', LoginCtrl]);

	function LoginCtrl($scope) {

		var self = this;
		this.user = {};
		this.message = "hola usuario bienvenido al login";

	}
})();