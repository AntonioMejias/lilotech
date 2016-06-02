/* global _*/
/*'use strict'

angular
    .module('lilotech')
    .service("ApiService", ApiService);

ApiService.$inject = ['$resource', '$q'];

function ApiService($resource, $q) {
    var vm = this;

    function httpCall(method, url, data) {
        var deferred = $q.defer();
        var retry = 0;
        var maxRetries = 3;
        var Headers = {
            'Content-Type': 'application/json'
        };

        //default timeout in seconds
        var timeout = 10;

        if (method === "POST" || method === "PUT") {
            timeout = 30;
        }

        //---Retry logic---
        doCall();


        function doCall() {
            if (retry !== 0) {
                timeout = retry * 10;
            }

            $http({
                method: method,
                data: data,
                headers: Headers,
                url: url,
                timeout: timeout * 1000,
            }).then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    if (error.status !== 400 && error.status !== 401 && retry < maxRetries) {
                        retry++;
                        setTimeout(doCall, 1000);
                    } else {
                        if (retry === maxRetries) {
                            deferred.reject(error);
                        } else {
                            deferred.reject(error);
                        }
                    }
                }
            );
        }
        return deferred.promise;
    }

    vm.post = post;
    vm.get = get;
    vm.put = put;
    vm.delete = _delete;

    function post(url, data) {
        return httpCall("POST", url, data);
    }

    function put(url, data) {
        return httpCall("PUT", url, data);
    }

    function get(url) {
        return httpCall("GET", url, null);
    }

    function _delete(url, data) {
        return httpCall("DELETE", url, data);
    }

}*/
