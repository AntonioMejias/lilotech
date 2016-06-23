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
                        console.log(response.Client[0].status); //Devuelve el estado de los sensores

                        // Power 
                        switch (response.Client[0].status.powerrange){
                            case 0:
                                vm.imgP = { srcPower: "img/sensors/status-power-0.png"};
                                break;
                            case 1:
                                vm.imgP = { srcPower: "img/sensors/status-power-1.png"};
                                break;
                            case 2: 
                                vm.imgP = { srcPower: "img/sensors/status-power-2.png"};
                                break;
                            case 3:
                                vm.imgP = { srcPower: "img/sensors/status-power-3.png"};
                                break;
                            case 4:
                                vm.imgP = { srcPower: "img/sensors/status-power-4.png"};
                                break;
                            case 5:
                                vm.imgP = { srcPower: "img/sensors/status-power-5.png"};
                                break;
                            case false:
                                vm.imgP = { srcPower: "img/sensors/status-power-0.png"};
                                break;
                        }

                        // Temperature
                        switch (response.Client[0].status.temperaturerange){
                            case 0:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-0.png"};   
                                break;
                            case 1:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-1.png"};
                                break;
                            case 2: 
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-2.png"};
                                break;
                            case 3:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-3.png"};
                                break;
                            case 4:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-4.png"};
                                break;
                            case 5:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-5.png"};
                                break;
                            case 6:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-6.png"};
                                break;
                            case false:
                                vm.imgT = { srcTemperature: "img/sensors/status-temperature-0.png"};
                                break;
                        }

                        // Luminosity
                        if (response.Client[0].status.luminosity==false){
                            vm.imgL = { srcLuminosity: "img/sensors/status-luminosity-0.png"};
                        }else{
                           vm.imgL = { srcLuminosity: "img/sensors/status-luminosity-"+response.Client[0].status.luminosity+".png"};
                        }

                        // Movement
                        if (response.Client[0].status.movement==false){
                            vm.imgM = { srcMovement: "img/sensors/status-movement-0.png"};
                        }else{
                            vm.imgM = { srcMovement: "img/sensors/status-movement-"+response.Client[0].status.movement+".png"};
                        }

                        // Noise
                        if (response.Client[0].status.noise==false){
                            vm.imgN = { srcNoise: "img/sensors/status-noise-0.png"};
                        }else{
                            vm.imgN = { srcNoise: "img/sensors/status-noise-"+response.Client[0].status.noise+".png"};
                        }
                        
                        // Smoke
                        if (response.Client[0].status.smoke==false){
                            vm.imgS = { srcSmoke: "img/sensors/status-smoke-0.png"};
                        }else{
                            vm.imgS = { srcSmoke: "img/sensors/status-smoke-"+response.Client[0].status.smoke+".png"};
                        }

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
                    image: 'img/applications/'+app.image_id+'-'+app.status+'.png',
                    status: app.status,
                    app_id: app.id,
                    client_id: app.client_id
                }

                return application_image;
            });

        return applications;
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

        // Luminosity
        /*SocketService.on('luminosityvalue',function (data) {
            console.log("Socket Luminosity");
            console.log ("luminosity node: ", +data.node);
            console.log ("luminosity value: ", +data.value);
            console.log(data);

            if(data.value==false){
                vm.imgL = { srcLuminosity: "img/sensors/status-luminosity-0.png"};
            } else {
                vm.imgL = { srcLuminosity: "img/sensors/status-luminosity-"+data.value+".png"};
            }

        });*/

        // Noise
        /*ocketService.on('noisevalue',function (data) {
            console.log("Socket Noise");
            console.log ("noise node: ", +data.node);
            console.log ("noise value: ", +data.value);
            console.log(data);

            if (data.value==false){
                vm.imgN = { srcNoise: "img/sensors/status-noise-0.png"};
            }else{
                vm.imgN = { srcNoise: "img/sensors/status-noise-"+data.value+".png"};
            }
        });*/

        // Movement
        /*SocketService.on('movementdetected',function (data) {
            console.log("Socket Movement");
            console.log ("movement node: ", +data.node);
            console.log ("movement value: ", +data.value);
            console.log(data);

            if (data.value==false){
                vm.imgM = { srcMovement: "img/sensors/status-movement-0.png"};
            }else{
                vm.imgM = { srcMovement: "img/sensors/status-movement-"+data.value+".png"};
            }
        });*/

        // Power
        /*SocketService.on('clientuip',function (data) {
            console.log("Socket Power");
            console.log ("power node: ", +data.node);
            console.log ("power power: ", +data.power);
            console.log ("power range: ", +data.range);
            console.log(data);

            switch (data.range){
                case 0:
                    vm.imgP = { srcPower: "img/sensors/status-power-0.png"};
                    break;
                case 1:
                    vm.imgP = { srcPower: "img/sensors/status-power-1.png"};
                    break;
                case 2: 
                    vm.imgP = { srcPower: "img/sensors/status-power-2.png"};
                    break;
                case 3:
                    vm.imgP = { srcPower: "img/sensors/status-power-3.png"};
                    break;
                case 4:
                    vm.imgP = { srcPower: "img/sensors/status-power-4.png"};
                    break;
                case 5:
                    vm.imgP = { srcPower: "img/sensors/status-power-5.png"};
                    break;
                case false:
                    vm.imgP = { srcPower: "img/sensors/status-power-0.png"};
                    break;
            }
        });*/

        // Smoke
        /*SocketService.on('smokevalue',function (data) {
            console.log("Socket Smoke");
            console.log ("smoke node: ", +data.node);
            console.log ("smoke value: ", +data.value);
            console.log(data);

            if (data.value==false){
                vm.imgS = { srcSmoke: "img/sensors/status-smoke-0.png"};
            }else{
                vm.imgS = { srcSmoke: "img/sensors/status-smoke-"+data.value+".png"};
            }
        });*/

        // Temperature
        /*SocketService.on('temperaturevalue',function (data) {
            console.log("Socket Temperature");
            console.log ("temperature node: ", +data.node);
            console.log ("temperature value: ", +data.value);
            console.log ("temperature range: ", +data.range);
            console.log(data);

            switch (data.range){
                case 0:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-0.png"};   
                    break;
                case 1:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-1.png"};
                    break;
                case 2: 
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-2.png"};
                    break;
                case 3:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-3.png"};
                    break;
                case 4:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-4.png"};
                    break;
                case 5:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-5.png"};
                    break;
                case 6:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-6.png"};
                    break;
                case false:
                    vm.imgT = { srcTemperature: "img/sensors/status-temperature-0.png"};
                    break;
            }
        });*/


    }

}