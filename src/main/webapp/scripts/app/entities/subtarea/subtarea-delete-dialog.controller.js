'use strict';

angular.module('taskproyApp')
    .controller('SubtareaDeleteController', function ($scope, $uibModalInstance, entity, Subtarea) {

        $scope.subtarea = entity;
        $scope.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Subtarea.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
