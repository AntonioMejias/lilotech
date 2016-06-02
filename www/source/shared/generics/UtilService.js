(function() {
	'use strict'

	angular
		.module('lilotech')
		.service("UtilService", UtilService);

	UtilService.$inject = ['$q'];

	function UtilService($q) {
		var vm = this;

		vm.jsonToUrlencoded = _jsonToUrlencoded;
		vm.prueba;
		function _jsonToUrlencoded(obj) { //Codifica el JSON al formato x-www-form-urlencoded 
			var str = [];
			for (var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		} 

	}
})();
