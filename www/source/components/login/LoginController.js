(function() {
	'use strict';

	angular.module('lilotech')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$http','localStorageService'];

	function LoginController($scope, $http, localStorageService) {

		var self = this;
		var user;

		constructor()

		function constructor(argument) {
			var manillaElement;
			self.user = {};
			self.animate = {
				"cerradura": '',
				"puerta": '',
				"manilla": ''
			}
			manillaElement = document.getElementById('manillaButton');
			manillaElement.addEventListener("transitionend", animateTheDoor, true);

			function animateTheDoor(argument) {
				console.log("termino la transition");
				$scope.$apply(function() {
					self.animate.puerta = "openingDoor";
				});
			}
		}

		this.message = "hola usuario bienvenido al login";

		this.login = function() {
			var request = {
				url: 'https://device.lilotechnology.com/api/login',
				data: self.user,
				config: {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				}
			}

			self.animate.manilla = 'cerraduraAnimate';

			$http
				.post(request.url, request.data, request.config)
				.then(function(response) { // success callback
					console.log(response);
					},
					function(response) { // failure callback

					})

			localStorageService.set(user, self.user);
			console.log(self.user);
			console.log(localStorageService.get(user));
		}



	}

}());