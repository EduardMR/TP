'use strict';

angular.module('taskproyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tarea', {
                parent: 'entity',
                url: '/tareas',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.tarea.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tarea/tareas.html',
                        controller: 'TareaController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tarea');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('tarea.detail', {
                parent: 'entity',
                url: '/tarea/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.tarea.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tarea/tarea-detail.html',
                        controller: 'TareaDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tarea');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Tarea', function ($stateParams, Tarea) {
                        return Tarea.get({id: $stateParams.id});
                    }]
                }
            })
            .state('tarea.new', {
                parent: 'tarea',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/tarea/tarea-dialog.html',
                        controller: 'TareaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    notas: null,
                                    fechaFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('tarea', null, {reload: true});
                        }, function () {
                            $state.go('tarea');
                        })
                }]
            })
            .state('tarea.edit', {
                parent: 'tarea',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/tarea/tarea-dialog.html',
                        controller: 'TareaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Tarea', function (Tarea) {
                                return Tarea.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('tarea', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            })
            .state('tarea.delete', {
                parent: 'tarea',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/tarea/tarea-delete-dialog.html',
                        controller: 'TareaDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Tarea', function (Tarea) {
                                return Tarea.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('tarea', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
