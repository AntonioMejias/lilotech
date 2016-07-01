/* global */

'use strict';

angular.module('lilotech')

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})
.run(function($ImageCacheFactory){
  $ImageCacheFactory.Cache([
            "img/applications/1-0.png",
            "img/applications/1-1.png",
            "img/applications/2-0.png",
            "img/applications/2-1.png",
            "img/applications/3-0.png",
            "img/applications/3-1.png",
            "img/applications/8-0.png",
            "img/applications/8-1.png",
            "img/iconoapp.png",
            "img/manilla.png",
            "img/martillo.png",
            "img/registrarse.png",
            "img/sensors/status-movement-0.png",
            "img/sensors/status-movement-1.png",
            "img/sensors/status-movement-2.png",
            "img/sensors/status-power-0.png",
            "img/sensors/status-power-1.png",
            "img/sensors/status-power-2.png",
            "img/sensors/status-power-3.png",
            "img/sensors/status-power-4.png",
            "img/sensors/status-power-5.png",
            "img/sensors/status-smoke-0.png",
            "img/sensors/status-smoke-1.png",
            "img/sensors/status-smoke-2.png",
            "img/sensors/status-noise-0.png",
            "img/sensors/status-noise-1.png",
            "img/sensors/status-noise-2.png",
            "img/sensors/status-noise-3.png",
            "img/sensors/status-noise-4.png",
            "img/sensors/status-temperature-0.png",
            "img/sensors/status-temperature-1.png",
            "img/sensors/status-temperature-2.png",
            "img/sensors/status-temperature-3.png",
            "img/sensors/status-temperature-4.png",
            "img/sensors/status-temperature-5.png",
            "img/sensors/status-temperature-6.png",
            "img/sensors/status-luminosity-0.png",
            "img/sensors/status-luminosity-1.png",
            "img/sensors/status-luminosity-2.png",
            "img/sensors/status-luminosity-3.png",
            "img/sensors/status-luminosity-4.png",
            "img/sensors/status-luminosity-5.png",
            "img/sensors/status-luminosity-6.png",
            "img/sensors/status-luminosity-7.png",
            "img/sensors/status-luminosity-8.png",
            "img/sensors/status-luminosity-9.png",
            "img/sensors/status-luminosity-10.png"
        ]).then(function(){
            console.log("Images done loading!");
        },function(failed){
            console.log("An image filed: "+failed);
        });
});



        
