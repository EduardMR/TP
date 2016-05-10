'use strict';

angular.module('taskproyApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function (response) {
                var alertKey = response.headers('X-taskproyApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, {param: response.headers('X-taskproyApp-params')});
                }
                return response;
            }
        };
    });
