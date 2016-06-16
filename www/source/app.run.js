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
            "img/sensors/consumo_0W.png",
            "img/sensors/consumo_1000W.png",
            "img/sensors/consumo_100W.png",
            "img/sensors/consumo_2000W.png",
            "img/sensors/consumo_500W.png",
            "img/sensors/consumo_50W.png",
            "img/sensors/humo.png",
            "img/sensors/luz.png",
            "img/sensors/luz_0.png",
            "img/sensors/luz_1.png",
            "img/sensors/luz_2.png",
            "img/sensors/luz_3.png",
            "img/sensors/luz_4.png",
            "img/sensors/luz_5.png",
            "img/sensors/luz_6.png",
            "img/sensors/luz_7.png",
            "img/sensors/luz_8.png",
            "img/sensors/luz_9.png",
            "img/sensors/luz_full.png",
            "img/sensors/movimiento.png",
            "img/sensors/movimiento_mucho.png",
            "img/sensors/mucho_humo.png",
            "img/sensors/mucho_ruido.png",
            "img/sensors/palmadas.png",
            "img/sensors/ruido.png",
            "img/sensors/silbido.png",
            "img/sensors/sin_humo.png",
            "img/sensors/sin_movimiento.png",
            "img/sensors/temperatura_bajo0.png",
            "img/sensors/temperatura_mayor0C.png",
            "img/sensors/temperatura_mayor10C.png",
            "img/sensors/temperatura_mayor20C.png",
            "img/sensors/temperatura_mayor25C.png",
            "img/sensors/temperatura_mayor30C.png",
            "img/sensors/temperatura_mayor35C.png"
        ]).then(function(){
            console.log("Images done loading!");
        },function(failed){
            console.log("An image filed: "+failed);
        });
})
.run(['localStorageService','$state', function(localStorageService,$state){
      var sesion = localStorageService.get('session');

      if(sesion) {

            if(sesion.param.state) {
                  console.log(sesion.path);
                  $state.go(sesion.path,{idRoom:sesion.param.value})
            } else {
                  console.log(sesion.path)
                $state.go(sesion.path)  
            }
      }
}]);


        
