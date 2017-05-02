namespace auth_intro.Controllers {

    angular.module('auth_intro', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: auth_intro.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: auth_intro.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('register', {
              url: '/register',
              templateUrl: '/ngApp/views/register.html',
              controller: auth_intro.Controllers.RegisterController,
              controllerAs: 'controller'
            })
            .state('login', {
              url: '/login',
              templateUrl: '/ngApp/views/login.html',
              controller: auth_intro.Controllers.LoginController,
              controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
