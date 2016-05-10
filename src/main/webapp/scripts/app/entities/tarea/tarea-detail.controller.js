'use strict';

angular.module('taskproyApp')
    .controller('TareaDetailController', function ($scope, $rootScope, $stateParams, entity, Tarea, Proyecto, Subtarea) {
        $scope.tarea = entity;
        $scope.load = function (id) {
            Tarea.get({id: id}, function (result) {
                $scope.tarea = result;
            });
        };
        var unsubscribe = $rootScope.$on('taskproyApp:tareaUpdate', function (event, result) {
            $scope.tarea = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
