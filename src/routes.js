export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $qProvider.errorOnUnhandledRejections(false);

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });
}
