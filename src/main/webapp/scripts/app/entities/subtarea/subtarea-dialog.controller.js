'use strict';

angular.module('taskproyApp').controller('SubtareaDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Subtarea', 'Tarea',
        function ($scope, $stateParams, $uibModalInstance, entity, Subtarea, Tarea) {

            $scope.subtarea = entity;
            $scope.tareas = Tarea.query();
            $scope.load = function (id) {
                Subtarea.get({id: id}, function (result) {
                    $scope.subtarea = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('taskproyApp:subtareaUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.subtarea.id != null) {
                    Subtarea.update($scope.subtarea, onSaveSuccess, onSaveError);
                } else {
                    Subtarea.save($scope.subtarea, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
