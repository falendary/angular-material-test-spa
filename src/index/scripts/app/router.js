(function () {

    'use strict';

    module.exports = function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login-view.html',
                controller: 'LoginController as vm'
            })
            .state('logout', {
                url: '/logout',
                template: '',
                controller: 'LogoutController as vm'
            })
            .state('interface', {
                url: '',
                abstract: true,
                templateUrl: 'shell-view.html',
                controller: 'ShellController as vm'
            })
            .state('interface.population', {
                url: '/population',
                templateUrl: 'population-view.html',
                controller: 'PopulationController as vm'
            })
            .state('interface.goods', {
                url: '/goods',
                templateUrl: 'goods-view.html',
                controller: 'GoodsController as vm'
            });

        $urlRouterProvider.otherwise('/population');
    };

}());