export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/stats', {
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController',
      controllerAs: 'stats'
    })
    .when('/tasks', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .otherwise({
      redirectTo: '/tasks'
    });
}
