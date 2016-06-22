/* global */
'use strict';

angular
    .module('lilotech')
    .controller("HomeController", HomeController);

HomeController.$inject = ['SocketService','MockService', '$state', '$q', 'RoomService', 'localStorageService'];

function HomeController(SocketService, MockService, $state, $q, RoomService, localStorageService) {

    var vm = this;
    constructor();
    socketEvent();

    function constructor() {
        
        vm.cargando = true;
        vm.onClickDetail = _onClickDetail;

        RoomService.getRooms().then(function(rooms) {
            $q.all(getApplicationsActive(rooms)) // Resuelve Todas las promesas
                .then(function(newRooms) { // newRooms es un array con el valor de cada promesa resuelta
                    vm.cargando = false;
                    vm.rooms = newRooms;
                })
            
        });
    }

    function _onClickDetail(idRoom) {
        $state.go('principal', {
            "idRoom": idRoom
        });
    }

    function getApplicationsActive(rooms) {
        //Retorna un Array de promesas
        return rooms.map(function(roomElement) {
            //Retorna una promesa
            return RoomService.getRoom(roomElement.Room.id)
                .then(
                    function(room) {
                        console.log(room);
                        var room = room.Client[0].Clientapp;
                        // Hago la sumatoria de los ROOM que tengan Apps activas
                        var applicationsActive = room.reduce(
                                function(previousElement, element) {

                                    return previousElement + parseInt(element.status)
                                }, 0) //Inicializando el primer valor previo en 0

                        roomElement.Room.appInfo = {
                            active: applicationsActive > 0 ? 'list-white' : '',
                            appsActive: applicationsActive
                        }

                        //Se retorna el ROOM con la informacion necesaria agregada
                        return roomElement.Room;
                    })
        })
    }

    function socketEvent (){
        SocketService.on('appmonitor', function(data) {
            console.log("cambio de estado");
        })
    }


}