'use strict';

angular.module('taskproyApp')
    .controller('ProyectoDeleteController', function ($scope, $uibModalInstance, entity, Proyecto) {

        $scope.proyecto = entity;
        $scope.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Proyecto.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
