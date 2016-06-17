/* global */
'use strict';

angular
    .module('lilotech')
    .controller("PrincipalController", PrincipalController);

PrincipalController.$inject = ['SocketService', 'RoomService', 'ToggleService', '$stateParams', 'MockService', 'localStorageService', '$state'];

function PrincipalController(SocketService, RoomService, ToggleService, $stateParams, MockService, localStorageService, $state) {

    var vm = this;
    constructor();
    socketEvent();

    function constructor() {
        var idRoom = $stateParams.idRoom;
        vm.cargando = true;
        localStorageService.set('session', {
                path: 'principal',
                param: {
                    state: true,
                    value: idRoom,
                    key: 'idRoom'
                }
            })
            /*var idRoom;

            if($stateParams.idRoom){
               idRoom = $stateParams.idRoom;
            } else{
               idRoom = localStorageService.get('lastRoomSelected');
            }*/
        vm.cargando;

        if (idRoom) {
            RoomService
                .getRoom(idRoom)
                .then(
                    function(response) {
                        vm.cargando = false;
                        var ClientApp = response.Client[0].Clientapp;
                        vm.applications = _generateAppImage(ClientApp);

                        console.log(vm.applications);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        } else {
            $state.go('home');
            //idRoom === undefined
            console.log("No posee cuartos asociados a su dispositivo");

        }

        vm.elementsD = MockService.elementsD;
        vm.toggleApp = _toggleApp;
        vm.aumentar = _aumentar;


    }

    function _toggleApp(element) {

        if (element.status == "0") {
            element.image = element.image.replace("0.png", "1.png");
            element.status = "1";
        } else {
            element.image = element.image.replace("1.png", "0.png");
            element.status = "0";
        }

        ToggleService
            .toggleApp(element.client_id, element.app_id)
            .then(function(response) {
                console.log(response);

            })
    }

    function _generateAppImage(ClientApps) {
        //var filterAppId = ["1", "2"];

        var applications = ClientApps
            .filter(function(app) {
                return (app.application_id == "1" || app.application_id == "2")
            })
            .map(function(app) {
                var application_image = {
                    label: app.name,
                    image: 'img/applications/' + app.image_id + '-' + app.status + '.png',
                    status: app.status,
                    app_id: app.id,
                    client_id: app.client_id
                }

                return application_image;
            });

        return applications;
    }

    function _aumentar(argument) {
        vm.prueba++;
    }

    function socketEvent() {
        //console.log(SocketService);
        SocketService.on('appmonitor', function(data) {

            var app_id = data.target.split("-")[2];

            vm.applications = vm.applications.map(function(element) {
                if (element.app_id == app_id) {

                    if (data.status == 0) {

                        element.image = element.image.replace("1.png", "0.png");
                        element.status = "1";
                    } else {

                        element.image = element.image.replace("0.png", "1.png");
                        element.status = "0";
                    }

                    return element;
                }

                return element;
            })
            //console.log(data);
            //console.log(app_id);
        });

        /*SocketService.on('luminosityvalue',function (data) {
            console.log("FUNCIONA SOCKETTTT YEAHH");
            console.log(data);
        });
        SocketService.on('noisevalue',function (data) {
            console.log("FUNCIONA SOCKETTTT YEAHH");
            console.log(data);
        });
        SocketService.on('clientuip',function (data) {
            console.log("FUNCIONA SOCKETTTT YEAHH");
            console.log(data);
        });*/


    }

}