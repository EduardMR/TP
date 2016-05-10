'use strict';

angular.module('taskproyApp')
    .controller('TareaDeleteController', function ($scope, $uibModalInstance, entity, Tarea) {

        $scope.tarea = entity;
        $scope.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Tarea.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
