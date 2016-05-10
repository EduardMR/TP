'use strict';

angular.module('taskproyApp')
    .factory('Tarea', function ($resource, DateUtils) {
        return $resource('api/tareas/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaFin = DateUtils.convertDateTimeFromServer(data.fechaFin);
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    });
