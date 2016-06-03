angular.module('lilotech')

.constant('BaseUrl', "https://device.lilotechnology.com")

.config(function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('lilotech');
})
.config(['$httpProvider', 'jwtInterceptorProvider',
	function Config($httpProvider, jwtInterceptorProvider) {

		jwtInterceptorProvider.tokenGetter = ['localStorageService',function(localStorageService) {
			//console.log("obteniendo el token" + localStorageService.get(jwtToken))
			return localStorageService.get("jwtToken");
		}];

		$httpProvider.interceptors.push('jwtInterceptor');
	}
]);