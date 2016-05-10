'use strict';

angular.module('taskproyApp').controller('ProyectoDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Proyecto', 'Tarea', 'User',
        function ($scope, $stateParams, $uibModalInstance, entity, Proyecto, Tarea, User) {

            $scope.proyecto = entity;
            $scope.tareas = Tarea.query();
            $scope.users = User.query();
            $scope.load = function (id) {
                Proyecto.get({id: id}, function (result) {
                    $scope.proyecto = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('taskproyApp:proyectoUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.proyecto.id != null) {
                    Proyecto.update($scope.proyecto, onSaveSuccess, onSaveError);
                } else {
                    Proyecto.save($scope.proyecto, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
