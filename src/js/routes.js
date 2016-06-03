module.exports = function ($routeProvider) {
  $routeProvider
    .when('/aggregate', {
      templateUrl: 'partials/aggregate.html',
      controller: 'aggregateController',
    })
    .when('/syntaxes/:syntaxName', {
      templateUrl: 'partials/syntaxes.html',
      controller: 'syntaxesController',
    })
    .when('/scopes/:baseScope', {
      templateUrl: 'partials/scopes.html',
      controller: 'scopesController',
    })
    .otherwise('/aggregate');
};
