(function() {
	'use strict'

	angular
		.module('lilotech')
		.service('ToggleService', ToggleService);

	ToggleService.$inject = ['$q','ApiService','BaseUrl','localStorageService']

	function ToggleService ($q,ApiService,BaseUrl,localStorageService) {
		var vm = this;
		vm.status = false;
		constructor();

		function constructor (){
			vm.toggleApp = _toggleApp;
		}

		function _toggleApp (client_id,app_id) {
			vm.status = !vm.status
			console.log(vm.status);
			return ApiService.getRequest(localStorageService.get('baseUrlDevice') + `/api/apptoggle/${client_id}/${app_id}`,null);
		}

	}

})();