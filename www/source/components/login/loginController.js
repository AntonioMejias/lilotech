(function() {
	'use strict';

	angular.module('lilotech')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$http','$state','localStorageService'];

	function LoginController($scope, $http, $state, localStorageService) {

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
			self.imgPath = {
				'iconapp' : 'img/iconoapp.png',
				'cerradura' : 'img/registrarse.png',
				'manilla' :'img/manilla.png'
			}

			manillaElement = document.getElementById('manillaButton');
			manillaElement.addEventListener("transitionend", animateTheDoor, true);

			function animateTheDoor(argument) {
				console.log("termino la transition");
				$scope.$apply(function() {
					self.animate.puerta = "openingDoor";
					setTimeout(function () {
						$scope.$apply(function() {
							$state.go('home');
						});
					},750)
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

			/*$http
				.post(request.url, request.data, request.config)
				.then(function(response) { // success callback
					console.log(response);
					},
					function(response) { // failure callback

					})*/

			localStorageService.set(user, self.user);
			console.log(self.user);
			console.log(localStorageService.get(user));
		}



	}

}());