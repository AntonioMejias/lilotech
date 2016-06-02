(function() {
    'use strict'

    angular
        .module('lilotech')
        .service("ApiService", ApiService);

    ApiService.$inject = ['$resource', '$q', 'UtilService'];

    function ApiService($resource, $q, UtilService) {
        var vm = this;
        vm.baseUrl = 'https://device.lilotechnology.com';
        //var baseUrl = 'https://device.lilotechnology.com';

        function httpCall(method, url, params, data, header, isArray) {

            params = (params == false ? null : params); //Verifica si existen parametros para inlcuir al URL
            url = vm.baseUrl + url;
            //console.log(vm.baseUrl + url);
            if (header && header == 'urlencoded') {
                header = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                data = UtilService.jsonToUrlencoded(data);
            } else {
                header = {
                    'Content-Type': 'application/json'
                }
            }

            return $resource(url, params, {
                'makeRequest': {
                    method: method,
                    headers: header,
                    isArray: isArray
                }
            }).makeRequest(data).$promise;


        }

        function _changeApiPath(status, device) {
            vm.baseUrl = (status == 'device' ? "http://" + device.ip + ":" + device.port : 'https://device.lilotechnology.com')
        }

        vm.changeApiPath = _changeApiPath;
        vm.postRequest = postRequest;
        vm.putRequest = putRequest;
        vm.getRequest = getRequest;
        vm.getArrayRequest = getArrayRequest;
        vm.deleteRequest = deleteRequest;

        function postRequest(url, data, params, header) {
            return httpCall("POST", url, params, data, header, false);
        }

        function getRequest(url, params, header) {
            return httpCall("GET", url, params, null, header, false);
        }

        function getArrayRequest(url, params, header) {
            return httpCall("GET", url, params, null, header, true);
        }

        function putRequest(url, data, params, header) {
            return httpCall("PUT", url, params, data, header, false);
        }

        function deleteRequest(url, data, params, header) {
            return httpCall("DELETE", url, params, data, header, false);
        }
    }
})();