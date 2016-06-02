angular.module('lilotech')

.config(function(localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('lilotech');
	})
.config(['$httpProvider', 'jwtInterceptorProvider',
	function Config($httpProvider, jwtInterceptorProvider) {

			jwtInterceptorProvider.tokenGetter = ['localStorageService',function(localStorageService) {
				var jwtToken;
				//console.log("obteniendo el token" + localStorageService.get(jwtToken))
				return localStorageService.get(jwtToken);
			}];

			$httpProvider.interceptors.push('jwtInterceptor');
		}
	])
	