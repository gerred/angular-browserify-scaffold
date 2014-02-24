'use strict';
require('../../spec_helper')
require('../../../../src/js/home');

beforeEach(angular.mock.module('home'));

describe('HomeCtrl', function() {
    var scope;
    beforeEach(inject(function($controller) {
        scope = {}
        $controller('HomeCtrl', {
            $scope: scope
        });
    }));

    it('should set the scope for greeting', function() {
        expect(scope.greeting).toEqual('Hello, world!');
    });

});