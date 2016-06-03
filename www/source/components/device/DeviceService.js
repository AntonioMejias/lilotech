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

            ApiService
                .getArrayRequest(BaseUrl + '/api/getdevices', false)
                .then(function(response) {

                    if (response.length == 0) {
                        deviceDeferred.reject({
                            'NotDeviceException': true
                        });
                        return deviceDeferred.promise;
                    }

                    var device = response[0].Device;
                    var data = {
                        token: device.token
                    }
                    
                    localStorageService.set("baseUrlDevice", "http://" + device.ip + ":" + device.port);

                    return ApiService.postRequest(localStorageService.get("baseUrlDevice") + '/api/logintoken', data, false, 'urlencoded');

                })
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
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