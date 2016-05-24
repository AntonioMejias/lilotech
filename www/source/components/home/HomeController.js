(function() {
	angular.module('lilotech')
		.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController() {

		var vm = this;
		constructor();

		function constructor() {
			vm.title = "Hogar";
			console.log('Home');
		}



	}
})();