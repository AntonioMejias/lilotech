/* global */
'use strict';

angular
    .module('lilotech')
    .controller("PrincipalController", PrincipalController);

PrincipalController.$inject = ['RoomService', 'ToggleService', '$stateParams', 'MockService'];

function PrincipalController(RoomService, ToggleService, $stateParams, MockService) {

    var vm = this;
    constructor();

    function constructor() {
        var idRoom = $stateParams.idRoom;
        vm.cargando = true;

        if (idRoom) {      
            RoomService
                .getRoom(idRoom)
                .then(
                    function(response) {
                        vm.cargando = false;
                        var ClientApp = response.Client[0].Clientapp;
                        vm.applications = _generateAppImage(ClientApp);

                        console.log(vm.applications, {
                            "idRoom": idRoom
                        });
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        } else {
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
        var filterAppId = ["1", "2"];

        var applications = ClientApps
            .filter(function(app) {
                return filterAppId.includes(app.application_id)
            })
            .map(function(app) {
                var application_image = {
                    label: app.name,
                    image: `img/applications/${app.image_id}-${app.status}.png`,
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

}