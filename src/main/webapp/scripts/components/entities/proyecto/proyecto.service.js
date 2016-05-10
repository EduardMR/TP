'use strict';

angular.module('taskproyApp')
    .factory('Proyecto', function ($resource, DateUtils) {
        return $resource('api/proyectos/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    });
