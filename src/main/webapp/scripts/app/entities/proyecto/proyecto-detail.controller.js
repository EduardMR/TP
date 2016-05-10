'use strict';

angular.module('taskproyApp')
    .controller('ProyectoDetailController', function ($scope, $rootScope, $stateParams, entity, Proyecto, Tarea, User) {
        $scope.proyecto = entity;
        $scope.load = function (id) {
            Proyecto.get({id: id}, function (result) {
                $scope.proyecto = result;
            });
        };
        var unsubscribe = $rootScope.$on('taskproyApp:proyectoUpdate', function (event, result) {
            $scope.proyecto = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
