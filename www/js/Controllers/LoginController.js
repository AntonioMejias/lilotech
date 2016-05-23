(function() {
	angular.module('lilotech')
		.controller('LoginCtrl', ['$scope', LoginCtrl]);

	function LoginCtrl($scope) {

		var self = this;
		this.user = {};
		this.animate = {
			"cerradura" : '',
			"puerta" : '',
			"manilla" : ''
		};

		this.message = "hola usuario bienvenido al login";

		this.login = function() {
			self.animate.manilla = 'cerraduraAnimate';

			setTimeout(function() {
				$scope.$apply(function() {
					self.animate.puerta = "openingDoor";
					
				});
				
			}, 750);

		}

	}
})();