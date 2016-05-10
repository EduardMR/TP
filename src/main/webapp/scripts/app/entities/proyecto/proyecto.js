'use strict';

angular.module('taskproyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('proyecto', {
                parent: 'entity',
                url: '/proyectos',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.proyecto.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/proyecto/proyectos.html',
                        controller: 'ProyectoController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('proyecto');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('proyecto.detail', {
                parent: 'entity',
                url: '/proyecto/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'taskproyApp.proyecto.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/proyecto/proyecto-detail.html',
                        controller: 'ProyectoDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('proyecto');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Proyecto', function ($stateParams, Proyecto) {
                        return Proyecto.get({id: $stateParams.id});
                    }]
                }
            })
            .state('proyecto.new', {
                parent: 'proyecto',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/proyecto/proyecto-dialog.html',
                        controller: 'ProyectoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('proyecto', null, {reload: true});
                        }, function () {
                            $state.go('proyecto');
                        })
                }]
            })
            .state('proyecto.edit', {
                parent: 'proyecto',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/proyecto/proyecto-dialog.html',
                        controller: 'ProyectoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Proyecto', function (Proyecto) {
                                return Proyecto.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('proyecto', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            })
            .state('proyecto.delete', {
                parent: 'proyecto',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/proyecto/proyecto-delete-dialog.html',
                        controller: 'ProyectoDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Proyecto', function (Proyecto) {
                                return Proyecto.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('proyecto', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
