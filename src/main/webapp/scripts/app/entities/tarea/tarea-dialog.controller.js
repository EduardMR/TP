'use strict';

angular.module('taskproyApp').controller('TareaDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tarea', 'Proyecto', 'Subtarea',
        function ($scope, $stateParams, $uibModalInstance, entity, Tarea, Proyecto, Subtarea) {

            $scope.tarea = entity;
            $scope.proyectos = Proyecto.query();
            $scope.subtareas = Subtarea.query();
            $scope.load = function (id) {
                Tarea.get({id: id}, function (result) {
                    $scope.tarea = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('taskproyApp:tareaUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.tarea.id != null) {
                    Tarea.update($scope.tarea, onSaveSuccess, onSaveError);
                } else {
                    Tarea.save($scope.tarea, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.datePickerForFechaFin = {};

            $scope.datePickerForFechaFin.status = {
                opened: false
            };

            $scope.datePickerForFechaFinOpen = function ($event) {
                $scope.datePickerForFechaFin.status.opened = true;
            };
        }]);
