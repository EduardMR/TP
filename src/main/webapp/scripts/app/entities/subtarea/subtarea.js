'use strict';

angular.module('taskproyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('subtarea', {
                parent: 'entity',
                url: '/subtareas',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.subtarea.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subtarea/subtareas.html',
                        controller: 'SubtareaController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subtarea');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('subtarea.detail', {
                parent: 'entity',
                url: '/subtarea/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.subtarea.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subtarea/subtarea-detail.html',
                        controller: 'SubtareaDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subtarea');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Subtarea', function ($stateParams, Subtarea) {
                        return Subtarea.get({id: $stateParams.id});
                    }]
                }
            })
            .state('subtarea.new', {
                parent: 'subtarea',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subtarea/subtarea-dialog.html',
                        controller: 'SubtareaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    descripcion: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('subtarea', null, {reload: true});
                        }, function () {
                            $state.go('subtarea');
                        })
                }]
            })
            .state('subtarea.edit', {
                parent: 'subtarea',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subtarea/subtarea-dialog.html',
                        controller: 'SubtareaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Subtarea', function (Subtarea) {
                                return Subtarea.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('subtarea', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            })
            .state('subtarea.delete', {
                parent: 'subtarea',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subtarea/subtarea-delete-dialog.html',
                        controller: 'SubtareaDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Subtarea', function (Subtarea) {
                                return Subtarea.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('subtarea', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
