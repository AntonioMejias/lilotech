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
            "img/enchufe_1.png",
            "img/bombilla_.png",
            "img/enchufe.png"
        ]).then(function(){
            console.log("Images done loading!");
        },function(failed){
            console.log("An image filed: "+failed);
        });
})


        
