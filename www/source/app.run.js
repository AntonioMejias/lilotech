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
            "img/enchufe.png",
            "img/enchufe_1.png",
            "img/icono_app_Android.png",
            "img/iconoapp.png",
            "img/iconoapp1.png",
            "img/iconoapp2.png",
            "img/iconoapp3.png",
            "img/iconoapp4.png",
            "img/manilla.png",
            "img/manilla2.png",
            "img/manilla3.png",
            "img/manilla4.png",
            "img/manilla5.png",
            "img/martillo.png",
            "img/registrarse.png",
            "img/registrarse1.png",
            "img/registrarse2.png",
            "img/registrarse3.png",
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


        
