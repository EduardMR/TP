'use strict';

angular.module('taskproyApp')
    .factory('Subtarea', function ($resource, DateUtils) {
        return $resource('api/subtareas/:id', {}, {
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
