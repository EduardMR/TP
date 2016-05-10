'use strict';

describe('Controller Tests', function () {

    describe('Tarea Detail Controller', function () {
        var $scope, $rootScope;
        var MockEntity, MockTarea, MockProyecto, MockSubtarea;
        var createController;

        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockTarea = jasmine.createSpy('MockTarea');
            MockProyecto = jasmine.createSpy('MockProyecto');
            MockSubtarea = jasmine.createSpy('MockSubtarea');


            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'Tarea': MockTarea,
                'Proyecto': MockProyecto,
                'Subtarea': MockSubtarea
            };
            createController = function () {
                $injector.get('$controller')("TareaDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function () {
            it('Unregisters root scope listener upon scope destruction', function () {
                var eventType = 'taskproyApp:tareaUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
