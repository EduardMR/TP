'use strict';

angular.module('taskproyApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {});
    });


