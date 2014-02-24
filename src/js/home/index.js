module.exports = angular.module('home', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '/',
                templateUrl: 'views/home/root.html',
                controller: 'HomeCtrl'
            })
    })
    .controller('HomeCtrl', require('./controllers/home'))