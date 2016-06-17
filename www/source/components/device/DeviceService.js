(function() {
    'use strict'

    angular
        .module('lilotech')
        .service("DeviceService", DeviceService);

    DeviceService.$inject = ['ApiService', '$q', 'BaseUrl', 'localStorageService'];

    function DeviceService(ApiService, $q, BaseUrl, localStorageService) {
        var vm = this;

        vm.getDeviceToken = _getDeviceToken;

        function _getDeviceToken() {

            var deferred = $q.defer();
            var deviceDeferred = $q.defer();
            var device;
            var data;

            ApiService
                .getArrayRequest(BaseUrl + '/api/getdevices', false)
                .then(function(response) {

                    if (response.length == 0) {
                        deviceDeferred.reject({
                            'NotDeviceException': true
                        });
                        return deviceDeferred.promise;
                    }

                    device = response[0].Device;
                    data = {
                        token: device.token
                    }

                    var deviceserial =  "lilo"+device.serial + ".lilo:" + 80;
                    console.log(deviceserial)
                    localStorageService.set("baseUrlDevice", "http://" + deviceserial);
                    
                    //localStorageService.set("baseUrlDevice", "http://" + device.ip + ":" + device.port);

                    return ApiService.postRequest(localStorageService.get("baseUrlDevice") + '/api/logintoken', data, false, 'urlencoded');

                })
                .then(function(response) {
                    deferred.resolve(response);
                    localStorageService.set("baseUrlSocket", "http://" + device.ip + ":" + device.port);
                }, function(error) {
                    console.log("fue rechazada la peticion en local");
                    localStorageService.set("baseUrlDevice", "http://" + device.ip + ":" + device.port);
                    return ApiService.postRequest(localStorageService.get("baseUrlDevice") + '/api/logintoken', data, false, 'urlencoded');
                    
                })
                .then(function(response) {
                     deferred.resolve(response);
                },
                    function(error) {
                    deferred.reject(error);
                })
                .catch(function(error) {
                    deferred.reject({
                        message: error
                    });
                });


            return deferred.promise;
        }
    }
})();