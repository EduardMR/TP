'use strict';

describe('Controller Tests', function () {

    describe('Subtarea Detail Controller', function () {
        var $scope, $rootScope;
        var MockEntity, MockSubtarea, MockTarea;
        var createController;

        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSubtarea = jasmine.createSpy('MockSubtarea');
            MockTarea = jasmine.createSpy('MockTarea');


            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'Subtarea': MockSubtarea,
                'Tarea': MockTarea
            };
            createController = function () {
                $injector.get('$controller')("SubtareaDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function () {
            it('Unregisters root scope listener upon scope destruction', function () {
                var eventType = 'taskproyApp:subtareaUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
