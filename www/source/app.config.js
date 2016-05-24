angular.module('lilotech')

	.config(['$httpProvider', 'jwtInterceptorProvider', function Config($httpProvider, jwtInterceptorProvider) {

	}])
	.config(function(localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('lilotech');
	});