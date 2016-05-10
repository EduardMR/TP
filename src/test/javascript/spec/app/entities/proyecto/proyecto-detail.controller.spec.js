'use strict';

describe('Controller Tests', function () {

    describe('Proyecto Detail Controller', function () {
        var $scope, $rootScope;
        var MockEntity, MockProyecto, MockTarea, MockUser;
        var createController;

        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockProyecto = jasmine.createSpy('MockProyecto');
            MockTarea = jasmine.createSpy('MockTarea');
            MockUser = jasmine.createSpy('MockUser');


            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'Proyecto': MockProyecto,
                'Tarea': MockTarea,
                'User': MockUser
            };
            createController = function () {
                $injector.get('$controller')("ProyectoDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function () {
            it('Unregisters root scope listener upon scope destruction', function () {
                var eventType = 'taskproyApp:proyectoUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
