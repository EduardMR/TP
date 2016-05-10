'use strict';

angular.module('taskproyApp')
    .controller('SubtareaDetailController', function ($scope, $rootScope, $stateParams, entity, Subtarea, Tarea) {
        $scope.subtarea = entity;
        $scope.load = function (id) {
            Subtarea.get({id: id}, function (result) {
                $scope.subtarea = result;
            });
        };
        var unsubscribe = $rootScope.$on('taskproyApp:subtareaUpdate', function (event, result) {
            $scope.subtarea = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
