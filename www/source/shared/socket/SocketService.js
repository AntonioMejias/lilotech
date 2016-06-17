(function() {
	'use strict'
	angular
		.module('lilotech')
		.service('SocketService', SocketService)

	SocketService.$inject = ['socketFactory', 'localStorageService', '$rootScope']

	function SocketService(socketFactory, localStorageService, $rootScope) {
		var SocketURl;

		if (localStorageService.get('baseUrlSocket')) {
			SocketURl = localStorageService.get('baseUrlSocket');
		} else {
			SocketURl = localStorageService.get('baseUrlDevice');
		}

		SocketURl = SocketURl.replace(":8550", ":8551")
		SocketURl += "/lilo";
		console.log(SocketURl)

		var socket = io(SocketURl);

		var vm = this
		vm.on = on;
		vm.emit = emit;

		function on(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		}

		function emit(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}

		/*if (localStorageService.get('baseUrlSocket')) {
				SocketURl = localStorageService.get('baseUrlSocket');
			} else {
				SocketURl = localStorageService.get('baseUrlDevice');
			}

			SocketURl = SocketURl.replace(":8550",":8551")
			SocketURl+="/lilo";
			console.log(SocketURl)
		return socketFactory({

			ioSocket: io(SocketURl+"/lilo")

		});*/

	}

})();